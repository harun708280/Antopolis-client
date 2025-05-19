"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { AddCategory } from "./AddCategory";
import axios from "axios";
import { AddFood } from "./AddFood";
import Rating from "react-rating";
import { Star, StarHalf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Product = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchDishes();
    fetchCategories();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/allFoods");
      if (response.data && response.data.foods) {
        setDishes(response.data.foods);
      } else {
        console.error("Failed to fetch dishes");
      }
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/allCategories"
      );
      if (response.data && response.data.categories) {
        setCategories(["All", ...response.data.categories.map((cat) => cat.name)]);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setVisibleCount(6);
    setShowAll(false); // reset showAll when changing category
  };

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  const displayedDishes = showAll
    ? filteredDishes
    : filteredDishes.slice(0, visibleCount);

  return (
    <div className="max-w-[1299px] mx-auto mt-8 md:mt-14 lg:mt-20 p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1F1F1F]">
          Our best Seller Dishes
        </h1>
        <p className="text-[#5C5C5C] mt-4 text-md md:max-w-xl mx-auto">
          Our fresh garden salad is a light and refreshing option. It features
          a mix of crisp lettuce, juicy tomatoe all tossed in your choice of
          dressing.
        </p>
      </div>

      <div className="flex flex-wrap justify-between gap-2 mb-4 md:mt-12">
        <div className="space-x-5">
          {categories.map((category) => (
            <Button
              key={category}
              className={`px-4 py-2 rounded-full border text-sm font-medium hover:text-white ${
                selectedCategory === category
                  ? "bg-[#2C2C2C] text-white"
                  : "bg-white border-[#BABABA] text-black"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="space-x-5">
          <AddFood onFoodAdded={fetchDishes} onCategoryAdded={fetchCategories} />
          <AddCategory onCategoryAdded={fetchCategories}  />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {displayedDishes.length > 0 ? (
          <AnimatePresence>
            {displayedDishes.map((dish, index) => (
              <motion.div
                key={dish._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={dish?.image}
                    alt={dish.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {dish.name}
                    </h3>
                    <span className="inline-block bg-[#F03328] text-white text-lg font-semibold rounded-full px-2 py-1">
                      {dish.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <Rating
                      initialRating={dish.rating || 4}
                      readonly
                      emptySymbol={
                        <Star className="w-5 h-5 text-gray-400 fill-transparent" />
                      }
                      fullSymbol={
                        <Star className="w-5 h-5 text-[#FF9E0C] fill-[#FF9E0C]" />
                      }
                      halfSymbol={
                        <StarHalf className="w-5 h-5 text-[#FF9E0C] fill-[#FF9E0C]" />
                      }
                      fractions={2}
                    />
                    <div className="text-black text-[32px] font-bold">
                      ${dish.price}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg py-8">
            No Food available in this category.
          </div>
        )}
      </div>

      {filteredDishes.length > 6 && (
        <div className="text-center mt-8">
          <Button
            className="bg-[#F03328] text-white hover:bg-[#F03328]transition-all"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Product;
