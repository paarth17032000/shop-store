'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Product } from '@/utils/types';
import { fetchProducts } from '@/utils/api';
import Wrapper from '@/components/Wrapper';
import SearchBar from '@/components/SearchBar';
import ProfileListMenuBar from '@/components/ProfileListMenuBar';
import CartButtonIcon from '@/components/CartButtonIcon';
import FilterDropdown from '@/components/Dropdown/CategoryDropdown';
import ArrangeByNameAndPrice from '@/components/Dropdown/ArrangeByNameAndPriceDropdown';

import { BsCurrencyDollar } from 'react-icons/bs';
import { RiMenuLine } from 'react-icons/ri';

import Logo from '@/components/IconComponents/logo.svg';
import WhishlistIconComponent from '@/components/IconComponents/WhishlistIconComponent';
import SkeletonLoader from '@/components/SkeletonLoader';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleSort = (sortType: string) => {
    const sorted = [...filteredProducts];
    switch (sortType) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleFilter = (category: string) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className='min-h-screen bg-[#F4F4F4] font-montserrat'>
      <Wrapper>
        <div className='flex items-center w-full justify-start md:justify-between my-4 gap-2.5'>
          <div className='md:hidden block'>
            <RiMenuLine size={28} />
          </div>
          <div className='hidden md:flex'>
            <Image
              width={50}
              height={24}
              src={Logo}
              alt='logo'
              className='md:flex hidden w-10 h-auto object-contain'
            />
          </div>

          <div className='flex items-center gap-4 md:w-fit w-full'>
            <SearchBar
              className='flex-1'
              search={search}
              onSearch={setSearch}
            />
            <div className='md:block hidden'>
              <CartButtonIcon color='black' />
            </div>
          </div>
        </div>
      </Wrapper>
      <div className='min-h-[calc(100vh-80px)]'>
        <Wrapper className='mt-5 mb-10'>
          <div className='flex justify-between'>
            <div>
              <h1 className='font-montserrat text-[32px] font-extrabold'>
                Products
              </h1>
              <h2 className='font-montserrat text-[16px] mt-0 font-regular'>
                {filteredProducts.length} products found
              </h2>
            </div>
            <div className='flex items-center gap-1'>
              <ArrangeByNameAndPrice onSort={handleSort} />
              <FilterDropdown onFilter={handleFilter} />
            </div>
          </div>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-10 gap-4 lg:px-20 mt-5 md:mb-10 mb-20'>
                  {filteredProducts
                    .filter((filterProduct) =>
                      filterProduct.title
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    )
                    .map((product) => (
                      <Link
                        href={`/products/${product.id}`}
                        className='flex flex-col bg-white px-4 py-4 rounded-[15px] shadow-sm min-w-[160px] h-[215px] md:w-[250px] md:h-auto'
                        key={product.id}
                      >
                        <div className='w-full flex justify-end'>
                          <WhishlistIconComponent color='black' />
                        </div>
                        <div className='w-full flex justify-center h-auto'>
                          <Image
                            width={150}
                            height={150}
                            src={product.image}
                            alt={product.title}
                            className='md:w-[150px] md:h-[150px] w-[60px] h-[65px] md:my-5'
                          />
                        </div>
                        <h3 className='mt-4 font-semibold font-montserrat capitalize text-[16px]'>
                          {product.title.slice(0, 10)}..
                        </h3>
                        <p className='text-[#7C7A7A] text-[14px] font-montserrat min-h-[45px] overflow-hidden md:overflow-auto'>
                          {product.description.toLowerCase().slice(0, 50)}...
                        </p>
                        <p className='flex items-center font-medium text-[14px] font-montserrat'>
                          <BsCurrencyDollar />
                          {product.price}
                        </p>
                      </Link>
                    ))}
                </div>
              ) : (
                <div className='font-montserrat text-[20px] mt-5 bg-black/80 rounded-[4px] px-4 py-2 text-center text-white font-bold w-full'>
                  No Product Present
                </div>
              )}
            </>
          )}
        </Wrapper>
      </div>

      <ProfileListMenuBar />
    </div>
  );
}
