import { FormEvent, useState } from 'react';

export default function SearchBar({
  onSearch,
}: {
  onSearch: (search: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className=''>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search products...'
        className=''
      />
      <button type='submit' className=''>
        Search
      </button>
    </form>
  );
}
