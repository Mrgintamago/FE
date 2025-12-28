import React from "react";

const Header = () => {
  return (
    <header className="h-10 sm:h-12 md:h-14 w-full bg-dark border-b-2 border-b-red-700 text-white animate-fade-in overflow-hidden">
      <div className="flex items-center container justify-around gap-0.5 sm:gap-2 md:gap-8 h-full mx-auto px-1 sm:px-4">
        {/* Đảm bảo chất lượng */}
        <div className="flex gap-x-0.5 sm:gap-x-2 items-center smooth-transition hover:scale-105 cursor-pointer flex-shrink-0 min-w-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-3 sm:w-5 md:w-6 h-3 sm:h-5 md:h-6 animate-pulse flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-[10px] sm:text-sm md:text-base whitespace-nowrap line-clamp-2">Đảm bảo chất lượng</span>
        </div>

        {/* Miễn phí vận chuyển */}
        <div className="flex gap-x-0.5 sm:gap-x-2 items-center smooth-transition hover:scale-105 cursor-pointer flex-shrink-0 min-w-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-3 sm:w-5 md:w-6 h-3 sm:h-5 md:h-6 animate-pulse flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
          <span className="text-[10px] sm:text-sm md:text-base whitespace-nowrap line-clamp-2">Miễn phí 800K+</span>
        </div>

        {/* Mở hộp kiểm tra */}
        <div className="flex gap-x-0.5 sm:gap-x-2 items-center smooth-transition hover:scale-105 cursor-pointer flex-shrink-0 min-w-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-3 sm:w-5 md:w-6 h-3 sm:h-5 md:h-6 animate-pulse flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
          <span className="text-[10px] sm:text-sm md:text-base whitespace-nowrap line-clamp-2">Mở hộp kiểm tra</span>
        </div>
      </div>
    </header>
  );
};

export default Header;