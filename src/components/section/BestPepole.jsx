"use client";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const BestPeople = () => {
  const logos = [
    { src: "/m1.png", alt: "Logo 1" },
    { src: "/m2.png", alt: "Logo 2" },
    { src: "/m3.png", alt: "Logo 3" },
    { src: "/m4.png", alt: "Logo 4" },
    { src: "/m5.png", alt: "Logo 5" },
    { src: "/m6.png", alt: "Logo 6" },
  ];

  return (
    <div className="max-w-[1299px] mx-auto py-10 text-center">
      <h3 className="text-[#A52A2A] font-bold text-base mb-2">
        Partners & Clients
      </h3>
      <h2 className="text-[#333333] font-bold text-5xl mb-6">
        We work with the best people
      </h2>

      <Marquee speed={100} direction="" >
        {logos.map((logo, index) => (
          <div
            key={index}
            className="mx-4 md:mx-14 mt-10 flex items-center justify-center"
          >
            {" "}
            
            <Image
              width={200}
              height={40}
              src={logo.src} 
              alt={logo.alt}
              className="h-[128px] grayscale opacity-75"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BestPeople;
