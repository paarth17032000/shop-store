'use client';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import FilterIcon from '@/components/IconComponents/filter-icon.svg';

interface FilterDropdownProps {
  onFilter: (category: string) => void;
}

type FilterOption = {
  name: string;
  value: string;
};

const filterOptions: FilterOption[] = [
  { name: 'All Categories', value: 'all' },
  { name: 'Electronics', value: 'electronics' },
  { name: 'Jewelry', value: 'jewelry' },
  { name: "Men's Clothing", value: "men's clothing" },
  { name: " Women's Clothing", value: "women's clothing" },
];

export default function FilterDropdown({ onFilter }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (category: string) => {
    onFilter(category);
    setSelectedCategory(category);
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
        {/* {selectedCategory === 'all' ? 'All Categories' : selectedCategory} */}
        <div className='w-full flex justify-center h-auto'>
          <Image
            width={22}
            height={22}
            src={FilterIcon}
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
          <ul className='py-1'>
            {filterOptions.map((filterOptionObj) => (
              <li
                key={filterOptionObj.name}
                onClick={() => handleSelect(filterOptionObj.value)}
                className={`px-3 py-2 cursor-pointer text-[16px] text-gray-700 
                    ${selectedCategory === filterOptionObj.value ? 'bg-black/90 text-white' : 'hover:bg-gray-100'}
                `}
              >
                {filterOptionObj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
