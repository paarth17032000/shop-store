import { IoIosSearch } from 'react-icons/io';

export default function SearchBar({
  search,
  onSearch,
  className,
}: {
  search: string;
  onSearch: (search: string) => void;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center w-[250px] px-5 py-2.5 text-[16px] text-[#8B8B8B] rounded-[10px] border border-black/10 outline-none bg-white ${className}`}
    >
      <div>
        <IoIosSearch size={16} className='mr-2' color='#8B8B8B' />
      </div>
      <input
        type='text'
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder='Search products...'
        className=' outline-none  text-[16px]'
      />
    </div>
  );
}
