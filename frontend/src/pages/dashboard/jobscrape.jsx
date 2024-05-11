import {
  Typography,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import TextField from "@/widgets/ui/textfield";
import Dropdown from "@/widgets/ui/dropdown";
import CustomButton from "@/widgets/ui/Button";
import React, { useState } from "react";
import JobStreetContainer from "@/widgets/layout/JobStreetContainer";
import Cookies from "js-cookie";

export const Jobscrape = () => {
  const priceRange = [
    { label: "₱0", value: "0" },
    { label: "₱10k", value: "10000" },
    { label: "₱15k", value: "15000" },
    { label: "₱20k", value: "20000" },
    { label: "₱30k", value: "30000" },
    { label: "₱40k", value: "40000" },
    { label: "₱50k", value: "50000" },
    { label: "₱60k", value: "60000" },
    { label: "₱70k", value: "70000" },
    { label: "₱80k", value: "80000" },
    { label: "₱100k", value: "100000" },
    { label: "₱120k", value: "120000" },
    { label: "₱150k", value: "150000" },
  ];

  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrapeData, setScrapeData] = useState({
    keyword: "",
    location: "",
    min_salary: "0",
    max_salary: "0",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("jwt");
      if (!token) {
        setError("Token not found. Please log in again.");
        setLoading(false);
        return;
      }
      const response = await fetch(
        "http://localhost:8000/api/job-street-scrape/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(scrapeData),
        },
      );

      if (!response.ok) {
        throw new Error("Error fetching job listings");
      }

      setError(null);
    } catch (error) {
      setError("Error fetching job listings. Please try again later.");
      console.error("Error fetching job listings:", error);
    } finally {
      setLoading(false);
    }

    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleMinSalary = (selectedValue) => {
    setScrapeData({ ...scrapeData, min_salary: selectedValue });
  };

  const handleMaxSalary = (selectedValue) => {
    setScrapeData({ ...scrapeData, max_salary: selectedValue });
  };

  return (
    <div>
      <form action="" className="container mx-auto mt-10">
        <div className="flex flex-col flex-wrap justify-center space-x-2 md:flex-row">
          <div className="mb-2">
            <TextField
              className=""
              inputLabel="Keyword"
              value={scrapeData.keyword}
              onChange={(e) =>
                setScrapeData({ ...scrapeData, keyword: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <TextField
              inputLabel="Location"
              value={scrapeData.location}
              onChange={(e) =>
                setScrapeData({ ...scrapeData, location: e.target.value })
              }
            />
          </div>

          <div className="mb-2">
            <Dropdown
              className="w-full"
              options={priceRange}
              value={scrapeData.min_salary}
              onChange={handleMinSalary}
              defaultOption={"₱0"}
              label={"Paying from"}
            />
          </div>

          <div className="mb-2">
            <Dropdown
              className="w-full"
              options={priceRange}
              value={scrapeData.max_salary}
              onChange={handleMaxSalary}
              label={"to"}
            />
          </div>

          <div>
            <CustomButton id="submit" onClick={handleSubmit} className="w-full">
              Find
            </CustomButton>
          </div>
        </div>
      </form>

      <div className="mt-5 flex h-screen w-full items-center justify-center rounded-lg bg-gray-100 md:mt-auto">
        <Card className="w-full">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-8 w-auto p-6"
          >
            <Typography variant="h6" color="white">
              Job List
            </Typography>
          </CardHeader>
          <CardBody className="px-0 pb-2 pt-0">
            <JobStreetContainer refreshKey={refreshKey} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Jobscrape;
