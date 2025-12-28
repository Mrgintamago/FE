import React from "react";
import BestSellerItem from "../product/BestSellerItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import SkeletonItem from "../../components/skeleton/SkeletonItem";

const BestSellerListHome = ({ data, className = "", loading = false }) => {
  return (
    <div className={`${className} animate-fade-in-up`}>
      {/* Title */}
      <div className="container mb-4 sm:mb-6">
        <div className="flex items-center gap-x-2 sm:gap-x-3">
          <span className="w-2 h-6 sm:h-8 bg-red-600 rounded-full block" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Best Seller</h2>
        </div>
      </div>

      {/* Carousel */}
      <div className="container bg-[url('../images/bg.png')] bg-no-repeat w-full bg-cover rounded-lg shadow-lg overflow-hidden h-[460px]">
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
            className="w-full rounded-lg"
          >
            {data && data.length > 0 &&
              data.map((item) => (
                <SwiperSlide key={item._id || item.id}>
                  <BestSellerItem
                    product={item}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default BestSellerListHome;
