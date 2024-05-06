import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Pagination from "../ui/pagination";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const JobStreetContainer = ({ refreshKey }) => {
  const [jobListings, setJobListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const baseUrl = `http://localhost:8000/api/indeed-scrape/`;
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, refreshKey]);

  const fetchData = async (page) => {
    try {
      const response = await fetch(baseUrl + `?page=${page}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const responseData = await response.json();
      const { results, count } = responseData;

      setJobListings(results);
      setTotalPages(Math.ceil(count / pageSize));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mb-8  flex flex-col gap-5 overflow-scroll md:w-full">
      <Card className="overflow-scroll">
        <CardHeader variant="gradient" color="gray" className="mb-8 w-auto p-6">
          <Typography variant="h6" color="white">
            Job List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Title", "Company", "Status", "Action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 px-5 py-3 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobListings.map((job, index) => (
                <tr key={index}>
                  <td className="border-b border-blue-gray-50 px-5 py-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      {job.title}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 px-5 py-3">
                    <Typography>{job.company}</Typography>
                  </td>

                  <td className="border-b border-blue-gray-50 px-5 py-3">
                    <Typography>{job.status} </Typography>
                  </td>

                  <td className="border-b border-blue-gray-50 px-5 py-3">
                    <a
                      href={job.url}
                      rel="noopener"
                      target="_blank"
                      onClick={() => window()}
                      className=" flex items-center space-x-1 hover:text-green-400"
                    >
                      <Typography variant="h6" className="hover:text-green-400">
                        Visit
                      </Typography>
                      <NavigateNextRoundedIcon />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex w-full justify-end p-2">
            <Pagination
              className="p-5"
              baseUrl={baseUrl}
              currentPage={currentPage}
              totalPages={totalPages}
              fetchData={fetchData}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default JobStreetContainer;
