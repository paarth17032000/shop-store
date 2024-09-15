'use client';
import React, { useState, useEffect, useRef } from 'react';

interface SortDropdownProps {
  onSort: (sortOption: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (sortOption: string) => {
    onSort(sortOption);
    setIsOpen(false);
  };

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
        className='inline-flex justify-between w-[175px] px-3 py-1.5 rounded-[8px] border border-black/10 bg-white text-[16px] font-medium text-gray-700'
      >
        Sort by
        <svg
          className={`ml-2 w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
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
        <div className='absolute right-0 z-10 mt-2 w-[175px] bg-white border border-black/10 rounded-[8px] shadow-lg'>
          <ul className='py-1'>
            <li
              onClick={() => handleSelect('price-asc')}
              className='px-3 py-2 cursor-pointer hover:bg-gray-100 text-[16px] text-gray-700'
            >
              Price: Low to High
            </li>
            <li
              onClick={() => handleSelect('price-desc')}
              className='px-3 py-2 cursor-pointer hover:bg-gray-100 text-[16px] text-gray-700'
            >
              Price: High to Low
            </li>
            <li
              onClick={() => handleSelect('name')}
              className='px-3 py-2 cursor-pointer hover:bg-gray-100 text-[16px] text-gray-700'
            >
              Name
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
