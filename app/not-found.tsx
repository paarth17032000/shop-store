'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Notfound() {
  const router = useRouter();
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='font-medium'>
        This route is currently not present.
        <div
          onClick={() => router.push('/')}
          className='bg-black/90 text-white rounded-[10px] text-center px-3 py-2 mt-2 cursor-pointer text-[16px] font-montserrat font-bold'
        >
          Return to Home Page
        </div>
      </div>
    </div>
  );
}
