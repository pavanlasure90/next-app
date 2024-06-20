import React from 'react';
import Image from 'next/image';

interface PropsType {
  image: string;
  title: string;
  mainTitle: string;
  price: string;
}

const Slide: React.FC<PropsType> = ({ image, title, mainTitle, price }) => {
  return (
    <div className="outline-none border-none relative">
      <Image 
        src={`/assets/${image}`} 
        alt={title}
        layout="responsive"
        width={2000}
        height={2000}
        className="w-full h-auto rounded-xl object-cover object-right md:object-left-bottom"
      />
      <div className="absolute left-[30px] md:left-[70px] max-w-[250px] sm:max-w-[350px] top-[50%] transform -translate-y-1/2 space-y-2 lg:space-y-4 bg-[#ffffffa2] sm:bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none">
        <h3 className="text-green-500 text-[24px] lg:text-[28px]">{title}</h3>
        <h2 className="text-blackish text-[26px] md:text-[30px] lg:text-[44px] font-bold leading-[1.2]">{mainTitle}</h2>
        <h3 className="text-[24px] text-gray-500">
          starting at <b className="text-[20px] md:text-[24px] lg:text-[30px]">${price}</b>.00
        </h3>
        <div className="bg-blue-500 text-white text-[14px] md:text-[16px] p-2 px-4 rounded-lg inline-block cursor-pointer hover:bg-blackish">
          Shop Now
        </div>
      </div>
    </div>
  );
};

export default Slide;
