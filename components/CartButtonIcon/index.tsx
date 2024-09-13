'use client';
import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/storeContext';
import { CiShoppingCart } from 'react-icons/ci';

export default function CartButtonIcon() {
  const { state } = useCart();
  return (
    <Link href='/cart' className='relative'>
      <CiShoppingCart size={28} />
      <span
        className={`absolute right-[-5px] top-[-5px] bg-red-700 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-sm`}
      >
        {state.items.length}
      </span>
    </Link>
  );
}
