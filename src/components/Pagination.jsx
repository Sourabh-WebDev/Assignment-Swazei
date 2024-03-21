import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({ totalPage, currentPage, onPageChange }) {

  const pageRange = totalPage > 5 ? 5 : totalPage;

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const end = Math.min(totalPage, start + pageRange - 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page) => (
          <IconButton
            key={page}
            variant={currentPage === page ? "filled" : "text"}
            color="gray"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
