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
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center gap-x-2 sm:gap-x-3">
            <span className="w-2 h-6 sm:h-7 bg-red-600 rounded-full block flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          </div>
        </div>
      )}
      <div
        className={`relative ${
          bg === "bg1" ? 'bg-[url("../images/bg.png")]' : ""
        }
        ${bg === "bg2" ? 'bg-[url("../images/bg2.png")]' : ""}
           bg-no-repeat bg-cover rounded-lg shadow-lg overflow-hidden min-h-[200px] sm:min-h-[260px] md:min-h-[320px] lg:min-h-[380px] px-3 sm:px-6 py-4 sm:py-6`}
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
              360: {
                slidesPerView: 1.3,
                slidesPerGroup: 1,
                spaceBetween: 8,
              },
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
            className="w-full h-full py-8 sm:py-10"
          >
            {data && data.length > 0 &&
              data.map((item) => (
                <SwiperSlide key={item._id || item.id} className="w-full flex items-center justify-center !h-auto">
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
