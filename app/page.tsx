'use client';
import SearchBar from '@/components/SearchBar';
import Wrapper from '@/components/Wrapper';
import { fetchProducts } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiShoppingCart } from 'react-icons/ci';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleSearch = (searchTerm: string) => {
    console.log(searchTerm)
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (sortType: string) => {
    let sorted = [...filteredProducts];
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
    <div className='min-h-screen bg-[#F4F4F4]'>
      <Wrapper className='h-[80px] flex items-center justify-center'>
        <div className='bg-white flex items-center justify-between w-full px-6 py-2 rounded-[15px] w-3/4'>
          <div className='font-bold text-[24px]'>SS</div>
          <div className='relative'>
            <CiShoppingCart size={28} />
            <span className='absolute right-[-5px] top-[-5px] bg-red-700 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-sm'>
              10
            </span>
          </div>
        </div>
      </Wrapper>
      <div className='min-h-[calc(100vh-80px)]'>
        <Wrapper>
          <h1>Product Listing</h1>
          <SearchBar onSearch={handleSearch} />
          <select onChange={(e) => handleSort(e.target.value)}>
            <option value=''>Sort by</option>
            <option value='price-asc'>Price: Low to High</option>
            <option value='price-desc'>Price: High to Low</option>
            <option value='name'>Name</option>
          </select>
          <select onChange={(e) => handleFilter(e.target.value)}>
            <option value='all'>All Categories</option>
            <option value='electronics'>Electronics</option>
            <option value='jewelry'>Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          <div className='grid grid-cols-3 gap-10'>
            {products.map((product) => (
              <div className='flex flex-col '>
                <div className='w-[150px] h-[150px]'>
                  <Image
                    width={150}
                    height={150}
                    src={product.image}
                    alt={product.title}
                    className='w-[150px] h-[150px]'
                  />
                </div>
                <h3 className=''>{product.title}</h3>
                <p className=''>{product.price}</p>
                <p className=''>{product.description.slice(0, 100)}...</p>
                <Link href={`/products/${product.id}`}>View Details</Link>
              </div>
            ))}
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
