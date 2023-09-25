"use client";
import Image from "next/image";

import React, { useEffect, useState, useClient } from "react";
import pic from "../../images/shp.png";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import CircularProgress from "@mui/material/CircularProgress";

import CenterPopUp from "../centerPopUp/CenterPopUp";
import { getOTPinEmail, registerNewUser, verifyOTPinEmail } from "@/functions/apiFunction";
import useCustomHook from "@/hooks/useCustomHook";

const Register = () => {
  
  const [finalObj, setfinalObj] = useState({
    name: "",
    email: "",
    password: "",

    description: "",
  });
  const {visible,setvisible,handleClose,isLoading,setisLoading} = useCustomHook()

  //console.log(isLoading)
  const [selectedOption, setSelectedOption] = useState("buyer"); // Default selected option
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/login");
  };
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileChange = (event) => {
    event.preventDefault();

    const files = Array.from(event.target.files);

    if (files.length > 0 && isLoading === false) setSelectedFiles(files);
  };
  const [errorP, seterrorP] = useState({
    num: 0, //neutral,
    //num 1 for success
    //num 2 for error
    message: "",
  });
  const handleOTP = async (e, obj) => {
    e.preventDefault();
    //console.log(obj)
    setisLoading(true);
    //num===1 to receive OTP in via email
    if (obj.num === 1 && finalObj.email !== "") {
      setvisible(true);
      try {
        const resp = await getOTPinEmail(finalObj.email);
        const show = await resp.json();
        if (resp.status === 200) {
          seterrorP({
            num: 1,
            message: show.message,
          });
        } else if (resp.status === 400) {
          seterrorP({
            num: 2,
            message: show.message,
          });
        }
      } catch (error) {
        seterrorP({
          num: 2,
          message: error.message,
        });
      }
      setvisible(false);
    }
    //send check if otp is correct
    else if (finalObj.email !== "" && obj.num === 2 && obj.text.length === 6) {
      setvisible(true);
      try {
        let formData = new FormData();
        formData.set("email", finalObj.email);
        formData.set("otp", obj.text);
        const resp = await verifyOTPinEmail(formData);
        const show = await resp.json();
        if (resp.status === 200) {
          seterrorP({
            num: 1,
            message: show.message,
          });
        } else if (resp.status === 400) {
          seterrorP({
            num: 2,
            message: show.message,
          });
        }
      } catch (error) {
        seterrorP({
          num: 2,
          message: error.message,
        });
      }
      setvisible(false);
    }
    setisLoading(false);
  };
  const handleForm = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setisLoading(true)
    if (
      finalObj.name !== "" &&
      finalObj.email !== "" &&
      finalObj.password !== "" &&
      selectedFiles.length !== 0
    ) {
      const formData = new FormData();
      formData.set("name", finalObj.name);
      formData.set("email", finalObj.email);
      formData.set("password", finalObj.password);
      formData.set("file", selectedFiles[0]);
      formData.set("status", "seller" === selectedOption);
      formData.set("description", finalObj.description);
     
      setvisible(true)
      try {
        const resp = await registerNewUser(formData)
        const show = await resp.json();
        console.log(resp)
        if (resp.status === 200) {
          seterrorP({
            num: 1,
            message: show.message,
          });
          setfinalObj({
            name:"",
            email:"",
            password:"",
            description:""
          })
          setSelectedFiles([])
          setSelectedOption("buyer")
        } else if (resp.status === 400) {
          seterrorP({
            num: 2,
            message: show.message,
          });
        }
      } catch (error) {
        seterrorP({
          num: 2,
          message: error.message,
        });
      }
      setvisible(false)
    }
    setisLoading(false)
  };
  //console.log(errorP)
  useEffect(() => {
    setTimeout(() => {
      seterrorP({
        num: 0,
        message: "",
      });
    }, 4000);
  }, [errorP.num !== 0]);
  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;

    setfinalObj((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <div
      className={` box-border py-6 min-h-[100vh] min-w-[99vw] flex flex-col   items-center bg-[#d6d5d5]`}
    >
      <div
        className={` justify-evenly flex flex-col   items-center border-[1px] rounded-[6px] bg-[white] border-[grey] FourFifty:w-[450px] w-[100%]`}
      >
        <Image
          src={pic}
          alt="Logo"
          className={`${styles.image} bg-[#d6d5d5] w-[100px] h-[100px] `}
        />

        <div className="relative w-[80%] mb-2 flex flex-row justify-between items-center">
          <div className="mt-2  w-[90px] h-[90px] border-2 border-dashed border-black rounded-full">
            {selectedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="file-preview-image h-[100%] w-[100%] rounded-full"
              />
            ))}
          </div>
          <label
            htmlFor="fileInput"
            className="text-[12px] cursor-pointer bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white w-[40%] h-[40px] rounded"
          >
            Choose File
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            name="fileInput"
          />
        </div>
        <div className="relative w-[80%] mb-2">
          <label htmlFor="name" className="font-semibold"></label>
          <input
            type="text"
            className={`w-[100%] border-[1px] border-[grey] h-[45px] placeholder:text-[#5c5c5c] pl-2`}
            id="name"
            value={finalObj.name}
            onChange={handleChange}
            placeholder="Name*"
            name="name"
            required
          />
        </div>

        <div className="relative w-[80%]  mb-2">
          <label htmlFor="email" className="font-semibold"></label>

          <input
            type="email"
            className="w-[100%] border-[1px] border-[grey] h-[45px] placeholder:text-[#5c5c5c] pl-2 mb-[10px]"
            id="email"
            value={finalObj.email}
            onChange={handleChange}
            placeholder="Email address*"
            name="email"
            required
          />

          <div className="w-[100%] flex justify-between ">
            <div
              className="text-[12px] cursor-pointer bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white px-3 h-[40px] rounded"
              onClick={(e) => {
                e.preventDefault();
                setvisible(true);
              }}
            >
              Verify Email
            </div>
            <div
              className="text-[12px] cursor-pointer bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white  h-[40px] px-3 rounded"
              onClick={(e) => handleOTP(e, { num: 1 })}
            >
              Get OTP
            </div>
          </div>
        </div>
        <div className="relative w-[80%] mb-2">
          <label htmlFor="password" className="font-semibold"></label>
          <input
            type="password"
            className="w-[100%] border-[1px] border-[grey] h-[45px] placeholder:text-[#5c5c5c] pl-2"
            id="password"
            value={finalObj.password}
            onChange={handleChange}
            placeholder="Password*"
            name="password"
            required
          />
        </div>

        <div className="relative w-[80%] flex flex-row justify-between ">
          <p>Become:</p>
          <div>
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
                  className="mt-2 "
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
        {selectedOption === "buyer" ? (
          <></>
        ) : (
          <div className="relative w-[80%] mb-2">
            <label htmlFor="description" className="font-semibold"></label>
            <textarea
              type="text"
              className="w-[100%] border-[1px] border-[grey] h-[100px] placeholder:text-[#5c5c5c] pt-2 pl-2 resize-none"
              id="description"
              value={finalObj.description}
              onChange={handleChange}
              placeholder="Description*"
              name="description"
              required
            />
          </div>
        )}

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
          className={`w-[80%]   bg-[rgb(0,94,255)]  uppercase text-white shadow-[0_4px_9px_-4px_#3b71ca] h-[50px]  mb-2 `}
          onClick={handleForm}
        >
          Register
        </button>
        <p
          className="   hover:bg-[#c2c2c2] hover:text-[black]   p-2 cursor-pointer transition duration-2000 ease-in-out font-semibold mb-2"
          onClick={handleClick}
        >
          Sign In
        </p>
      </div>
      <CenterPopUp
        onClose={handleClose}
        visible={visible}
        num={1}
        handleOTP={handleOTP}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Register;
