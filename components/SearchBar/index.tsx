import { IoIosSearch } from "react-icons/io";

export default function SearchBar({
  search,
  onSearch,
}: {
  search: string;
  onSearch: (search: string) => void;
}) {
  return (
    <div className='flex items-center justify-between w-[250px] px-3 py-1 text-[16px] rounded-[8px] border border-black/10 outline-none bg-white'>
      <input
        type='text'
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder='Search products...'
        className=' outline-none  text-[16px]'
      />
      <IoIosSearch size={16} />
    </div>
  );
}
