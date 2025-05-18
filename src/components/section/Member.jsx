'use client';
import React from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Mark Henry',
    role: 'Owner',
    image: '/member.png',
  },
  {
    name: 'Lucky Helen',
    role: 'Chef',
    image: '/member.png',
  },
  {
    name: 'Moon Henry',
    role: 'Founder',
    image: '/member.png',
  },
  {
    name: 'Tom Morrow',
    role: 'Specialist',
    image: '/member.png',
  },
];

const Member = () => {
  return (
    <div className="relative -mt-1">
      {/* Background Image Section with Overlay */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/Bg.png"
          alt="Team Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0  bg-opacity-10 flex flex-col justify-center items-center text-white text-center px-4">
          <h2 className="text-3xl font-bold mb-2">Team Member</h2>
          <p className="text-sm max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed
            pharetra dictum neque massa congue.
          </p>
        </div>
      </div>

      {/* Team Members */}
      <div className="-mt-24 z-10 relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 pb-12">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-lg  overflow-hidden text-center"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="py-4">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Member;
