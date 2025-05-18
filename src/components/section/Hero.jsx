"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const imageData = [
  {
    id: 1,
    thumb: "/hero1.png",
    main: "/hero1.png",
    bgColor: "#a52b2a",
  },
  {
    id: 2,
    thumb: "/hero4..png",
    main: "/hero4..png",
    bgColor: "#8B0000",
  },
  {
    id: 3,
    thumb: "/hero3.png",
    main: "/hero3.png",
    bgColor: "#6A0DAD",
  },
  {
    id: 4,
    thumb: "/hero4..png", // Note the double dot here, ensure it's intentional
    main: "/hero4..png", // Note the double dot here, ensure it's intentional
    bgColor: "#2E8B57",
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
      x: direction === 1 ? 250 : -250,
      y: direction === 1 ? -150 : 150,
      opacity: 0,
      rotate: direction === 1 ? 20 : -20,
      scale: 0.92,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 18,
        duration: 0.9,
      },
    },
  };

  return (
    <div
      className="relative overflow-hidden z-10 min-h-screen flex flex-col transition-colors duration-500"
      style={{ backgroundColor: imageData[selected].bgColor }}
    >
      <div className="absolute top-0 left-0 w-[550px] h-[600px] bg-white/10 rounded-br-[90%] z-0"></div>

      <header className="flex justify-between items-center px-6 py-3">
        <h1 className="relative z-50 font-montserrat font-bold text-lg text-white">
          RESTAURANT
        </h1>
        <div className="relative w-72 max-w-full">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg"></i>
          <input
            type="text"
            placeholder="Search...."
            aria-label="Search"
            className="w-full rounded-xl py-2 pl-9 pr-4 font-bold text-sm font-openSans"
          />
        </div>
      </header>

      <main className="flex  flex-1 flex-col lg:flex-row  px-6 pb-12 gap-10 relative overflow-visible">
        <section className=" absolute top-[10%]  z-40 flex-1 w-1/2 mt-12">
          <h2 className="text-[96px] font-montserrat font-normal mb-3 text-white">
            BREAKFAST
          </h2>
          <p className="relative z-10 font-bold text-xs leading-tight mb-6 text-white">
            <strong>
              Breakfast, often referred to as the ‘most important meal of the
              day’,
            </strong>{" "}
            provides essential nutrients to kick start our day. It includes a
            variety of foods, like fruits, cereals, dairy products, and proteins,
            that contribute to a balanced diet.
          </p>

          <div className="relative z-10 flex gap-4">
            {imageData.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleSelect(index)}
              >
                <div className="relative  overflow-hidden">
                  <img
                    src={item.thumb}
                    alt={`Thumbnail ${index}`}
                    
                    className="object-cover w-40 h-40 rounded-full border"
                  />
                </div>
                {selected === index && (
                  <div className="mt-1 w-10 h-[2px] bg-white rounded-full transition-all duration-300" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="-right-[0%]   absolute  z-40 flex-1 max-w-[1/2] ">
          <div className="  flex justify-end w-[624px] h-[624px] ">
            <AnimatePresence custom={getDirection()} mode="wait">
              <motion.div
                key={selected}
                custom={getDirection()}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full"
              >
                <Image
                  src={imageData[selected].main}
                  alt={`Main image ${selected}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-tl-[90%] z-0"></div>
    </div>
  );
};

export default Hero;