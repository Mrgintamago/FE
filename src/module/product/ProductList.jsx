import React from "react";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import slugify from "slugify";
import Pagination from "react-js-pagination";

const ProductList = ({ data, handlePageClick, page, totalPage }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    const path = slugify(item.title, { strict: true });
    navigate(`/${path}/${item._id}`);
  };

  return (
    <>
      <div className="mt-20 animate-fade-in-up">
        <div className="flex flex-col container rounded-lg bg-white shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-5 bg-red-800 rounded-t-lg">
            <span className="shop-name-white text-3xl font-bold animate-slide-in-left">Figure</span>
            <div className="flex items-center gap-x-1 cursor-pointer hover-scale animate-slide-in-right">
              <span
                className="text-base text-white font-semibold hover:text-gray-200 smooth-transition"
                onClick={() => navigate("/product")}
              >
                Xem tất cả
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
          <div className="grid-cols-5 grid gap-y-2 pb-10 items-stretch">
            {data.length > 0 &&
              data.map((item, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductItem
                    product={item}
                    onClickItem={() => handleClick(item)}
                    className="border-2 border-solid border-[#f6f6f6]"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-5 animate-fade-in">
          <Pagination
            activePage={page}
            nextPageText={">"}
            prevPageText={"<"}
            totalItemsCount={totalPage}
            itemsCountPerPage={1}
            firstPageText={"<<"}
            lastPageText={">>"}
            linkClass="page-num smooth-transition"
            onChange={handlePageClick}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
