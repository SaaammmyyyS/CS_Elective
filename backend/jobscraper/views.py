from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from .serializers import UserSerializer, JobListingSerializer
from .models import JobListing, User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
import jwt, datetime
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from django.db import IntegrityError

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=False)
        response.data = {
            'jwt': token
        }

        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(jwt=token, key='secret', algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)

    def put(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(jwt=token, key='secret', algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()

        new_email = request.data.get('email')
        if new_email:
            existing_user_with_email = User.objects.filter(email=new_email).exclude(id=user.id).first()
            if existing_user_with_email:
                return Response({'error': 'Email already exists'}, status=400)

            user.email = new_email
            user.save()
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            return Response({'error': 'Email not provided'}, status=400)


class UserDeleteView(APIView):
    def delete(self, request):
        try:
            token = request.COOKIES.get('jwt')

            if not token:
                raise AuthenticationFailed('Unauthenticated!')

            try:
                payload = jwt.decode(jwt=token, key='secret', algorithms=["HS256"])
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Token expired')
            except jwt.InvalidTokenError:
                raise AuthenticationFailed('Invalid token')

            user_id = payload['id']
            user = get_object_or_404(User, id=user_id)

            try:
                user.delete()
                return Response({"message": "User deleted"}, status=status.HTTP_204_NO_CONTENT)
            except Exception as e:
                print("Error deleting user:", e)
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except AuthenticationFailed as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            "message": "success"
        }

        return response

class AllUsersView(APIView):
    pagination_class = StandardResultsSetPagination

    def get(self,request,  *args, **kwargs):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(jwt=token, key='secret', algorithms=["HS256"])
            queryset = User.objects.all()
            paginator = self.pagination_class()
            paginated_queryset = paginator.paginate_queryset(queryset, request)
            serializer = UserSerializer(paginated_queryset, many=True)
            return paginator.get_paginated_response(serializer.data)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')


class JobStreetView(APIView):
    def post(self, request):
        keyword = request.data.get('keyword')
        location = request.data.get('location')
        min_salary = request.data.get('min_salary')
        max_salary = request.data.get('max_salary')

        if not keyword:
            return Response({"error": "Keyword is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_id = self.extract_user_id_from_jwt(request)
            job_listings = self.scrape_job_listings(keyword, location, min_salary, max_salary)
            self.save_job_listings(job_listings, user_id, keyword)
            return Response({"message": "Job listings scraped and saved successfully"})
        except AuthenticationFailed as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        try:
            user_id = self.extract_user_id_from_jwt(request)
            job_listings = JobListing.objects.filter(user_id=user_id, data_from='Job Street').values('title', 'company', 'status', 'url')
            serializer = JobListingSerializer(job_listings, many=True)
            return Response(serializer.data)
        except AuthenticationFailed as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def scrape_job_listings(self, keyword, location, min_salary, max_salary):
        job_listings = []
        driver = None

        try:
            driver = webdriver.Chrome(ChromeDriverManager().install())
            driver.get("https://www.jobstreet.com.ph/")
            driver.maximize_window()

            search_input = driver.find_element_by_xpath("//input[@id='keywords-input']")
            search_input.send_keys(keyword)
            location_input = driver.find_element_by_xpath("//input[@data-automation='SearchBar__Where']")
            location_input.send_keys(location)

            search_button = driver.find_element_by_xpath("//button[@id='searchButton']")
            search_button.click()

            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//a[@data-automation='jobTitle']")))

            dropdown_min_salary = driver.find_element_by_xpath("//label[@data-automation='toggleSalaryFromPanel']")
            dropdown_min_salary.click()
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, f"//a[@data-automation='{min_salary}']")))
            min_salary_element = driver.find_element_by_xpath(f"//a[@data-automation='{min_salary}']")
            min_salary_element.click()

            dropdown_max_salary = driver.find_element_by_xpath("//label[@data-automation='toggleSalaryToPanel']")
            dropdown_max_salary.click()
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, f"//a[@data-automation='{max_salary}']")))
            max_salary_element = driver.find_elements_by_xpath(f"//a[@data-automation='{max_salary}']")
            max_salary_element[1].click()

            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//a[@data-automation='jobTitle']")))
            job_titles = driver.find_elements_by_xpath("//a[@data-automation='jobTitle']")
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//a[@data-automation='jobCompany']")))
            job_companies = driver.find_elements_by_xpath("//a[@data-automation='jobCompany']")
            job_urls = [element.get_attribute('href') for element in driver.find_elements_by_xpath("//a[@data-automation='job-list-item-link-overlay']")]

            for title, company, url in zip(job_titles, job_companies, job_urls):
                job_listings.append({
                    'title': title.text,
                    'company': company.text,
                    'url': url
                })

            return job_listings
        finally:
            if driver:
                driver.quit()

    def extract_user_id_from_jwt(self, request):
        token = request.COOKIES.get('jwt')
        if token:
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                return payload.get('id')
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('JWT expired')
            except jwt.InvalidTokenError:
                raise AuthenticationFailed('Invalid token')
        else:
            raise AuthenticationFailed('JWT token not found in cookies')

    def save_job_listings(self, job_listings, user_id, keyword):
        if not job_listings:
            return Response({"error": "No job listings to save."}, status=status.HTTP_400_BAD_REQUEST)

        existing_titles = JobListing.objects.filter(user_id=user_id, title__in=[listing['title'] for listing in job_listings]).values_list('title', flat=True)

        duplicates = []
        unique_listings = []

        for listing in job_listings:
            if listing['title'] in existing_titles:
                duplicates.append(listing)
            else:
                unique_listings.append(listing)

        if duplicates:
            print("Duplicates found:")
            for duplicate in duplicates:
                print(duplicate)

        try:
            for listing in unique_listings:
                JobListing.objects.create(
                    title=listing['title'],
                    keyword=keyword,
                    company=listing['company'],
                    url=listing['url'],
                    user_id=user_id,
                    data_from='Job Street',
                    status='open'
                )
        except IntegrityError as e:
            return Response({"error": {e}}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": {e}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Job listings scraped and saved successfully"})

