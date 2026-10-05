import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Always show 1, 2, 3, ..., last
  const pages: (number | string)[] = [];

  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3, "...", totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1 text-sm rounded-md disabled:opacity-40 hover:bg-gray-100 cursor-pointer"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-sm">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page as number)}
            className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
              currentPage === page
                ? "bg-black text-white shadow"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1 text-sm rounded-md disabled:opacity-40 hover:bg-gray-100 cursor-pointer"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
