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
      {/* Carousel Container */}
      <div className="relative w-full bg-[url('../images/bg.png')] bg-no-repeat bg-cover rounded-lg shadow-lg overflow-hidden min-h-[420px] sm:min-h-[480px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-10">
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
                  <BestSellerItem
                    product={item}
                    className="w-full"
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
