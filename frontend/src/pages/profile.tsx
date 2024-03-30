import { useState, useEffect } from "react";
import Navbar from "../components/navbar";

const UserProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [, setError] = useState("");

  useEffect(() => {
    const fetchCurrentUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setEmail(data.email);
          setName(data.name);
        } else {
          throw new Error("Failed to fetch current user data");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch current user data");
      }
    };

    fetchCurrentUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container h-full mt-5">
        <div className="max-w-md mx-auto bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-white">
              User Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-white">
              Personal details and application.
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">
                  Full name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                  {name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                  {email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">
                  Salary expectation
                </dt>
                <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                  $120,000
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">
                  About
                </dt>
                <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                  incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                  consequat sint. Sit id mollit nulla mollit nostrud in ea
                  officia proident. Irure nostrud pariatur mollit ad adipisicing
                  reprehenderit deserunt qui eu.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
