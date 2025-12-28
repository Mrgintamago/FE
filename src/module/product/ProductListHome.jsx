import React from "react";
import ProdictItem from "../product/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import SkeletonItem from "../../components/skeleton/SkeletonItem";

const ProductListHome = ({ data, bg = "", className = "", title = "", loading = false }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    const path = slugify(item.title, { strict: true });
    navigate(`/${path}/${item._id}`);
  };
  return (
    <div className={`${className} animate-fade-in-up`}>
      {title && (
        <div className="container mb-4 sm:mb-6">
          <div className="flex items-center gap-x-2 sm:gap-x-3">
            <span className="w-2 h-6 sm:h-8 bg-red-600 rounded-full block" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
          </div>
        </div>
      )}
      <div
        className={`container ${
          bg === "bg1" ? 'bg-[url("../images/bg.png")] h-[460px]' : ""
        }
        ${bg === "bg2" ? 'bg-[url("../images/bg2.png")] h-[460px]' : ""}
           bg-no-repeat w-full bg-cover rounded-lg shadow-lg overflow-hidden`}
      >
        {loading ? (
          <div className="p-5">
            <SkeletonItem className="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5" totalItem={5} />
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, EffectCards]}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={8}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                slidesPerGroup: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 5,
                slidesPerGroup: 5,
                spaceBetween: 12,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            className={`w-full rounded-lg ${className}`}
          >
            {data && data.length > 0 &&
              data.map((item) => (
                <SwiperSlide key={item._id || item.id}>
                  <ProdictItem
                    product={item}
                    onClickItem={() => handleClick(item)}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ProductListHome;
