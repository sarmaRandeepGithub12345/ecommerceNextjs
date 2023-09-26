"use client";
import React, { useEffect, useReducer, useState } from "react";
import styles from "../../styles/profileEdit.module.css";
import mens2 from "../../images/mens2.jpg";
import { Avatar, IconButton, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { AiFillEdit } from "react-icons/ai";
import { GoPersonFill } from "react-icons/go";
import { EditReducer } from "@/utils/reducerFile";

import axios from "axios";
import EachItem from "../EachItem/EachItem";
import { BiPencil } from "react-icons/bi";
import { BsSave2Fill } from "react-icons/bs";
import { getLocalItem } from "@/utils/dataSample";
import { editProfile } from "@/functions/apiFunction";

const ProfileEdit = () => {
  
  const isNonMobileScreens = useMediaQuery("(min-width:900px)");
  const isMidScreens = useMediaQuery("(min-width:450px)");

  const [userInfo, setuserInfo] = useState({});
  //console.log(userInfo)
  let INITIAL_STATE = {
    name: {
      displayName: "Name",
      value: "",
      label: "name",
    },
    area: {
      displayName: "Area",
      value: "",
      label: "area",
    },
    pincode: {
      displayName: "PinCode",
      value: "",
      label: "pincode",
    },
    district: {
      displayName: "District",
      value: "",
      label: "district",
    },
    stateOfRes: {
      displayName: "State",
      value: "",
      label: "state",
    },
    country: {
      displayName: "Country",
      value: "India",
      label: "country",
    },
  };
  const [state, dispatch] = useReducer(EditReducer, INITIAL_STATE);
  //console.log(userInfo)

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem("user")) //getLocalItem("userInfo")
    setuserInfo(obj);
    const locArray=obj.location!==""?obj.location?.split(","):[]
    //console.log(locArray)
    dispatch({
      type:"FULLEDIT",
      payload: {
        name: obj.name,
        area: locArray.length>0?locArray[0]:"",
        pincode: locArray.length>0?locArray[1]:"",
        district: locArray.length>0?locArray[2]:"",
        stateOfRes: locArray.length>0?locArray[3]:"",
        country: locArray.length>0?locArray[4]:"",
      }
    })
  }, [typeof window !== "undefined"]);
  
  
  
  const [entireLoc, setEntireLoc] = useState("");
  const finCoordinates = async (e) => {
    e.preventDefault();
    navigator?.geolocation?.getCurrentPosition(
      async (position) => {
        //console.log(position.coords.latitude, position.coords.longitude)
        await getLoc(position.coords.latitude, position.coords.longitude);
      },
      () => {
        console.log("Failed");
      },
      {
        enableHighAccuracy: true,
      }
    );
  };
  /*   continent
  : 
  "Asia"
  country
  : 
  "India"
  country_code
  : 
  "in"
  county
  : 
  "Dispur"
  postcode
  : 
  "781032"
  road
  : 
  "unnamed road"
  road_type
  : 
  "residential"
  state_district
  : 
  "Kamrup Metropolitan District"
  suburb
  : 
  "Birubari"
  _category
  : 
  "road"
  _type
  : 
  "road"
 */
  const SaveLocationDB = async(e) => {
    e.preventDefault();
    if(entireLoc==="")return
    const formData = new FormData()
    
    formData.set("location",entireLoc)
    formData.set("opNum",3)
    formData.set("id",userInfo.id)
    formData.set("email",userInfo.email)
    try {
      const resp = await editProfile(formData)
      
      const resJSON = await resp.json()
      console.log(resJSON)
      // if(resp.status===200){
      //  console.log(resJSON)
      // }else if(resp.status===400){
      //  console.log(resJSON)
      // }

    } catch (error) {
      
    }
  };
  //console.log(userInfo)
  const getLoc = async (latitude, longitude) => {
    try {
      const resp = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      const LocationObj = resp.data.address;
      console.log(LocationObj)
      let str = "";
      str += (LocationObj.suburb!==undefined? LocationObj.suburb:LocationObj.town) + ",";
      str += LocationObj.postcode + ",";
      str += LocationObj.state_district + ",";
      str += LocationObj.state + ",";
      str += LocationObj.country;
      setEntireLoc(str);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const [imgFile, setImgFile] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const handleChangeDP = (e) => {
    e.preventDefault();
    const ReqdFile = Array.from(e.target.files)[0];

    if(ReqdFile){
      setImgFile(ReqdFile)
      const reader = new FileReader()
      reader.onload = (readerEvent)=>{
        const baseContent = readerEvent.target.result
        setBase64Image(baseContent)
      }
      reader.readAsDataURL(ReqdFile)

    }
  }
  //console.log(imgFile)
  const handleUpload = (e)=>{
    e.preventDefault()
    
  }
  //console.log(userInfo)
  const [showDesc, setshowDesc] = useState(false)
  return (
    <div
      className={` w-[100%] sevenHun:w-[700px] mt-[10px]  
      p-2
    `}
    >
      <div className="flex sixHun:w-[70%] justify-center mt-[20px] w-[100%] text-[30px] mb-[15px]">
        Edit Profile Information
      </div>
     
      <div className="w-[90%] sixHun:w-[70%] flex flex-row justify-between">
        <div className="">
         
            {
              imgFile ?
              <>
              {/*imgFile?.map((file,index)=>(
                <Image
                key={index}
                src={URL.createObjectURL(file)}
                alt="DP"
                width="0"
                height="0"
                className="rounded-full w-[80px] h-[80px]"
                
              />
              ))*/}
               <Image
                //key={index}
                src={URL.createObjectURL(imgFile)}
                alt="DP"
                width="0"
                height="0"
                className="box-border border-[2px] border-[#956795] rounded-full w-[80px] h-[80px]"
                
              />
              </>
              :
              <img              
              src={userInfo?.img}
              alt="DP"
              width="0"
              height="0"
              className="box-border border-[2px] border-[#956795]  rounded-full w-[80px] h-[80px]"
              
            />
            }
              
        </div>
        <div className=" flex justify-center">
        <label
            htmlFor="fileInput"
            className="bg-[#956795] border-[3px] border-[white] rounded-[8px] w-fit p-[10px] text-[white] text-[13px] hover:border-[#630363] mt-[15px] cursor-pointer h-fit"
          >
            Choose
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onInput={handleChangeDP}
            name="fileInput"
          />
        </div>
        <div className="bg-[#956795] border-[3px] border-[white] rounded-[8px] w-fit p-[10px] text-[white] text-[13px] hover:border-[#630363] mt-[15px] cursor-pointer h-fit"
        onClick={handleUpload}
        >
          Upload
        </div>
      </div>
     
     {
      /* if user is a seller */
      userInfo?.status ? <div className="Description w-[100%] mt-[20px] flex justify-center flex-col ">
     
      <div className="h-fit w-[90%] sixHun:w-[70%]  rounded-[5px] mb-[7px] text-[14px] p-3 border-[grey] resize-none bg-[#e5e5e5] outline-none flex flex-row justify-between">
        {
          showDesc? <textarea name="" id="desc" className="h-[80px] w-[90%]  rounded-[5px]  resize-none p-2" placeholder="Type your new description here...." ></textarea>:
          <div className="w-[90%] p-3">
        {userInfo?.description}
      </div>
        }
      
      <div>
      <IconButton onClick={e=>{
        e.preventDefault()
        setshowDesc(prev=>!prev)}}>
          {
            showDesc?<BsSave2Fill className="text-[#6ec3ff]" />:
            <BiPencil className=""/>
          }
      </IconButton>
      </div>
      </div>
   
    </div>:<></>
     } 
      <div className="w-[90%] sixHun:w-[70%] flex flex-col items-center mt-[15px]">
        <div className="mb-[10px]">Search Your Location</div>
        <div className="Location w-[100%] flex justify-center">
          <textarea
            disabled={true}
            type="text"
            placeholder={`Click on "Find Location" button to get your approximate location`}
            defaultValue={entireLoc}
            className="resize-none rounded-[5px] h-[50px] text-[14px] w-[100%] pt-[5px] p-[9px] outline-none placeholder:text-[12px] border-[2px] border-[#bbbbbb]"
          />
        </div>
        <div className="flex flex-row justify-between  w-[100%]">
          <div
            className="bg-[#956795] border-[3px] border-[white] rounded-[8px] w-fit p-[10px] flex justify-center items-center text-[white] text-[12px] hover:border-[#630363] mt-[15px] cursor-pointer"
            onClick={finCoordinates}
          >
            Find Location
          </div>
          <div
            className="bg-[#956795] border-[3px] border-[white] rounded-[8px] w-fit p-[10px] flex justify-center items-center text-[white] text-[12px] hover:border-[#630363] mt-[15px] cursor-pointer"
            onClick={SaveLocationDB}
          >
            Save Location
          </div>
        </div>
      </div>

      <div
        className={`AllInfoWidget bg-[#ebebeb] rounded-[6px] w-[90%] sixHun:w-[85%] p-[15px] mt-[20px] `}
      >
        {Object.entries(state).map(([k, val], id) => (
          <EachItem
            key={id}
            num={id}
            item={val}
            dispatch={dispatch}
            state={state}
          />
        ))}
      </div>
      
    </div>
  );
};

export default ProfileEdit;
