import React, { useState } from 'react';

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
    };

    return (
        <form className="flex justify-center items-center">
            <input
                type="text"
                placeholder="Search..."
                onChange={handleInputChange}
                className="border border-gray-300 rounded-l px-4 py-2 w-64 sm:w-80 md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-700 rounded-r text-white font-semibold px-4 py-2"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;
