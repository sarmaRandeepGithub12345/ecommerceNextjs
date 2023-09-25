import Image from "next/image";
import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import men2 from "../../images/mens2.jpg";
const SingleReview = () => {
  return (
    <div className="FourFT:w-[398px] FourFT:ml-[14px] FourFT:rounded-md  w-[calc(100%)] border-[1px] box-border  border-[#c9c9c9]  p-3  mt-[15px] mb-[15px]">
      <div className="flex flex-row ">
        <Image
        alt="DP"
          src={men2}
          width="auto"
          height="auto"
          className="w-[40px] h-[40px] rounded-full"
        />
        <div className="pl-[15px]">
          <p className="text-[14px]">Randeep Sarma</p>
          <p className="text-[10px]">Guwahati,Assam,India</p>
        </div>
      </div>
      <div className="w-[100%] flex flex-row items-center mt-[15px] mb-[15px]">
      <span className="text-[13px]">Rate:</span>
      <div className="ml-[10px] Reviews text-[#ff7f23] flex flex-row text-[12px]">
        <BsStarFill className={``} />
        <BsStarFill />
        <BsStarHalf />
        <BsStar />
        <BsStar />
      </div>
      </div>
      <div className="text-[12px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti unde ratione tenetur velit iste sed ex ducimus sapiente a officia.
      </div>
     
    </div>
  );
};

export default SingleReview;
