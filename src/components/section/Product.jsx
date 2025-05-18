import React from 'react';
import { Button } from '../ui/button'; // Assuming this path is correct
import Image from 'next/image';



const dishes = [
  {
    name: 'Salad Fry',
    category: 'Breakfast',
    rating: 5,
    price: 230,
   
  },
  {
    name: 'Chicken Breast',
    category: 'Lunch',
    rating: 4,
    price: 230,
   
  },
  {
    name: 'Chicken Legs',
    category: 'Dinner',
    rating: 5,
    price: 230,
  
  },
  {
    name: 'Fruit Basic',
    category: 'Lunch',
    rating: 4,
    price: 230,
    
  },
  {
    name: 'Veggie salad',
    category: 'Dinner',
    rating: 5,
    price: 230,
    
  },
  {
    name: 'Chicken Roll',
    category: 'Breakfast',
    rating: 5,
    price: 230,
   
  },
];

const Product = () => {
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
            <Button className="px-4 py-2 rounded-full text-sm font-medium bg-[#2C2C2C] text-white ">All</Button>
          <Button className="px-4 py-2 rounded-full text-sm font-medium bg-[#BABABA] text-black  ">Breakfast</Button>
          <Button className="px-4 py-2 rounded-full text-sm font-medium bg-[#BABABA] text-black ">Lunch</Button>
          <Button className="px-4 py-2 rounded-full text-sm font-medium bg-[#BABABA] text-black ">Dinner</Button>
          </div>
          <div className="space-x-5">
            <Button className="px-4 py-2 rounded-full text-sm font-medium bg-[#2C2C2C] text-white ">Add Food</Button>
          <Button className="px-4 py-2 rounded-full text-sm font-medium bg-[#2C2C2C] text-white ">Add Category</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dishes.map((dish, index) => (
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