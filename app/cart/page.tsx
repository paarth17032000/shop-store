'use client';
import Navbar from '@/components/Navbar';
import Wrapper from '@/components/Wrapper';
import { useCart } from '@/context/storeContext';
import Image from 'next/image';

export default function Page() {
  const { state, clearCart, removeFromCart, updateQuantity } = useCart();
  return (
    <div className='min-h-screen bg-[#F4F4F4] font-montserrat'>
      <Navbar />
      Cart Page
      <div className='min-h-[calc(100vh-80px)] flex flex-col items-center justify-center '>
        <Wrapper>
          <div className='mx-20'>
            <div className='flex flex-col gap-4'>
              {state.items.map((item) => (
                <div
                  className='bg-white p-4 rounded-[15px] flex items-center justify-between'
                  key={item.id}
                >
                  <div className='flex items-center gap-8'>
                    <div className='w-full flex justify-center items-center h-auto bg-white w-[150px] h-[150px] rounded-[8px] shadow-sm border border-black/10'>
                      <Image
                        width={250}
                        height={250}
                        src={item.image}
                        alt={item.title}
                        className='w-[100px] h-[100px]'
                      />
                    </div>
                    <div className='flex flex-col gap-4'>
                      <div>{item.title}</div>
                      <div>{item.price}</div>
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => updateQuantity(item.id, 'increment')}
                      className='bg-black text-white rounded-[8px] text-center px-4 py-2.5 cursor-pointer font-bold my-5'
                    >
                      +
                    </div>
                    <div>{item.quantity}</div>
                    <div
                      onClick={() => updateQuantity(item.id, 'decrement')}
                      className='bg-black text-white rounded-[8px] text-center px-4 py-2.5 cursor-pointer font-bold my-5'
                    >
                      -
                    </div>
                    <div
                      onClick={() => removeFromCart(item.id)}
                      className='bg-black text-white rounded-[8px] text-center px-4 py-2.5 cursor-pointer font-bold my-5'
                    >
                      X
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              onClick={clearCart}
              className='bg-black text-white rounded-[8px] text-center px-4 py-2.5 cursor-pointer font-bold my-5'
            >
              Clear Cart
            </div>
            <div className='bg-black text-white rounded-[8px] text-center px-4 py-2.5 cursor-pointer font-bold my-5'>
              Total {state.total}
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
