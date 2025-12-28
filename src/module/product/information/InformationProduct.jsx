import React, { useState } from "react";
import SubInformationProduct from "./SubInformationProduct";

const InformationProduct = ({ data }) => {
  const [activeThumb, setActiveThumb] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const hasMultipleImages = data?.images?.length > 1;

  return (
    <div className="Information-product bg-white rounded-lg sm:rounded-xl py-4 sm:py-8 px-3 sm:px-6">
      <div className="product-image-wrapper">
        {/* Main Image */}
        <div className="product-image-main relative mb-3 sm:mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center aspect-square sm:aspect-auto">
          <img 
            src={data?.images?.[selectedImage]} 
            alt={`${data?.title || 'Product'} - Main`}
            className="w-full h-auto max-h-72 sm:max-h-96 md:max-h-full object-contain p-2 sm:p-4"
            loading="eager"
          />
        </div>

        {/* Thumbnails - Grid instead of Swiper on mobile */}
        {hasMultipleImages && (
          <div className="product-image-thumbs mt-3 sm:mt-4 w-full">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
              {data.images.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden p-1.5 border-2 transition-all flex items-center justify-center ${
                    selectedImage === index
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img 
                    src={item} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-12 sm:h-16 md:h-20 object-contain"
                    loading="lazy" 
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <SubInformationProduct key={data._id} data={data} />
    </div>
  );
};

export default InformationProduct;
