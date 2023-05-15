import React, { useState } from 'react';
import '../assets/style.css'

function SearchBar() {

    return (
        <form className="flex justify-center items-center">
            <input
                type="text"
                placeholder="Enter a city"
                onChange=""
                className=" border-gray-300 rounded-l px-4 py-2 w-64 sm:w-80 md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 input-box"
            />

            <button
                type="submit"
                onClick=""
                className="hover:bg-purple-800 rounded-r text-white font-semibold px-4 py-2 search-bg"
            >
                Add City
            </button>

        </form>
    );
}

export default SearchBar;
