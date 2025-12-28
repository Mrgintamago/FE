import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { bannerData } from "../../api/bannerData";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Banner = () => {
  return (
    <div className="mt-10 animate-fade-in">
      <div className="container w-full banner-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation
          effect="fade"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          speed={800}
          className="w-full rounded-lg shadow-lg"
        >
          {bannerData.length > 0 &&
            bannerData.map((item) => (
              <SwiperSlide key={item.id}>
                <img
                  src={item.img}
                  alt={item.title || "Banner"}
                  className="w-full h-full object-cover"
                  loading={item.id === bannerData[0]?.id ? "eager" : "lazy"}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
