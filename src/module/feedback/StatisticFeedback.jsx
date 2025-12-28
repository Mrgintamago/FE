import React from "react";
import ProgressBar from "../../components/progressbar/ProgressBar";
import { FaStar } from "react-icons/fa";

const StatisticFeedback = ({ data }) => {
  const stars = Array(5).fill(0);
  const hasRatings = data?.ratingsQuantity > 0;
  const averageRating = hasRatings ? (data.ratingsAverage || 0) : 0;
  
  // Hiển thị số nguyên khi không có đánh giá, số thập phân khi có đánh giá
  const displayRating = hasRatings ? averageRating.toFixed(1) : "0";
  
  return (
    <div className="w-full bg-white rounded-lg mx-auto mt-6 border-2 border-solid feelback flex flex-col">
      {/* Left section - Summary */}
      <div className="flex flex-col items-center justify-center border-b border-solid py-6 px-3 sm:px-6">
        <span className="text-2xl sm:text-3xl font-bold">{displayRating} / 5</span>
        <span className="flex items-center justify-center gap-x-2 sm:gap-x-3 mt-3">
          {stars.map((item, index) => {
            const starValue = index + 1;
            const isFilled = hasRatings && averageRating >= starValue;
            const isHalfFilled = hasRatings && averageRating >= index + 0.5 && averageRating < starValue;
            
            return (
              <FaStar 
                key={index} 
                color={isFilled || isHalfFilled ? "#ffba5a" : "#d1d5db"} 
                size={16} 
                className="sm:w-5 sm:h-5" 
              />
            );
          })}
        </span>
        <span className="mt-3 text-sm sm:text-base text-center">
          {data?.ratingsQuantity || 0} đánh giá
        </span>
      </div>
      
      {/* Right section - Rating bars */}
      <div className="flex flex-col items-stretch justify-center gap-y-3 sm:gap-y-4 px-3 sm:px-6 py-6">
        <div className="flex flex-row items-center justify-between gap-x-2 sm:gap-x-3">
          <span className="flex flex-row items-center gap-x-1 sm:gap-x-2 flex-shrink-0 text-sm sm:text-base">
            5 <FaStar color="#ffba5a" size={14} className="sm:w-5 sm:h-5" />
          </span>
          <ProgressBar
            value={(data.eachRating[4] / data.ratingsQuantity) * 100 || 0}
          />
          <span className="flex-shrink-0 text-xs sm:text-sm text-right">{data.eachRating[4]}</span>
        </div>
        <div className="flex flex-row items-center justify-between gap-x-2 sm:gap-x-3">
          <span className="flex flex-row items-center gap-x-1 sm:gap-x-2 flex-shrink-0 text-sm sm:text-base">
            4 <FaStar color="#ffba5a" size={14} className="sm:w-5 sm:h-5" />
          </span>
          <ProgressBar
            value={(data.eachRating[3] / data.ratingsQuantity) * 100 || 0}
          />
          <span className="flex-shrink-0 text-xs sm:text-sm text-right">{data.eachRating[3]}</span>
        </div>
        <div className="flex flex-row items-center justify-between gap-x-2 sm:gap-x-3">
          <span className="flex flex-row items-center gap-x-1 sm:gap-x-2 flex-shrink-0 text-sm sm:text-base">
            3 <FaStar color="#ffba5a" size={14} className="sm:w-5 sm:h-5" />
          </span>
          <ProgressBar
            value={(data.eachRating[2] / data.ratingsQuantity) * 100 || 0}
          />
          <span className="flex-shrink-0 text-xs sm:text-sm text-right">{data.eachRating[2]}</span>
        </div>
        <div className="flex flex-row items-center justify-between gap-x-2 sm:gap-x-3">
          <span className="flex flex-row items-center gap-x-1 sm:gap-x-2 flex-shrink-0 text-sm sm:text-base">
            2 <FaStar color="#ffba5a" size={14} className="sm:w-5 sm:h-5" />
          </span>
          <ProgressBar
            value={(data.eachRating[1] / data.ratingsQuantity) * 100 || 0}
          />
          <span className="flex-shrink-0 text-xs sm:text-sm text-right">{data.eachRating[1]}</span>
        </div>
        <div className="flex flex-row items-center justify-between gap-x-2 sm:gap-x-3">
          <span className="flex flex-row items-center gap-x-1 sm:gap-x-2 flex-shrink-0 text-sm sm:text-base">
            1 <FaStar color="#ffba5a" size={14} className="sm:w-5 sm:h-5" />
          </span>
          <ProgressBar
            value={(data.eachRating[0] / data.ratingsQuantity) * 100 || 0}
          />
          <span className="flex-shrink-0 text-xs sm:text-sm text-right">{data.eachRating[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticFeedback;
