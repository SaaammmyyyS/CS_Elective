import {
  Typography,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import TextField from "@/widgets/ui/textfield";
import CustomButton from "@/widgets/ui/Button";
import React, { useState } from "react";
import IndeedContainer from "@/widgets/layout/IndeedContainer";
import Cookies from "js-cookie";

export const IndeedScrape = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrapeData, setScrapeData] = useState({
    keyword: "",
    location: "",
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
      const response = await fetch("http://localhost:8000/api/indeed-scrape/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(scrapeData),
      });

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

          <div>
            <CustomButton id="submit" onClick={handleSubmit} className="w-full">
              Find
            </CustomButton>
          </div>
        </div>
      </form>

      <div className="mt-5 flex h-screen items-center justify-center rounded-lg bg-gray-100 md:mt-auto">
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
            <IndeedContainer refreshKey={refreshKey} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default IndeedScrape;
