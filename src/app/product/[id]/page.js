
import MobileSearchBox from "@/components/MobileSearchBar/MobileSearchBox";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import React from "react";
import men2 from "../../../images/mens2.jpg";
import Image from "next/image";
import { dataSample } from "@/utils/dataSample";
import Reviews from "@/components/reviews/Reviews";
import ProductImage from "@/components/productImage/ProductImage";
import ParentReview from "@/components/parentReview/ParentReview";
const page = ({ params }) => {
  let filteredItem = dataSample.filter(
    (item) => item.itemId === Number(params.id)
  );
  //console.log(typeof params.id)
  //console.log(filteredItem[0])
  //id,productName,price,description,img
  return (
    <>
      <div
        className="Product flex flex-col sevenHun:flex-row mt-[10px]
      "
      > 
      <div className="sevenHun:w-[40%] Thou:w-[100%]">
        <ProductImage/>
        <ParentReview/>
      </div>  
        <div className=" ProductInfo sevenHun:w-[58%] w-[100%] p-[15px] Thou:fixed Thou:right-[0]">
          <div className="text-[25px]">{filteredItem[0].clothesName}</div>
          <div className="Ratings flex flex-row ml-[5px]   items-center justify-between">
            <div>
              <span>4.3</span>
              <div className="mt-[10px] flex text-[15px] flex-row text-[#ff7f23]">
                <BsStarFill className={``} />
                <BsStarFill />
                <BsStarHalf />
                <BsStar />
                <BsStar />
              </div>
              <div className="RatingsCount w-[100%] mt-[10px] text-[12px]">3254 ratings</div>
            </div>
            <div className="text-[10px]">
              Sold By <span className="ml-[3px] text-[15px]">Randeep</span>
            </div>
          </div>

          <div className=" flex justify-center items mt-[10px] mb-[10px]">
            <div className="bg-[grey] h-[1px] w-[90%]"></div>
          </div>
          <div className="text-[20px] font-semibold">Rs. 12599</div>
          <div className="text-[12px]">Inclusive of all taxes</div>
          <div className="text-[13px] mt-[25px] mb-[15px]">
            have made over 1,100 professional career appearances, and has scored
            over 800 official senior career goals for club and country, making
            him the highest goalscorer of all time. Ronaldo began his senior
            career with Sporting CP, before signing with Manchester United in
            2003, winning the FA Cup in his first season. He would also go on to
            win three consecutive Premier League titles, the Champions League
            and the FIFA Club World Cup; at age 23, he won his first Ballon
            d'Or.
          </div>
          
          <div className="flex flex-col r">
          <div className=" flex justify-center mb-[10px] sevenHun:w-[100%] EightFif:w-[60%] ">Tags</div>
          <div className="grid sevenHun:grid-cols-4 EightFif:grid-cols-5 grid-cols-4  FourHun:grid-cols-5 grid-flow-row mb-[15px] sevenHun:w-[100%] EightFif:w-[70%] ">
            <div className="bg-[#8888be] p-2  rounded-t-[5px] rounded-bl-[5px] text-[#ededed] mt-[5px] w-fit text-[10px]">Jeans</div>
            <div className="bg-[#8888be] p-2  rounded-t-[5px] rounded-bl-[5px] text-[#ededed] mt-[5px] w-fit text-[10px]">Pant</div>
            <div className="bg-[#8888be] p-2  rounded-t-[5px] rounded-bl-[5px] text-[#ededed] mt-[5px] w-fit text-[10px]">Western</div>
            <div className="bg-[#8888be] p-2  rounded-t-[5px] rounded-bl-[5px] text-[#ededed] mt-[5px] w-fit text-[10px]">Swag</div>
            <div className="bg-[#8888be] p-2  rounded-t-[5px] rounded-bl-[5px] text-[#ededed] mt-[5px] w-fit text-[10px]">Men</div>
            <div className="bg-[#8888be] p-2  rounded-t-[5px] rounded-bl-[5px] text-[#ededed] mt-[5px] w-fit text-[10px]">Cate</div>
            <div className="bg-[#8888be] p-2  rounded-t-[5px] rounded-bl-[5px] text-[#ededed] mt-[5px] w-fit text-[10px]">Catego</div>
            <div className="bg-[#8888be] p-2  rounded-t-[5px] rounded-bl-[5px] text-[#ededed] mt-[5px] w-fit text-[10px]">Cat</div>
            <div className="bg-[#8888be] p-2  rounded-t-[5px] rounded-bl-[5px] text-[#ededed] mt-[5px] w-fit text-[10px]">gory </div>
          </div>
          </div>
          
          <div className="flex flex-row justify-between w-[80%] sevenHun:w-[70%] NineFif:w-[50%]">
            <div className="flex justify-center flex-row items-center">
              <input type="number" className="border-[1px] h-[30px]  w-[80px] border-[black]"></input>
              <button className="border-[3px] rounded-md border-[white]  bg-[#52ff52] hover:border-[3px] hover:border-[#0a900a] hover:bg-[#8fff8f] text-[12px] p-3 ml-2">
                Buy this
              </button>
            </div>     
              <button className="border-[3px] rounded-md bg-[#ffce0b] border-[white] hover:border-[3px] hover:border-[#ff9808] hover:bg-[#fee583] text-[12px] p-3">
                Add to Cart
              </button>
            
          </div>
        </div>
        
      </div>
      <div className="Thou:hidden">
          <Reviews/>
        </div>
    </>
  );
};

export default page;
