'use client';
import React, { useState } from 'react';

import { useCart } from '@/context/storeContext';
import CartSideDrawer from '../CartSideDrawer';
import CartIconComponent from '../IconComponents/CartIconComponent';

import { IoCloseCircleOutline } from 'react-icons/io5';

export default function CartButtonIcon({ color = 'white' }: { color: string }) {
  const { state } = useCart();
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div onClick={() => setMenu(true)} className='relative cursor-pointer'>
        <div className='w-[22px] h-[22px] flex items-center justify-center'>
          <CartIconComponent color={color} />
        </div>
        <span
          className={`absolute right-[-7px] top-[-7px] bg-red-700 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-sm`}
        >
          {state.items.length}
        </span>
      </div>

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[60] min-h-screen md:w-[325px] w-full bg-[#F4F4F4] shadow-lg border-l-[1.5px] border-black/30 transform transition-transform duration-500 ease-in-out ${
          menu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setMenu(false)}
          className='flex justify-end w-full text-black text-xl mt-3 px-4'
        >
          <IoCloseCircleOutline size={30} />
        </button>

        {/* Scrollable content */}
        <div className='overflow-y-auto h-[calc(100vh-60px)]  no-scrollbar'>
          <CartSideDrawer setMenu={setMenu} />
        </div>
      </div>
    </>
  );
}
