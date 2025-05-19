"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Search from "./search";
import { ChevronLeft, ChevronRight } from "lucide-react";

const imageData = [
  {
    id: 1,
    thumb: "/hero13.png",
    main: "/hero13.png",
    bgColor: "#8B0000",
  },
  {
    id: 2,
    thumb: "/hero12.png",
    main: "/hero12.png",
    bgColor: "#0a4669",
  },
  {
    id: 3,
    thumb: "/hero14.png",
    main: "/hero14.png",
    bgColor: "#953553",
  },
  {
    id: 4,
    thumb: "/hero15.png",
    main: "/hero15.png",
    bgColor: "#006666",
  },
];

const Hero = () => {
  const [selected, setSelected] = useState(0);
  const [prevSelected, setPrevSelected] = useState(null);

  const handleSelect = (index) => {
    if (Math.abs(index - selected) === 1) {
      setPrevSelected(selected);
      setSelected(index);
    }
  };

  const getDirection = () => {
    if (prevSelected === null) return 0;
    return selected > prevSelected ? 1 : -1;
  };

  const imageVariants = {
  enter: (direction) => ({
    x: direction === 1 ? 300 : -150,
    y: direction === 1 ? -180 : 180,
    opacity: 0,
    rotate: direction === 1 ? 30 : -30,
    scale: 0.9,
  }),
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
      mass: 0.8,
      duration: 0.4,
    },
  },
  exit: (direction) => ({
    x: direction === 1 ? -200 : 200,
    y: direction === 1 ? 100 : -100,
    opacity: 0,
    rotate: direction === 1 ? -15 : 15,
    scale: 0.95,
    transition: { duration: 0.3 },
  }),
};


  return (
    <motion.div
      className="relative px-4 md:px-12  overflow-hidden z-10 min-h-screen flex flex-col"
      animate={{ backgroundColor: imageData[selected].bgColor }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 w-[300px] md:w-[550px] h-[400px] md:h-[600px] bg-white/10 rounded-br-[90%] z-0"></div>

      <header className="flex justify-between mt-6 md:mt-9 items-center px-4 md:px-6 py-3">
        <h1 className="relative hidden md:block z-50 font-bold text-xl md:text-2xl text-white">
          RESTAURANT
        </h1>
        <div className="relative">
          <Search />
        </div>
      </header>

      <main className="flex flex-col md:flex-row flex-1 px-4 md:px-6 pb-12 gap-10 relative overflow-visible">
        <section className="relative z-40 flex-1 w-full lg:w-1/2 mt-3 md:mt-20 space-y-5">
          <h2 className="text-5xl md:text-[96px] font-[400px] text-white leading-tight">
            BREAKFAST
          </h2>
          <p className="relative z-10 font-medium text-base md:text-lg max-w-[720px] leading-tight text-white">
            Breakfast, often referred to as the ‘most important meal of the
            day’, provides essential nutrients to kick start our day. It
            includes a variety of foods, like fruits, cereals, dairy products,
            and proteins, that contribute to a balanced diet.
          </p>

          <div className="hidden relative z-10 md:flex gap-4 mt-3">
            {imageData.map((item, index) => {
              const isSelectable = Math.abs(index - selected) === 1;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col items-center ${
                    isSelectable ? "cursor-pointer opacity-100" : "opacity-100"
                  }`}
                  onClick={() => handleSelect(index)}
                >
                  <div className="relative w-20 h-20 md:w-40 md:h-40 overflow-hidden rounded-full">
                    <img
                      src={item.thumb}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selected === index && (
                    <motion.div
                      layoutId="underline"
                      className="mt-1 w-6 md:w-10 h-[2px] bg-white rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="absolute -translate-y-1/2 md:-translate-y-1/5 lg:translate-y-0  w-full bottom-[20%] right-[4px] md:bottom-[5%] md:right-[20%] lg:bottom-[2%] lg:right-0 z-40  h-[235px] md:w-[400px] md:h-[400px] lg:w-[650px] lg:h-[650px] ">
          <div className="w-full h-full relative flex gap-4 items-center">
            <button
              onClick={() => {
                const newIndex = selected > 0 ? selected - 1 : 0;
                if (newIndex !== selected) {
                  setPrevSelected(selected);
                  setSelected(newIndex);
                }
              }}
              className="bg-white/20 w-10 h-10 md:hidden hover:bg-white/30 p-2 rounded-full text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <AnimatePresence custom={getDirection()} mode="wait">
              <motion.div
                key={selected}
                custom={getDirection()}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full relative"
              >
                <Image
                  src={imageData[selected].main}
                  alt={`Main image ${selected}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => {
                const newIndex =
                  selected < imageData.length - 1 ? selected + 1 : selected;
                if (newIndex !== selected) {
                  setPrevSelected(selected);
                  setSelected(newIndex);
                }
              }}
              className="bg-white/20 md:hidden w-10 h-10 hover:bg-white/30 p-2 rounded-full text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        <div className="absolute bottom-[15%] z-10 flex md:hidden gap-1">
          {imageData.map((item, index) => {
            const isSelectable = Math.abs(index - selected) === 1;
            return (
              <div
                key={item.id}
                className={`flex flex-col items-center ${
                  isSelectable ? "cursor-pointer opacity-100" : "opacity-60"
                }`}
                onClick={() => handleSelect(index)}
              >
                <div className="relative w-20 h-20 md:w-40 md:h-40 overflow-hidden rounded-full">
                  <img
                    src={item.thumb}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selected === index && (
                  <motion.div
                    layoutId="underline"
                    className="mt-1 w-6 md:w-10 h-[2px] bg-white rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </main>

      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/10 rounded-tl-[90%] z-0"></div>
    </motion.div>
  );
};

export default Hero;
