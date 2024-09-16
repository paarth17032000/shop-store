'use client';
import React from 'react';
import { useCart } from '@/context/storeContext';
import { Product } from '@/utils/types';

export default function AddToCardButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addToCart, setOpenToast, state } = useCart();
  const handleAddToCart = (product: Product) => {
    setOpenToast(true);
    addToCart(product);
  };
  return (
    <div
      onClick={() => handleAddToCart(product)}
      className={`text-white rounded-[10px] text-center px-4 py-4 cursor-pointer text-[16px] font-montserrat font-bold 
        ${className}
        ${state.items.some((item) => item.title === product.title) ? 'pointer-events-none bg-black/80' : 'bg-black '}  
      `}
    >
      {state.items.some((item) => item.title === product.title)
        ? 'ITEM PRESENT IN CART'
        : 'ADD TO CART'}
    </div>
  );
}
