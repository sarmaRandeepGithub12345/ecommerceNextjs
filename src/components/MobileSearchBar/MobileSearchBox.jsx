"use client";
import { useMediaQuery } from "@mui/material";
import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import Navbar from "../Navbar/Navbar";
import { AiOutlineShoppingCart } from "react-icons/ai";
import MobileDrawer from "../clippedDrawer/MobileDrawer";
import { GoDotFill } from "react-icons/go";
import { BiLogoShopify } from "react-icons/bi";
const MobileSearchBox = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");

  return (
    <>
      {isNonMobileScreens ? (
        <Navbar />
      ) : (
        <div className="w-[100%]  bg-[white] sticky top-[0] z-[20] flex flex-row items-center justify-between ">
          <MobileDrawer />
          <div className="flex flex-row items-center">
            <div className="h-[70%] box-border font-semibold flex justify-center items-center">
              <BiLogoShopify className="text-[43px]" />
            </div>
            <div className=" text-[10px] h-[30%] box-border  flex flex-col items-center">
              <p className="text-[15px] font-semibold">Shop Y</p>
              <p>Online Store</p>
            </div>
          </div>
          <div className="mr-[20px] ">
            <AiOutlineShoppingCart className="text-[45px] relative" />
            <GoDotFill className="absolute text-[22px] text-[red] top-[10px] right-[27px]" />
          </div>
        </div>
      )}
      {isNonMobileScreens ? (
        <></>
      ) : (
      <div className=" sticky top-[52px] z-20 w-[100%] bg-[white] pb-1"> 
        <div className="  h-[40px]  mx-2 rounded-l-[20px] rounded-r-[20px] border-2 border-black rounded-[5px] flex flex-row mb-[5px]  mt-[5px] ">
          <input
            type="text"
            className="rounded-l-[20px] h-[100%] w-[calc(100%-70px)] pl-4 outline-none"
            placeholder="Search..."
          />

          <div className="w-[70px] flex justify-center items-center cursor-pointer bg-[#585869] rounded-r-[20px] ">
            <BiSearchAlt className="hover:text-[25px] text-[23px] text-[white]" />
          </div>
        </div>
      </div> 
      )}
    </>
  );
};

export default MobileSearchBox;
