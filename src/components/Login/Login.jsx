"use client";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import pic from "../../images/shp.png";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { loginUser } from "@/functions/apiFunction";
import CenterPopUp from "../centerPopUp/CenterPopUp";
import { setLocalItem } from "@/utils/dataSample";
import useCustomHook from "@/hooks/useCustomHook";
const Login = () => {
  
  const router = useRouter();
  //console.log(isLoading)
  const [selectedOption, setSelectedOption] = useState("buyer"); // Default selected option

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/register");
  };
  const {visible ,setvisible, handleClose,isLoading,setisLoading}=useCustomHook()
  
  const [errorP, seterrorP] = useState({
    num: 0, //neutral,
    //num 1 for success
    //num 2 for error
    message: "",
  });
  useEffect(() => {
    setTimeout(() => {
      seterrorP({
        num: 0,
        message: "",
      });
    }, 4000);
  }, [errorP.num !== 0]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(e.target[1].value.length<8){
      seterrorP({
        num: 2,
        message: "Minimum password length is 8",
      });
      return
    }
    setisLoading(true)
    const formData = new FormData();
    formData.set("email", e.target[0].value);
    formData.set("password", e.target[1].value);
    formData.set("status", selectedOption==='seller');
    //console.log(formData)
    try {
      setvisible(true)
      const resp = await loginUser(formData);
      
      const show = await resp.json();
      //console.log(show)
      if (resp.status === 200) {
        seterrorP({
          num: 1,
          message: show.message,
        });
        e.target.reset()
        //storing userData in local Storage
        setLocalItem("user",show.data)
        console.log(show.data)
        if(show.data.isseller===false){
          
          router?.push("/")
        //  console.log(show)
        }else{
          router?.push("/orders")
        }
        setSelectedOption("buyer");
      } else if (resp.status === 400) {
        seterrorP({
          num: 2,
          message: show.message,
        });
      }
      setvisible(false)
    } catch (error) {
      seterrorP({
        num: 2,
        message: error.message,
      });
    }
    setisLoading(false)
  };

  return (
    <div
      className={`min-w-[99vw] min-h-[100vh] py-6 flex flex-col  items-center bg-[#d6d5d5]`}
    >
      <form
        action=""
        className={`${
          isLoading ? "opacity-50" : ""
        } flex justify-evenly  flex-col items-center border-[1px] bg-[white] border-[grey] ${
          styles.temp
        } ${styles.temp2} h-[400px]`}
        onSubmit={handleSubmit}
      >
        <Image
          src={pic}
          alt="Logo"
          className={`${styles.image} bg-[#d6d5d5] w-[100px] h-[100px]`}
        />
        <div className="relative w-[80%] mb-2">
          <input
            type="email"
            className="w-[100%] border-[1px] border-[grey] h-[45px] placeholder:text-[#5c5c5c] pl-2"
            id="email"
            placeholder="Email address*"
            required
            name="email"
          />
        </div>
        <div className="relative w-[80%] mb-2">
          <input
            type="password"
            className="w-[100%] border-[1px] border-[grey] h-[45px] placeholder:text-[#5c5c5c] pl-2"
            id="password"
            placeholder="Password*"
            required
            name="password"
          />
        </div>
        <div className="relative w-[80%] flex flex-col justify-between ">
          <p className=" w-[100%]">Login as:</p>
          <div className="flex flex-row justify-around mt-2">
            <div>
              <label className="">
                <input
                  type="radio"
                  value="buyer"
                  checked={selectedOption === "buyer"}
                  onChange={handleOptionChange}
                />
                Buyer
              </label>
            </div>
            <div>
              <label>
                <input
                  className=""
                  type="radio"
                  value="seller"
                  checked={selectedOption === "seller"}
                  onChange={handleOptionChange}
                />
                Seller
              </label>
            </div>
          </div>
        </div>
        <div
          className={`h-[30px] w-[100%] flex items-center text-[14px] font-semibold FourFifty:text-[15px] justify-center ${
            errorP.num === 1
              ? "text-[green]"
              : errorP.num === 2
              ? "text-[red]"
              : ""
          }`}
        >
          {errorP.message}
        </div>
        <button
          type="submit"
          className={`w-[80%]   bg-[rgb(0,94,255)]  uppercase text-white shadow-[0_4px_9px_-4px_#3b71ca] h-[45px] `}
        >
          Login
        </button>
        <p
          className="   hover:bg-[#c2c2c2] hover:text-[black]  border-dashed p-2 cursor-pointer transition duration-2000 ease-in-out font-semibold"
          onClick={handleClick}
        >
          Sign Up
        </p>
      </form>
      <CenterPopUp
        onClose={handleClose}
        visible={visible}
        
        
        isLoading={isLoading}
      />
    </div>
  );
};

export default Login;
