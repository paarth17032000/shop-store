'use client';
import React, { useEffect } from 'react';

export default function ToastContainer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      timer = setTimeout(() => {
        setOpen(false);
      }, 3000); // Adjust the duration as needed
    }

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [open, setOpen]);

  return (
    <div
      className={`fixed left-5 top-5 h-10 text-white bg-black border border-white shadow-lg rounded-[6px]
        transform transition-transform duration-500 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-[120vw]'
        }`}
    >
      <div className='flex items-center justify-center h-full px-4'>
        Item has been added to the cart.
      </div>
    </div>
  );
}
