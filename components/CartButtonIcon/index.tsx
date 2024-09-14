'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/storeContext';
import { IoCloseCircleOutline } from 'react-icons/io5';

import CartIcon from '@/components/IconComponents/cart-icon.svg';
import Image from 'next/image';

export default function CartButtonIcon() {
  const { state } = useCart();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div onClick={() => setMenu(true)} className='relative cursor-pointer'>
        {/* <AiOutlineShoppingCart size={28} /> */}
        <div className='w-full flex justify-center h-auto'>
          <Image
            width={22}
            height={22}
            src={CartIcon}
            alt='menu_icon'
            className='w-[22px] h-[22px]'
          />
        </div>
        <span
          className={`absolute right-[-7px] top-[-7px] bg-red-700  text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-sm`}
        >
          {state.items.length}
        </span>
      </div>
      <div
        className={`fixed top-0 right-0 z-[60] h-screen md:w-[300px] w-full bg-[#F4F4F4] shadow-lg border-l-[1.5px] border-black/30 transform transition-transform duration-500 ease-in-out ${
          menu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setMenu(false)}
          className='absolute top-4 right-4 text-black text-xl'
        >
          <IoCloseCircleOutline size={30} />
        </button>

        {/* Menu content for mbile view */}
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='flex flex-col items-center gap-4 text-[#222222] text-md'>
            {/* <NavItems /> */}
          </div>
        </div>
      </div>
    </>
  );
}
