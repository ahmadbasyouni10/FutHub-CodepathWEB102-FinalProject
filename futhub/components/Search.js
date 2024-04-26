// Search.js
import { useState } from 'react';

const Search = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    }

    return (
        <div className="flex gap-2 p-6 items-center">
            <input type="text" className="px-5 dark:bg-dark py-1 w-1/3 sm:px-5 sm:py-3 flex-1 bg-gray-200 rounded-full focus:outline-none placeholder:text-zinc-400" placeholder="What are you looking for?"
            value={searchTerm} onChange={handleInputChange} />
        </div>
    )
}

export default Search;