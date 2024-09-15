'use client';
import React, { useState, useEffect, useRef } from 'react';

interface FilterDropdownProps {
  onFilter: (category: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilter }) => {
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
        className='px-3 py-1.5 w-[200px] text-[16px] rounded-[8px] border border-black/10 outline-none bg-white flex items-center justify-between'
      >
        {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
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
            <li
              onClick={() => handleSelect('all')}
              className='px-3 py-2 cursor-pointer hover:bg-gray-100 text-[16px] text-gray-700'
            >
              All Categories
            </li>
            <li
              onClick={() => handleSelect('electronics')}
              className='px-3 py-2 cursor-pointer hover:bg-gray-100 text-[16px] text-gray-700'
            >
              Electronics
            </li>
            <li
              onClick={() => handleSelect('jewelry')}
              className='px-3 py-2 cursor-pointer hover:bg-gray-100 text-[16px] text-gray-700'
            >
              Jewelry
            </li>
            <li
              onClick={() => handleSelect("men's clothing")}
              className='px-3 py-2 cursor-pointer hover:bg-gray-100 text-[16px] text-gray-700'
            >
              Men&apos;s Clothing
            </li>
            <li
              onClick={() => handleSelect("women's clothing")}
              className='px-3 py-2 cursor-pointer hover:bg-gray-100 text-[16px] text-gray-700'
            >
              Women&apos;s Clothing
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
