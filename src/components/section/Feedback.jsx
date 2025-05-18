"use client";

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const feedbacks = [
  {
    name: "Tayyab Sohail",
    role: "UX/UI Designer",
    feedback: `Fresh, flavorful, and just the right amount of heat. The tuna was buttery, the rice well-seasoned, and the chili mayo added a great kick. A must-try for sushi lovers.`,
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Ayesha Khan",
    role: "Frontend Developer",
    feedback: `Absolutely loved it! The presentation was stunning and the flavors were even better. Will definitely order again.`,
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "John Doe",
    role: "Product Manager",
    feedback: `A delightful experience overall. The freshness of the ingredients really stood out.`,
    image: "https://i.pravatar.cc/100?img=3",
  },
];

const Feedback = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % feedbacks.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-[1299px] flex gap-12 justify-between items-center mx-auto px-4 mt-20">
      <div className="max-w-2xl   relative ">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8">
          Customer <span className="text-red-600">Feedback</span>
        </h2>

        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 sm:hidden z-10">
          <button onClick={handlePrev}>
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 sm:hidden z-10">
          <button onClick={handleNext}>
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="min-h-[120px] relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="absolute w-full"
            >
              <p className="text-gray-600 text-base sm:text-lg">
                {feedbacks[current].feedback}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={feedbacks[current].image}
              alt={feedbacks[current].name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <h4 className="font-bold text-red-600">
                {feedbacks[current].name}
              </h4>
              <p className="text-sm text-gray-700">{feedbacks[current].role}</p>
            </div>
          </div>

          <div className="flex space-x-2 mt-4 sm:mt-0">
            {feedbacks.map((_, index) => (
              <span
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  current === index ? "bg-red-600" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div
        className=""
        style={{
          backgroundImage: `url('/Vector 2.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Image src={"/Chef making .png"} height={600} width={600}></Image>
      </div>
    </div>
  );
};

export default Feedback;
