'use client';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import ArrangeIcon from '@/components/IconComponents/arrange-icon.svg';

interface SortDropdownProps {
  onSort: (sortOption: string) => void;
}

type ArrangeDropdownOption = {
  name: string;
  value: string;
};

const ArrangeDropdownOptionList: ArrangeDropdownOption[] = [
  { name: 'Name', value: 'name' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
];

export default function SortDropdown({ onSort }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (sortOption: string) => {
    onSort(sortOption);
    setSelectedFilter(sortOption);
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
        className='inline-flex justify-betweentext-[16px] font-medium text-gray-700'
      >
        <div className='w-full flex justify-center h-auto'>
          <Image
            width={22}
            height={22}
            src={ArrangeIcon}
            alt='menu_icon'
            className='w-[22px] h-[22px]'
          />
        </div>
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
        <div className='absolute right-0 z-10 mt-2 w-[200px] bg-white border border-black/10 rounded-[8px] shadow-lg'>
          <ul className='px-2'>
            {ArrangeDropdownOptionList.map((arrangOptionObj) => (
              <li
                key={arrangOptionObj.name}
                onClick={() => handleSelect(arrangOptionObj.value)}
                className={`px-3 py-2 cursor-pointer text-[16px] text-gray-700
               rounded-[8px] transition-colors duration-300 my-1.5
               ${selectedFilter === arrangOptionObj.value ? 'bg-black/90 text-white' : 'hover:bg-gray-100'}
             `}
              >
                {arrangOptionObj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
