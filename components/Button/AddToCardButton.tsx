import React from 'react';

export default function AddToCardButton({ id }: { id: number }) {
  const handleAddToCart = (id: number) => {
    console.log(id);
  };
  return (
    <div
      onClick={() => handleAddToCart(id)}
      className='bg-black text-white rounded-[8px] text-center px-4 py-2.5 cursor-pointer font-bold my-5'
    >
      ADD TO CART
    </div>
  );
}
