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
  const { addToCart } = useCart();
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };
  return (
    <div
      onClick={() => handleAddToCart(product)}
      className={`bg-black text-white rounded-[10px] text-center px-4 py-4 cursor-pointer text-[16px] font-montserrat font-bold ${className}`}
    >
      ADD TO CART
    </div>
  );
}
