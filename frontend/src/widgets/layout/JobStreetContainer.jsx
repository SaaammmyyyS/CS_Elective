import React, { useState, useEffect } from "react";
import { Typography, Input } from "@material-tailwind/react";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button } from "@material-tailwind/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

const JobStreetContainer = ({ refreshKey }) => {
  const [jobListings, setJobListings] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const baseUrl = `http://localhost:8000/api/job-listings`;
  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const responseData = await response.json();
      setJobListings(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const template = {
    layout: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink",
    FirstPageLink: (options) => {
      return (
        <Button
          variant="text"
          className="flex w-4 justify-center bg-transparent text-black hover:bg-gray-200"
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="">
            <ChevronDoubleLeftIcon className="h-4 w-4" />
          </span>
        </Button>
      );
    },
    LastPageLink: (options) => {
      return (
        <Button
          variant="text"
          className="flex w-4 justify-center bg-transparent text-black hover:bg-gray-200"
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="">
            <ChevronDoubleRightIcon className="h-4 w-4" />
          </span>
        </Button>
      );
    },
    PrevPageLink: (options) => {
      return (
        <Button
          variant="text"
          size="md"
          className="mr-2 bg-transparent text-black hover:bg-gray-200"
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="flex space-x-4">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Previous
          </span>
        </Button>
      );
    },
    NextPageLink: (options) => {
      return (
        <Button
          variant="text"
          size="md"
          className="ml-2 bg-transparent text-black hover:bg-gray-200"
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="flex">
            Next
            <ChevronRightIcon className="ml-2 h-4 w-4" />
          </span>
        </Button>
      );
    },
    PageLinks: (options) => {
      const isActive = options.page === options.currentPage;
      const buttonClassName = isActive ? "bg-gray-100 " : "";

      return (
        <Button
          type="button"
          variant="text"
          className={buttonClassName}
          onClick={options.onClick}
        >
          {options.page + 1}
        </Button>
      );
    },
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
          className="my-4 table-auto border-collapse space-x-2 overflow-y-scroll whitespace-nowrap border-black px-8"
          filters={filters}
          sortMode="multiple"
          paginator
          rows={10}
          paginatorTemplate={template}
          paginatorLeft
          paginatorClassName="mt-5 align-center"
          totalRecords={120}
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
    </div>
  );
};

export default JobStreetContainer;
