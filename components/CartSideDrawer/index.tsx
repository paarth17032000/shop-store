'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/storeContext';
import Wrapper from '../Wrapper';
import QuantityDropdown from '../Dropdown/QuantityDropdown';
import WhishlistIcon from '@/components/IconComponents/whishlist-icon-black.svg';
import RemoveIcon from '@/components/IconComponents/remove-icon.svg';
import { BsCurrencyDollar } from 'react-icons/bs';

export default function CartSideDrawer() {
  const { state, clearCart, removeFromCart } = useCart();

  return (
    <>
      {state.items.length === 0 ? (
        <div className='min-h-[calc(100vh-80px)] font-montserrat text-black flex flex-col items-center'>
          <Wrapper>
            <div className='font-bold text-[28px] leading-5 my-2'>Cart</div>
            <div className='font-regular text-[18px] mb-5'>
              Currently there are no items in the cart.
            </div>
            <Link
              href='/'
              className='bg-black/90 hover:bg-black text-white trasition duration-300 linear rounded-[8px] text-center px-4 py-3 cursor-pointer font-bold mt-4'
            >
              See Our Products
            </Link>
          </Wrapper>
        </div>
      ) : (
        <div className='min-h-[calc(100vh-80px)] font-montserrat text-black flex flex-col items-center justify-between'>
          {/* <Wrapper> */}
          <div className='mx-4'>
            <div className='font-bold w-full text-[28px] leading-5 mb-4'>
              Cart
            </div>
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
                        className=' w-[84px] h-[100px]' // Ensure consistent size and contain aspect ratio
                      />
                    </div>

                    <div className='flex flex-col'>
                      {/* Product Title and Price */}
                      <div className='flex flex-col gap-1'>
                        <div className='font-extrabold leading-5'>
                          {item.title}
                        </div>
                        <p className='flex items-center font-medium text-[14px] font-montserrat'>
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
                      <div className='flex items-center justify-start gap-4 my-2'>
                        <div className='hover:fill-red-400 cursor-pointer'>
                          <Image
                            width={22}
                            height={22}
                            src={WhishlistIcon}
                            alt='wishlist_icon'
                            className='w-[22px] h-[22px]' // Explicit sizing for consistency
                          />
                        </div>
                        <div
                          onClick={() => removeFromCart(item.id)}
                          className='cursor-pointer'
                        >
                          <Image
                            width={22}
                            height={22}
                            src={RemoveIcon}
                            alt='remove_icon'
                            className='w-[22px] h-[22px]' // Explicit sizing for consistency
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
              <div className='flex items-center font-regular text-[14px] justify-between mt-5'>
                <div>Subtotal</div>
                <div>{state.total}</div>
              </div>
              <div className='flex items-center font-regular text-[14px] justify-between mt-3'>
                <div>Delivery & Handling</div>
                <div>Free</div>
              </div>
              <hr className='my-3 bg-black/30' />
              <div className='flex items-center font-regular text-[14px] justify-between my-4'>
                <div>Total</div>
                <div>{state.total}</div>
              </div>
            </div>

            {/* Clear Cart Button */}
          </div>
          <div className=' w-full px-4'>
            <div
              onClick={clearCart}
              className='border-2 text-black hover:text-white trasition duration-300 linear border-black hover:bg-black rounded-[8px] text-center px-4 py-2.5 cursor-pointer font-bold'
            >
              Clear Cart
            </div>

            {/* Total Section */}
            <div className='bg-black/90 hover:bg-black text-white trasition duration-300 linear rounded-[8px] text-center px-4 py-3 cursor-pointer font-bold mt-4'>
              Checkout
            </div>
          </div>
          {/* </Wrapper> */}
        </div>
      )}
    </>
  );
}
