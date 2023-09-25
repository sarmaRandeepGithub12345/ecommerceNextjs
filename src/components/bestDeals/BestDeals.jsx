"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import mens2 from "../../images/mens2.jpg"
import List from '../List/List'
import PaginationComp from '../pagination/PaginationComp'
const BestDeals = ({heading,num}) => {
 
  
  return (
    <div className={ `bg-gradient-to-tl ${num===1?"":"from-[#f5bcbc] via-[#ecd486] to-[#9bcef6]"}  min-w-[99vw]  flex flex-col`} >
        <p className='w-[100%] flex justify-center items-center text-[20px] mt-[10px] md:text-[30px] lg:text-[50px] font-bold text-[rgb(22,22,22)]'>{heading}</p> 
        <PaginationComp num={num} />
    </div>
  )
}

export default BestDeals