class IndeedView(APIView):
    def post(self, request):
        keyword = request.data.get('keyword')
        location = request.data.get('location')

        if not keyword:
            return Response({"error": "Keyword is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_id = self.extract_user_id_from_jwt(request)
            job_listings = self.scrape_job_listings(keyword, location)
            self.save_job_listings(job_listings, user_id, keyword)
            return Response({"message": "Job listings scraped and saved successfully"})
        except AuthenticationFailed as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        try:
            user_id = self.extract_user_id_from_jwt(request)
            job_listings = JobListing.objects.filter(user_id=user_id, data_from='Indeed').values('title', 'company', 'status', 'url')
            serializer = JobListingSerializer(job_listings, many=True)
            return Response(serializer.data)
        except AuthenticationFailed as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def scrape_job_listings(self, keyword, location):
        job_listings = []
        driver = None

        try:
            driver = webdriver.Chrome(ChromeDriverManager().install())
            driver.get("https://ph.indeed.com/")
            driver.maximize_window()

            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "text-input-what")))

            keyword_input = driver.find_element_by_id("text-input-what")
            keyword_input.send_keys(keyword)

            location_input = driver.find_element_by_id("text-input-where")
            location_input.send_keys(location)

            search_button = driver.find_element_by_xpath("//button[@type='submit']")
            search_button.click()

            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//a[@data-hiring-event='false']")))

            titles = driver.find_elements_by_xpath("//a[@data-hiring-event='false']")
            companies = driver.find_elements_by_xpath("//span[@data-testid='company-name']")
            urls = [element.get_attribute('href') for element in driver.find_elements_by_xpath("//a[@data-hiring-event='false']")]

            for title, company, url in zip(titles, companies, urls):
                job_listings.append({
                    'title': title.text,
                    'company': company.text,
                    'url': url
                })

            return job_listings
        finally:
            if driver:
                driver.quit()

    def extract_user_id_from_jwt(self, request):
        token = request.COOKIES.get('jwt')
        if token:
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                return payload.get('id')
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('JWT expired')
            except jwt.InvalidTokenError:
                raise AuthenticationFailed('Invalid token')
        else:
            raise AuthenticationFailed('JWT token not found in cookies')

    def save_job_listings(self, job_listings, user_id, keyword):
        if not job_listings:
            return Response({"error": "No job listings to save."}, status=status.HTTP_400_BAD_REQUEST)

        existing_titles = JobListing.objects.filter(user_id=user_id, title__in=[listing['title'] for listing in job_listings]).values_list('title', flat=True)

        duplicates = []
        unique_listings = []

        for listing in job_listings:
            if listing['title'] in existing_titles:
                duplicates.append(listing)
            else:
                unique_listings.append(listing)

        if duplicates:
            print("Duplicates found:")
            for duplicate in duplicates:
                print(duplicate)

        try:
            for listing in unique_listings:
                JobListing.objects.create(
                    title=listing['title'],
                    keyword=keyword,
                    company=listing['company'],
                    url=listing['url'],
                    user_id=user_id,
                    status='open'
                )
        except IntegrityError as e:
            return Response({"error": {e}}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": {e}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Job listings scraped and saved successfully"})

    

    def post(self, request):
        keyword = request.data.get('keyword')
        location = request.data.get('location')

        if not keyword:
            return Response({"error": "Keyword is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_id = self.extract_user_id_from_jwt(request)
            job_listings = self.scrape_job_listings(keyword, location)
            saved_listings = self.save_job_listings(job_listings, user_id, keyword)
            return Response({"message": "Job listings scraped and saved successfully", "saved_listings": saved_listings})
        except AuthenticationFailed as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except IntegrityError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        try:
            user_id = self.extract_user_id_from_jwt(request)
            job_listings = JobListing.objects.filter(user_id=user_id).values('title', 'company', 'status', 'url')
            serializer = JobListingSerializer(job_listings, many=True)
            return Response(serializer.data)
        except AuthenticationFailed as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def scrape_job_listings(self, keyword, location):
        job_listings = []
        driver = None

        try:
            driver = webdriver.Chrome(ChromeDriverManager().install())
            driver.get("https://ph.indeed.com/")
            driver.maximize_window()

            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "text-input-what")))

            keyword_input = driver.find_element_by_id("text-input-what")
            keyword_input.send_keys(keyword)

            location_input = driver.find_element_by_id("text-input-where")
            location_input.send_keys(location)

            search_button = driver.find_element_by_xpath("//button[@type='submit']")
            search_button.click()

            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//a[@data-hiring-event='false']")))

            titles = driver.find_elements_by_xpath("//a[@data-hiring-event='false']")
            companies = driver.find_elements_by_xpath("//span[@data-testid='company-name']")
            urls = [element.get_attribute('href') for element in driver.find_elements_by_xpath("//a[@data-hiring-event='false']")]

            for title, company, url in zip(titles, companies, urls):
                job_listings.append({
                    'title': title.text,
                    'company': company.text,
                    'url': url
                })

            return job_listings
        finally:
            if driver:
                driver.quit()

    def extract_user_id_from_jwt(self, request):
        token = request.COOKIES.get('jwt')
        if token:
            try:
                payload = jwt.decode(token, 'secret', algorithms=['HS256'])
                return payload.get('id')
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('JWT expired')
            except jwt.InvalidTokenError:
                raise AuthenticationFailed('Invalid token')
        else:
            raise AuthenticationFailed('JWT token not found in cookies')

    def save_job_listings(self, job_listings, user_id, keyword):
        if not job_listings:
            raise ValueError("No job listings to save.")

        existing_titles = JobListing.objects.filter(user_id=user_id, title__in=[listing['title'] for listing in job_listings]).values_list('title', flat=True)

        duplicates = []
        unique_listings = []

        for listing in job_listings:
            if listing['title'] in existing_titles:
                duplicates.append(listing)
            else:
                unique_listings.append(listing)

        if duplicates:
            print("Duplicates found:")
            for duplicate in duplicates:
                print(duplicate)

        try:
            for listing in unique_listings:
                JobListing.objects.create(
                    title=listing['title'],
                    keyword=keyword,
                    company=listing['company'],
                    url=listing['url'],
                    user_id=user_id,
                    data_from='Indeed',
                    status='open'
                )
        except IntegrityError as e:
            raise IntegrityError(e)
        except Exception as e:
            raise Exception(e)

        return unique_listings
