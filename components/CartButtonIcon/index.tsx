'use client';
import React, { useState } from 'react';

import { useCart } from '@/context/storeContext';
import CartSideDrawer from '../CartSideDrawer';
import CartIconComponent from '../IconComponents/CartIconComponent';

export default function CartButtonIcon({ color = 'white' }: { color: string }) {
  const { state } = useCart();
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  return (
    <>
      {/* cart icon button */}
      <div onClick={() => setOpenSideDrawer(true)} className='relative cursor-pointer'>
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
      <CartSideDrawer openSideDrawer={openSideDrawer} setOpenSideDrawer={setOpenSideDrawer} />
    </>
  );
}
