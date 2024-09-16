'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Wrapper from '../Wrapper';
import { useCart } from '@/context/storeContext';
import QuantityDropdown from '../Dropdown/QuantityDropdown';

import { BsCurrencyDollar } from 'react-icons/bs';
import WhishlistIconComponent from '@/components/IconComponents/WhishlistIconComponent';
import RemoveIcon from '@/components/IconComponents/remove-icon.svg';
import { IoCloseCircleOutline } from 'react-icons/io5';

export default function CartSideDrawer({
  openSideDrawer,
  setOpenSideDrawer,
}: {
  openSideDrawer: boolean;
  setOpenSideDrawer: (openSideDrawer: boolean) => void;
}) {
  const router = useRouter();
  const { state, clearCart, removeFromCart } = useCart();

  // Manage body scroll when the drawer is open
  useEffect(() => {
    document.body.style.overflow = openSideDrawer ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Reset when component unmounts
    };
  }, [openSideDrawer]);

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 z-[60]  md:w-[350px] w-full bg-[#F4F4F4] shadow-lg 
      border-l-[1.5px] border-black/30 transform transition-transform duration-500 ease-in-out ${
        openSideDrawer ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className='flex flex-col h-full'>
        {/* Close Button */}
        <button
          onClick={() => setOpenSideDrawer(false)}
          className='flex justify-end w-full text-black text-xl mt-3 px-4'
        >
          <IoCloseCircleOutline size={30} />
        </button>

        {/* Scrollable Content */}
        <div className='flex-1 overflow-y-auto'>
          {state.items.length === 0 ? (
            // when no product is added to cart
            <div className='min-h-[calc(100vh-60px)] font-montserrat text-black flex flex-col items-center'>
              <Wrapper>
                <div className='font-bold text-[28px] leading-5 my-2'>Cart</div>
                <div className='font-regular text-[18px] mb-5'>
                  Currently there are no items in the cart.
                </div>
                <div
                  onClick={() => {
                    router.push('/');
                    setOpenSideDrawer(false);
                  }}
                  className='bg-black/90 hover:bg-black text-white cursor-pointer transition duration-300 linear rounded-[8px] text-center px-4 py-2.5 cursor-pointer font-bold mt-4'
                >
                  See Our Products
                </div>
              </Wrapper>
            </div>
          ) : (
            <div className='min-h-[calc(100vh-100px)] flex flex-col justify-between font-montserrat text-black flex flex-col gap-4 mx-4 my-6'>
              <div className=''>
                <div className='font-bold w-full text-[28px] leading-5 mb-4'>
                  Cart
                </div>
                {/* products in cart */}
                <div className='flex flex-col gap-2'>
                  {state.items.map((item) => (
                    <div key={item.id}>
                      <div className='flex items-start gap-4'>
                        {/* Product Image */}
                        <div className='flex justify-center items-center bg-white min-w-[130px] min-h-[140px] py-2.5 rounded-[8px] shadow-sm border border-black/10'>
                          <Image
                            width={84}
                            height={100}
                            src={item.image}
                            alt={item.title}
                            className='w-[84px] h-[100px]'
                          />
                        </div>

                        <div className='flex flex-col'>
                          {/* Product Title and Price */}
                          <div className='flex flex-col gap-1'>
                            <div className='font-extrabold leading-5'>
                              {item.title}
                            </div>
                            <p className='flex items-center font-medium text-[14px]'>
                              <BsCurrencyDollar />
                              {item.price}
                            </p>
                          </div>

                          {/* Quantity Dropdown */}
                          <QuantityDropdown
                            productId={item.id}
                            quantity={item.quantity}
                          />

                          {/* Wishlist and Remove Icons */}
                          <div className='flex items-center gap-4 my-2'>
                            <WhishlistIconComponent color='black' />
                            <div
                              onClick={() => removeFromCart(item.id)}
                              className='cursor-pointer'
                            >
                              <Image
                                width={22}
                                height={22}
                                src={RemoveIcon}
                                alt='remove_icon'
                                className='w-[22px] h-[22px]'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className='my-3 bg-black/30' />
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className='mt-3'>
                  <div className='text-[24px] font-extrabold'>Summary</div>
                  <div className='flex items-center text-[14px] justify-between mt-5'>
                    <div>Subtotal</div>
                    <p className='flex items-center font-medium text-[14px]'>
                      <BsCurrencyDollar />
                      {state.total}
                    </p>
                  </div>
                  <div className='flex items-center text-[14px] justify-between mt-3'>
                    <div>Delivery & Handling</div>
                    <div>Free</div>
                  </div>
                  <hr className='my-3 bg-black/30' />
                  <div className='flex items-center text-[14px] justify-between my-4'>
                    <div>Total</div>
                    <p className='flex items-center font-medium text-[14px]'>
                      <BsCurrencyDollar />
                      {state.total}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div
                  onClick={clearCart}
                  className='border-2 text-black hover:text-white transition duration-300 linear border-black hover:bg-black rounded-[8px] text-center px-4 py-2.5 cursor-pointer font-bold mb-4'
                >
                  Clear Cart
                </div>
                <div className='bg-black/90 hover:bg-black text-white transition duration-300 linear rounded-[8px] text-center px-4 py-3 cursor-pointer font-bold'>
                  Checkout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
