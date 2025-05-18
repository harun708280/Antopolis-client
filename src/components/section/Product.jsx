'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button'; // Assuming this path is correct
import Image from 'next/image';
import { AddCategory } from './AddCategory';
import axios from 'axios';

const Product = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  useEffect(() => {
    fetchDishes();
    fetchCategories();
  }, []);

  const fetchDishes = async () => {
    
    try {
      const response = await fetch('/api/dishes');
      if (response.ok) {
        const data = await response.json();
        setDishes(data);
      } else {
        console.error('Failed to fetch dishes');
      }
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/allCategories');
      if (response.data && response.data.categories) {
        setCategories(['All', ...response.data.categories.map(cat => cat.name)]);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // You might want to refetch dishes based on the selected category here
    // or filter the existing dishes array
  };

  const handleAddCategoryOpen = () => {
    setIsAddCategoryOpen(true);
  };

  const handleAddCategoryClose = () => {
    setIsAddCategoryOpen(false);
    fetchCategories(); // Refetch categories after adding a new one
  };

  const filteredDishes = selectedCategory === 'All'
    ? dishes
    : dishes.filter(dish => dish.category === selectedCategory);

  return (
    <div className="max-w-[1299px] mx-auto mt-20 p-4 ">
      <div className="">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-[#1F1F1F]">Our best Seller Dishes</h1>
          <p className="text-[#5C5C5C] mt-4 max-w-xl  mx-auto">
            Our fresh garden salad is a light and refreshing option. It features a mix of crisp lettuce, juicy tomatoe all tossed in your choice of dressing.
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-2 mb-4 mt-12">
          <div className="space-x-5">
            {categories.map((category) => (
              <Button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category ? 'bg-[#2C2C2C] text-white' : 'bg-[#BABABA] text-black'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="space-x-5">
            <Button
              className="px-4 py-2 rounded-full text-sm font-medium bg-[#2C2C2C] text-white "
              onClick={handleAddCategoryOpen}
            >
              Add Food
            </Button>
            <AddCategory onClose={handleAddCategoryClose} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredDishes.map((dish, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-48">
                <Image src={dish?.image} alt={dish.name} layout="fill" objectFit="cover" className="rounded-t-lg" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{dish.name}</h3>
                <div className="mb-2">
                  <span className={`inline-block bg-${dish.category.toLowerCase()}-100 text-${dish.category.toLowerCase()}-800 text-xs font-semibold rounded-full px-2 py-1`}>
                    {dish.category}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: dish.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <div className="text-gray-700 font-bold">${dish.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;