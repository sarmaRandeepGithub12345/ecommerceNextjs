"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  BsReverseListColumnsReverse,
  BsFillPencilFill,
  BsFillBagCheckFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import ProfileEdit from "../ProfileEdit.jsx/ProfileEdit";
import styles from "../../styles/profileEdit.module.css";
import TabPanel from "../Tabpanel/TabPanel";
import axios from "axios";
import { getLocalItem } from "@/utils/dataSample";

const API_endpoint = "https://geocode.search.hereapi.com/v1/geocode";
const apiKeyID = "DHi7iI_o0PzSCgADOVw5ZQ"; //'jz9qC1_a94nRd6AYEZBNfw'
const apiKeySecret =
  "v0LJ8b555_cei6zYc7UJxuQnS0amBXBtuuBM08FKv48bIov91bVaLAeZJrGg0VPUe-a8-3vte-8WA25n2Sb67Q";

const Profile = () => {
  const [userInfo, setuserInfo] = useState({});
 
 

  
  useEffect(() => {
    setuserInfo(getLocalItem("userInfo"));
  }, [typeof window !== "undefined"]);
  //console.log(userInfo)
  const router = useRouter();
  const handleAddProduct = (e) => {
    e.preventDefault();
    router?.push("/addProduct");
  };

  const handleEditInfo = (e) => {
    e.preventDefault();
    router?.push("/editinfo");
  };
  //console.log(userInfo);
  return (
    <div className="h-[100vh] w-[100%] ">
      <div className="w-[100%] flex justify-center text-[40px] font-bold text-[#ff6200]">
        Shop Y
      </div>
      <div className="flex items-center justify-center ">
        <BiSolidShoppingBagAlt className="text-[red]" />{" "}
        <span className="text-[16px] font-bold">Online Store</span>
      </div>
      <div
        className={` w-[100%] flex flex-col justify-center items-center `}
      >
     
        {userInfo?.status==='seller'?
         <TabPanel />:
         <ProfileEdit/>  
      }
       
      </div>
    </div>
  );
};

export default Profile;
