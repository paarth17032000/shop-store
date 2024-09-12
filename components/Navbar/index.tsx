import React from 'react';
import Wrapper from '../Wrapper';
import { CiShoppingCart } from 'react-icons/ci';
import Link from 'next/link';

export default function Navbar() {
  return (
    <Wrapper className='h-[80px] flex items-center justify-center'>
      <div className='bg-white flex items-center justify-between w-full px-6 py-2 rounded-[15px] w-3/4'>
        <Link href='/' className='font-bold text-[24px]'>SS</Link>
        <Link href='/cart' className='relative'>
          <CiShoppingCart size={28} />
          <span className='absolute right-[-5px] top-[-5px] bg-red-700 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-sm'>
            10
          </span>
        </Link>
      </div>
    </Wrapper>
  );
}
