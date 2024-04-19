import React, { useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ currentPage, totalPages, fetchData }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      fetchData(currentPage - 1); // Fetch data for the previous page
    }
  };

  const handleNextClick = () => {
    fetchData(currentPage + 1); // Fetch data for the next page
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        <span className="mb-4 block w-full px-5 py-1 text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto">
          Page{" "}
          <span
            data-testid="current-page"
            className="font-semibold text-gray-900 dark:text-white"
          >
            {currentPage}
          </span>{" "}
          of{" "}
          <span
            data-testid="last-page"
            className="font-semibold text-gray-900 dark:text-white"
          >
            {totalPages}
          </span>
        </span>
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
