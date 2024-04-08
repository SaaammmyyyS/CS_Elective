import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";

import React, { useState, useEffect } from "react";
import Pagination from "@/widgets/ui/pagination";

export function UserList() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;
  const baseUrl = `http://localhost:8000/api/all/users`;
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

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
      const { results, count, next, previous } = responseData;
      setData(results);
      setTotalPages(Math.ceil(count / pageSize));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Job Scrapers
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["user", "function", "status", "employed", ""].map((el) => (
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
              {data.map((user, key) => {
                const className = `py-3 px-5 ${
                  key === data.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={user.name}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={""}
                          alt={user.name}
                          size="sm"
                          variant="rounded"
                        />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {user.name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {user.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {"Software Developer"}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {"Coding"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color={"green"}
                        value={"online"}
                        className="w-fit px-2 py-0.5 text-[11px] font-medium"
                      />
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {"date"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        Edit
                      </Typography>
                    </td>
                  </tr>
                );
              })}
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
}
export default UserList;
