import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { HiOutlineShoppingBag } from 'react-icons/hi';

const HeaderMain = () => {
  return (
    <div className="border border-gray-200 py-6">
      <div className="container sm:flex justify-between items-center">
        <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
          Thunder
        </div>

        <div className="w-full sm:w-[300px] md:w-[70%] relative mb-4 sm:mb-0">
          <input
            className="border-gray-200 border p-2 px-4 rounded-lg w-full"
            type="text"
            placeholder="Enter product name..."
          />
          <BsSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <div className="flex gap-4 text-gray-500 text-[30px]">
            
          <div className="relative">
            <FiHeart />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 translate-y-1 cursor-pointer">
              0
            </div>
          </div>
          <div className="relative">
            <HiOutlineShoppingBag />
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 translate-y-1 cursor-pointer">
              0
            </div>
          </div>
          <div className='cursor-pointer'>
                <BiUser />
            </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
