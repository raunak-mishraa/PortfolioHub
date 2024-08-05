import Link from "next/link";
import React from "react";

function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  console.log(totalPages, currentPage);
  return (
    <div className="flex justify-center mt-10">
      <div className="flex gap-2">
        <Link
          href={currentPage === 1 ? "" : `/projects?page=${currentPage - 1}`}
        >
          <button 
          className={"bg-n-7 text-white px-4 py-2 rounded-md"}
          disabled={currentPage === 1}
          >
            Prev
          </button>
        </Link>
        {Array.from({ length: totalPages }, (_, index) => (
          <Link  key={index} href={`/projects?page=${index + 1}`}>
            <button
             
              className={`${
                currentPage === index + 1 ? "bg-[#AC6AFF]" : "bg-n-7"
              } text-white px-4 py-2 rounded-md`}
            >
              {index + 1}
            </button>
          </Link>
        ))}
        <Link
          href={
            currentPage === totalPages
              ? ""
              : `/projects?page=${currentPage + 1}`
          }
        >
          <button 
          className="bg-n-7 text-white px-4 py-2 rounded-md"
          disabled={currentPage === totalPages}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}

export default React.memo(Pagination);
