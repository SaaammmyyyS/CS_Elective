import React, { useState, useEffect } from "react";
import { Typography, Input } from "@material-tailwind/react";
import Pagination from "../ui/pagination";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

const JobStreetContainer = ({ refreshKey }) => {
  const [jobListings, setJobListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const baseUrl = `http://localhost:8000/api/job-listings`;
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

  const renderVisitLink = (rowData) => {
    return (
      <a
        href={rowData.url}
        target="_blank"
        rel="noopener noreferrer"
        className=" flex items-center space-x-1 hover:text-green-400"
      >
        <Typography variant="h6" className="hover:text-green-400">
          Visit
        </Typography>
        <NavigateNextRoundedIcon />
      </a>
    );
  };

  return (
    <div className="h-full md:w-full">
      <div className="flex w-full justify-end pr-5">
        <div className="w-60">
          <Input
            label="Search"
            onInput={(e) => {
              setFilters({
                global: {
                  value: e.target.value,
                  matchMode: FilterMatchMode.CONTAINS,
                },
              });
            }}
          />
        </div>
      </div>

      <div className="w-full min-w-[640px]">
        <DataTable
          value={jobListings}
          className="my-4 table-auto border-collapse space-x-2 whitespace-nowrap border-black px-8"
          filters={filters}
          sortMode="multiple"
        >
          <Column
            field="title"
            header="Title"
            sortable
            className="border-t py-4 text-sm font-semibold"
            headerClassName="uppercase text-blue-gray-400 font-bold text-sm  space-x-2 py-3"
          />
          <Column
            field="company"
            header="Company"
            sortable
            className="border-t font-light"
            headerClassName="uppercase text-blue-gray-400 font-bold text-sm space-x-2"
          />
          <Column
            field="status"
            header="Status"
            sortable
            className="border-t"
            headerClassName="uppercase text-blue-gray-400 font-bold text-sm  space-x-2"
          />
          <Column
            header="Action"
            field="Visit"
            body={renderVisitLink}
            className="border-t"
            headerClassName="uppercase text-blue-gray-400 font-bold text-sm space-x-2"
          />
        </DataTable>
      </div>

      <div className="flex w-full justify-center p-2 md:justify-end">
        <Pagination
          className="p-5"
          baseUrl={baseUrl}
          currentPage={currentPage}
          totalPages={totalPages}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default JobStreetContainer;
