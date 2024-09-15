import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-10 gap-4 lg:px-20 mt-5 md:mb-10 mb-20'>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className='flex flex-col bg-white px-4 py-4 rounded-[15px] shadow-sm min-w-[160px] h-[215px] md:w-[250px] md:h-auto animate-pulse'
        >
          {/* Whishlist Icon Placeholder */}
          <div className='w-full flex justify-end'>
            <div className='w-5 h-5 bg-gray-300 rounded-full'></div>
          </div>

          {/* Product Image Placeholder */}
          <div className='w-full flex justify-center h-auto'>
            <div className='md:w-[150px] md:h-[150px] w-[60px] h-[65px] md:my-5 bg-gray-300 rounded-md'></div>
          </div>

          {/* Product Title Placeholder */}
          <div className='mt-4 h-5 w-[80%] bg-gray-300 rounded'></div>

          {/* Product Description Placeholder */}
          <div className='mt-2 h-4 w-full bg-gray-300 rounded'></div>
          <div className='mt-1 h-4 w-[90%] bg-gray-300 rounded'></div>

          {/* Product Price Placeholder */}
          <div className='flex items-center mt-4'>
            <div className='h-5 w-5 bg-gray-300 rounded-full mr-2'></div>
            <div className='h-5 w-[40%] bg-gray-300 rounded'></div>
          </div>
        </div>
      ))}
    </div>
  );
}
