"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false); // focus state

  
  useEffect(() => {
    const fetchAllFoods = async () => {
      try {
        const res = await axios.get("https://antopolis-server-two.vercel.app/api/allFoods");
        setAllFoods(res.data.foods);
        setResults(res.data.foods);
      } catch (error) {
        console.error("Error fetching all foods:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllFoods();
  }, []);

  
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        if (!query.trim()) {
          setResults(allFoods);
          return;
        }

        const res = await axios.get(`https://antopolis-server-two.vercel.app/api/search?name=${query}`);
        setResults(res.data.foods);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchFoods();
    }, 150);

    return () => clearTimeout(delayDebounce);
  }, [query, allFoods]);

  const handleSelect = (value) => {
    setQuery(value);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-[330px] md:w-md lg:w-xl md:max-w-xl mx-auto  z-50">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setShowSuggestions(true);
            setIsFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
            setIsFocused(false);
          }}
          placeholder="Search..."
          className={`
            w-full placeholder:text-[#2D2D2D] placeholder:font-bold placeholder:text-xl pl-10 pr-4 py-3 bg-white border border-gray-300 focus:outline-none 
            ${isFocused ? "rounded-t-lg" : "rounded-lg"}
          `}
        />
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full bg-white border border-gray-300 rounded-b-lg max-h-60 overflow-y-auto z-40 shadow-lg"
          >
            {loading ? (
              <li className="px-4 py-2 text-gray-500">Loading...</li>
            ) : results.length > 0 ? (
              results.map((item) => (
                <li
                  key={item._id}
                  onClick={() => handleSelect(item.name)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>{item.name}</span>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
