"use client"
import React from 'react';
import { useCart } from '@/context/storeContext';
import { Product } from '@/utils/types';

export default function AddToCardButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };
  return (
    <div
      onClick={() => handleAddToCart(product)}
      className='bg-black text-white rounded-[8px] text-center px-4 py-2.5 cursor-pointer font-bold my-5'
    >
      ADD TO CART
    </div>
  );
}
