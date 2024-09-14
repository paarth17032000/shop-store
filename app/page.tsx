'use client';
// import Navbar from '@/components/Navbar';
import ProfileListMenuBar from '@/components/ProfileListMenuBar';
import SearchBar from '@/components/SearchBar';
import Wrapper from '@/components/Wrapper';
import { fetchProducts } from '@/utils/api';
import { Product } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import WhishlistIcon from '@/components/IconComponents/whishlist-icon-black.svg';
import ArrangeIcon from '@/components/IconComponents/arrange-icon.svg';
import FilterIcon from '@/components/IconComponents/filter-icon.svg';
import { BsCurrencyDollar } from 'react-icons/bs';

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

  // const handleSearch = (searchTerm: string) => {
  //   console.log(searchTerm);
  //   const filtered = products.filter(
  //     (product) =>
  //       product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       product.description.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredProducts(filtered);
  // };

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='min-h-screen bg-[#F4F4F4] font-montserrat'>
      {/* <Navbar /> */}
      <Wrapper>
        <div className='flex items-center w-full justify-start my-4 gap-2.5'>
          <RiMenuLine size={28} />
          <SearchBar className='flex-1' search={search} onSearch={setSearch} />
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
              <div className='w-full flex justify-center h-auto'>
                <Image
                  width={22}
                  height={22}
                  src={ArrangeIcon}
                  alt='menu_icon'
                  className='w-[22px] h-[22px]'
                />
              </div>
              <div className='w-full flex justify-center h-auto'>
                <Image
                  width={22}
                  height={22}
                  src={FilterIcon}
                  alt='menu_icon'
                  className='w-[22px] h-[22px]'
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center justify-between md:my-10 md:gap-10 gap-4 mx-20'>
            <SearchBar
              search={search}
              onSearch={setSearch}
              className='hidden md:block'
            />
            <div className='flex flex-col md:flex-row md:gap-8 gap-4 hidden md:block'>
              <select
                className='px-3 py-1.5 w-[175px] text-[16px] rounded-[8px] border border-black/10 outline-none bg-white pb-2'
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value=''>Sort by</option>
                <option value='price-asc'>Price: Low to High</option>
                <option value='price-desc'>Price: High to Low</option>
                <option value='name'>Name</option>
              </select>
              <select
                className='px-3 py-1.5 w-[200px] text-[16px] rounded-[8px] border border-black/10 outline-none bg-white'
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value='all'>All Categories</option>
                <option value='electronics'>Electronics</option>
                <option value='jewelry'>Jewelry</option>
                <option value="men's clothing">Men&apos;s Clothing</option>
                <option value="women's clothing">Women&apos;s Clothing</option>
              </select>
            </div>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-3 lg:gap-10 gap-4 lg:px-28 mt-5'>
            {filteredProducts.map((product) => (
              <Link
                href={`/products/${product.id}`}
                className='flex flex-col bg-white px-4 py-4 rounded-[15px] shadow-sm min-w-[160px] h-[215px]'
                key={product.id}
              >
                <div className='w-full flex justify-end'>
                  <Image
                    width={18}
                    height={18}
                    src={WhishlistIcon}
                    alt='whishlist_icon'
                    className='md:hidden block'
                  />
                  {/* <FaRegHeart size={16} className='md:hidden block' /> */}
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
        </Wrapper>
      </div>

      <ProfileListMenuBar />
    </div>
  );
}
