import { useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css"
// Example items, to simulate fetching from another resources.
const items = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  ,
  1,
  1,
  1,
];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const style = {}
  return (
    <>
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        // asd
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
}

const Pagination = () => {
  return (
    <div>
      <div className="flex items-center justify-between border-t border-[#F5F5F5] bg-white py-3">
        <div className="flex flex-1 justify-between sm:hidden">
          <span className="relative inline-flex items-center rounded-md border  bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </span>
          <span className="relative ml-3 inline-flex items-center rounded-md border  bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </span>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="mb-0 text-[#8A8C8E] text-[14px] font-openSans_regular">
              Showing 10 of 592
            </p>
          </div>
          <div>
            <PaginatedItems itemsPerPage={4} />
            {/* <nav
              className="isolate inline-flex -space-x-px rounded-md justify-center items-center"
              aria-label="Pagination"
            >
              <span className="py-2 pr-5 text-[#8A8C8E] text-[14px] font-openSans_regular cursor-pointer ">
                Previous
              </span>
              <span className="cursor-pointer relative z-10 inline-flex items-center bg-c_FD6769 shadow-sm px-4 py-3 rounded text-sm font-semibold text-white ">
                1
              </span>
              <span className="cursor-pointer relative inline-flex items-center px-4 py-3 rounded text-sm font-semibold    text-[#8A8C8E] text-[14px] font-openSans_regular">
                2
              </span>
              <span className="cursor-pointer relative hidden items-center px-4 py-3 rounded text-sm font-semibold    md:inline-flex  text-[#8A8C8E] text-[14px] font-openSans_regular">
                3
              </span>

              <span className="py-2 pr-5 text-[#8A8C8E] text-[14px] font-openSans_regular cursor-pointer">
                Next
              </span>
            </nav> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
