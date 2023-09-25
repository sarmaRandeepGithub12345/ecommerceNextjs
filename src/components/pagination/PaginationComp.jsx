"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import mens2 from "../../images/mens2.jpg";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import styles from "./pagination.module.css";
import { dataSample } from "@/utils/dataSample";
import { Avatar, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
const PaginationComp = ({num}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const twelveHundred = useMediaQuery("(min-width:1200px)")
  const NineHundred = useMediaQuery("(min-width:900px)")
  const sixHundred = useMediaQuery("(min-width:600px)")
  const recordsPerPage = 
  twelveHundred?8:
  (NineHundred)?6:
  (sixHundred)?4:
  2
  ;
  //1*6
  const lastIndex = currentPage * recordsPerPage;
  //6-6
  const firstIndex = lastIndex - recordsPerPage;
  //slice from 0 to (6-1)
  const records = dataSample.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataSample.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const changeCPage = (id) => {
    setCurrentPage(id);
  };
  const [active, setActive] = useState(false)

 
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false)
}
useEffect(() => {
    window?.addEventListener("scroll", isActive)

    return () => {
        window?.removeEventListener("scroll", isActive)
    }
}, [])
const isNonMobileScreens = useMediaQuery("(min-width:800px)");
const router = useRouter()
const handleClickWidget = (e,id,item)=>{
  e.preventDefault()
  router?.push(`/product/${id}`)
}
  return (
    <div className="flex flex-col w-[100%]">
      {num===1?
      <div className={`sticky ${active?"":""} bg-[white] ${isNonMobileScreens?"top-[52px]":"top-[90px]"} z-[1] flex flex-row justify-around items-center w-[100%] my-[20px] h-[fit] p-4`}>
        <div onClick={prePage} className="bg-[#0caaff] text-[25px] w-[40px] flex justify-center text-[white] cursor-pointer items-center  rounded-[5px]">{'<'}</div>
        {numbers.map((n, i) => (
          <div key={i} className={` border-[2px]  text-[18px] h-[30px]  w-[30px]   flex justify-center cursor-pointer  items-center  rounded-[5px] ${currentPage===n?"text-[white] bg-[#0caaff] scale-[150%] lg:scale-[150%] transition duration-500 ease-in-out":"border-[#0caaff] text-[rgb(12,170,255)] bg-[white] "}`} onClick={()=>changeCPage(n)}>{n}</div>
        ))}
        <div onClick={nextPage} className="bg-[#0caaff] text-[25px] w-[40px] flex justify-center cursor-pointer  items-center rounded-[5px] text-[white] ">{'>'}</div>
      </div>:
      <></>}
      <div
        className="grid grid-cols-1 sm:grid-cols-2
    twelveK:grid-cols-4 nine:grid-cols-3 sixHun:grid-cols-2 grid-flow-row w-[100%] justify-items-center"
      >
        {records.map((item, id) => {
          
       return   <div
            key={item.itemId}
            
            className={`Card bg-[white] w-[68%] six:w-[85%] lg:w-[80%] lg:   m-4  bg-opacity-50 shadow-lg shadow-[purple]  cursor-pointer hover:scale-[104%] transition duration-500 ease-in-out  h-fit rounded-[20px]`}
            onClick={e=>handleClickWidget(e,item.itemId,item)}
          >
            <Image
              className="m-auto w-[100%] h-[330px] lg:h-[350px] box-border hover:opacity-8 hover:bg-opacity-50 rounded-t-[10px]" width="auto"height="auto"
              priority={true}
              src={mens2}
              alt={`Slide`}
            />

            <div className=" box-border w-[100%] rounded-b-[10px] ">
              <p className="text-[20px] font-semibold ml-[8px] mt-[10px]">
                Rs {item.price}
              </p>
              <div className="Rating flex flex-row items-center pl-[8px]">
                <p>{item.rating}</p>
                <div className="flex flex-row ml-[5px] text-[#ff7f23]">
                  <BsStarFill className={``} />
                  <BsStarFill />
                  <BsStarHalf />
                  <BsStar />
                  <BsStar />
                </div>
              </div>
              <div className="pl-[8px]">
                <span>Reviews</span>
                <span>({item.ratingsCount})</span>
              </div>
              <p className="text-[25px] mb-[15px] ml-[8px]">
                {item.clothesName}
              </p>
            </div>
          </div>
})}
      </div>
      
    </div>
  );
};

export default PaginationComp;
