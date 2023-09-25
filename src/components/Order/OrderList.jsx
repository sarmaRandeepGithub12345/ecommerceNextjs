import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import men2 from "../../images/mens2.jpg";
const OrderList = () => {
  return (
    <div className="rounded-[10px] w-[100%] h-[100%] bg-[white] flex flex-col items-center ">
      <div className="text-[30px] font-semi mt-[10px]">Your Orders</div>
      
      <div className="Per_Order flex flex-col justify-center FourHun:w-[400px] w-[100%] sixH:w-[600px] box-border border-[1px] FourHun:shadow-md FourHun:rounded-[10px] shadow-indigo-950  p-4 mt-[20px]">
        <div className="bg-[#5593ff] flex items-center text-[14px] p-4 text-[white]">
          <span>OrderID:</span>
          <span className="ml-[15px]">us1234nesn</span>
        </div>
        <div className="w-[100%]">
          <div className="flex flex-row justify-around mt-[10px] items-center">
            <Image
              src={men2}
              width="auto"
              height="auto"
              className="rounded-[10px] w-[90px] h-[100px]"
              alt="Product DP"
            />
            <div className="flex flex-col justify-around  ">
              <p className="text-[15px]">Jeans and Pant shirt</p>

              <div className="bg-[#5593ff] text-[white] w-[100px] text-[12px] flex justify-center box-border border-[2px] border-[white] hover:bg-[#222288] cursor-pointer hover:scale:[120%] hover:transition:1000 hover:transition-all hover:ease-in  hover:border-[#5a5a91] rounded-[6px] p-2">
                Write Review
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#f4f4f4] mt-[10px] p-4">
        <p className="text-[13px] flex justify-between ">
            <span>Order On:</span>
            <span className="text-[13px] ml-[3px]">24/6/2023</span>
          </p>
          <p className="text-[13px] flex justify-between ">
            <span>Qty:</span>
            <span className="text-[13px] ml-[3px]">2</span>
          </p>
          
          <p className="text-[13px] flex justify-between ">
            <span>Status:</span>
            <span className="text-[13px] ml-[3px]">Shipped</span>
          </p>
          <p className="text-[13px] flex justify-between ">
            <span>Delivered on:</span>
            <span className="text-[13px] ml-[3px]">28/6/2023</span>
          </p>
          <div className="flex justify-between mt-[14px]">
          <span className="text-[14px]">Total Price:</span>
          <span className="text-[16px]">Rs 1299</span>
        </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default OrderList;
