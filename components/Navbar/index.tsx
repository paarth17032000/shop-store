import React from 'react';
import Link from 'next/link';
import Wrapper from '../Wrapper';
import CartButtonIcon from '../CartButtonIcon';

export default function Navbar() {
  return (
    <Wrapper className='h-[80px] flex items-center justify-center'>
      <div className='bg-white flex items-center justify-between w-full px-6 py-2 rounded-[15px] w-3/4'>
        <Link href='/' className='font-bold text-[24px]'>
          SS
        </Link>
        <CartButtonIcon />
      </div>
     
    </Wrapper>
  );
}
