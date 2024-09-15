'use client';
import { useCart } from '@/context/storeContext';
import { useState, useEffect, useRef } from 'react';

export default function QuantityDropdown({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) {
  const { updateQuantity } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState<number>(quantity);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (quantity: number) => {
    updateQuantity(productId, quantity);
    setSelectedQuantity(quantity);
    setIsOpen(false);
  };

  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className='relative inline-block text-left'>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className='inline-flex justify-between w-[150px] rounded-md text-sm font-medium text-gray-700'
      >
        Quantity: {selectedQuantity}
        <svg
          className={`ml-2 w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className='absolute right-0 z-10 mt-2 w-[150px] bg-white border border-gray-200 rounded-md shadow-lg'>
          <ul className='py-1'>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((quantity) => (
              <li
                key={quantity}
                onClick={() => handleSelect(quantity)}
                className='px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700'
              >
                {quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
