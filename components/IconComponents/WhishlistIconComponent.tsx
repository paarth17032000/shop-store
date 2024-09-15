'use client';
import { useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

export default function WishlistIcon({ color = 'black' }: { color: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='transition-colors duration-700 cursor-pointer linear'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <BsHeartFill className='text-red-600 w-6 h-6' />
      ) : (
        <BsHeart className={`text-${color} w-6 h-6`} />
      )}
    </div>
  );
}
