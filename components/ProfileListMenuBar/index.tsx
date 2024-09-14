import React from 'react';
import PageIcon from '@/components/IconComponents/page-icon.svg';
import ListIcon from '@/components/IconComponents/list-icon.svg';
import WhishlistIcon from '@/components/IconComponents/whishlist-icon.svg';
import ProfileIcon from '@/components/IconComponents/profile-icon.svg';
import Image from 'next/image';
import CartButtonIcon from '../CartButtonIcon';

export default function ProfileListMenuBar() {
  return (
    <div className='bg-black text-white flex items-center justify-around fixed bottom-0 left-0 right-0 h-[60px]'>
      <div className='w-full flex justify-center h-auto'>
        <Image
          width={22}
          height={22}
          src={PageIcon}
          alt='menu_icon'
          className='w-[22px] h-[22px]'
        />
      </div>
      <div className='w-full flex justify-center h-auto'>
        <Image
          width={22}
          height={22}
          src={ListIcon}
          alt='menu_icon'
          className='w-[22px] h-[22px]'
        />
      </div>
      <div className='w-full flex justify-center h-auto'>
        <CartButtonIcon />
      </div>
      <div className='w-full flex justify-center h-auto'>
        <Image
          width={22}
          height={22}
          src={WhishlistIcon}
          alt='menu_icon'
          className='w-[22px] h-[22px]'
        />
      </div>
      <div className='w-full flex justify-center h-auto'>
        <Image
          width={22}
          height={22}
          src={ProfileIcon}
          alt='menu_icon'
          className='w-[22px] h-[22px]'
        />
      </div>
    </div>
  );
}
