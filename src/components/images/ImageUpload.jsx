import React, { Fragment } from "react";

const ImageUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image = "",
    handleDeleteImage = () => {},
    disabled = false,
    ...rest
  } = props;
  return (
    <label
      className={`flex items-center justify-center border border-dashed w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 rounded-full ${className} relative overflow-hidden group ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        disabled={disabled}
        {...rest}
      />
      {progress !== 0 && !image && (
        <div className="loading w-16 h-16 border-8 border-green-500 border-t-transparent animate-spin absolute z-10 rounded-full"></div>
      )}
      {!image && progress === 0 && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img
            src="/images/img-upload.png"
            alt="upload-img"
            className="max-w-12 sm:max-w-14 md:max-w-16 mb-2 sm:mb-3"
          />
          <p className="font-semibold text-xs sm:text-sm">Choose photo</p>
        </div>
      )}
      {image && (
        <Fragment>
          <img src={image} className="w-full h-full object-cover" alt="" />
          <button
            type="button"
            className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white rounded-full flex items-center justify-center cursor-pointer absolute z-10 text-red-500 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible"
            onClick={handleDeleteImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </Fragment>
      )}
      {!image && (
        <div
          className="absolute w-10 h-1 bg-green-400 bottom-0 left-0 transition-all image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};

export default ImageUpload;
