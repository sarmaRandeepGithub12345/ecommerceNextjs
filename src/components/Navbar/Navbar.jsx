"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Search from "../search/Search";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BiSearchAlt } from "react-icons/bi";
import { BiLogoShopify } from "react-icons/bi";
import { setLocalItem } from "@/utils/dataSample";
import { logoutFunction } from "@/functions/apiFunction";
import useCustomHook from "@/hooks/useCustomHook";
import CenterPopUp from "../centerPopUp/CenterPopUp";

//import "./Navbar.scss"
const Navbar = () => {
  const [isLoading, setisLoading] = useState(false);

  const user = true;
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const isActive = (e) => {
    e.preventDefault();
    if (window.scrollY > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  const router = useRouter();
  const handleMenu = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  const handleLogo = (e) => {
    e.preventDefault();
    router?.push("/");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    router?.push("/login");
  };
  const handleWomen = (e) => {
    e.preventDefault();
    router?.push("/women");
  };
  const handleMen = (e) => {
    e.preventDefault();
    router?.push("/men");
  };
  const handleKids = (e) => {
    e.preventDefault();
    router?.push("/kids");
  };
  const handleElec = (e) => {
    e.preventDefault();
    router?.push("/electronics");
  };
  const handleKitchen = (e) => {
    e.preventDefault();
    router?.push("/kitchen");
  };
  const { visible, setvisible, handleClose } = useCustomHook();
  const handleLogout = async (e) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const resp = await logoutFunction();
      setvisible(true);
      const show = await resp.json();
      //console.log(show)
      if (resp.status === 200) {
        
        console.log(show)
        setLocalItem("userInfo", null);
      
        router.push("/login");
      }
      setvisible(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleJump = (str, e) => {
    e.preventDefault();
    if (str == "profile") {
      router.push("/profile");
    }
  };

  return (
    <>
      <div className="sticky top-[0] z-[8] flex flex-row bg-[#5a67d8] items-center h-[60px] min-w-[99vw]  box-border">
        <div
          className="text-[white] w-[20%] box-border cursor-pointer flex flex-row ml-2"
          onClick={handleLogo}
        >
          <div className="h-[70%] box-border font-semibold flex justify-center items-center">
            <BiLogoShopify className="text-[43px]" />
          </div>
          <div className=" text-[10px] h-[30%] box-border  flex flex-col items-center">
            <p className="text-[15px] font-semibold">Shop Y</p>
            <p>Online Store</p>
          </div>
        </div>
        <div className="h-[40px] w-[55%] mx-2 rounded-l-[20px] rounded-r-[20px]  rounded-[5px] flex flex-row mb-[5px] mt-[5px]">
          <input
            type="text"
            className="rounded-l-[20px] h-[100%] w-[calc(100%-70px)] pl-4 outline-none"
            placeholder="Search..."
          />

          <div className="w-[70px] flex justify-center items-center cursor-pointer bg-[#585869] rounded-r-[20px]">
            <BiSearchAlt className="hover:text-[25px] text-[23px] text-[white]" />
          </div>
        </div>
        <div className="flex flex-row w-[20%] justify-end">
          <div>
            <AiOutlineShoppingCart className="text-[white] mr-4 text-[25px]" />
          </div>
          {user ? (
            <div className="relative cursor-pointer" onClick={handleMenu}>
              <RxAvatar className="text-[white] text-[25px]" />
              {open ? (
                <div
                  className={` bg-[white] top-[30px] right-[10px]  flex flex-col absolute z-[500] shadow-[10px_10px_30px_8px_rgba(0,0,0,0.3)] p-[20px]`}
                >
                  <p
                    className="cursor-pointer box-border hover:border-2 hover:border-dashed hover:border-[black] p-2"
                    onClick={(e) => handleJump("profile", e)}
                  >
                    Profile
                  </p>
                  <p className="cursor-pointer box-border hover:border-2 hover:border-dashed hover:border-[black] p-2">
                    Messages
                  </p>
                  <p className="cursor-pointer box-border hover:border-2 hover:border-dashed hover:border-[black] p-2">
                    Orders
                  </p>
                  <p
                    className="cursor-pointer box-border hover:border-2 hover:border-dashed hover:border-[black] p-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <button
              className="bg-[#00fffb] px-[3px] py-[4px] text-[15px] rounded-md font-bold text-[blue]"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div className="min-w-[99vw] h-[40px] bg-[white] flex flex-row justify-evenly  font-bold text-[#505081] pt-[5px]  ">
        <p
          className="cursor-pointer transition duration-500 ease-in-out rounded-[5px] hover:rounded-[5px] flex items-center box-border border-[1px] border-white hover:scale-[110%] hover:border-[black] hover:border-dashed hover:border-[1px]
       px-2 "
          onClick={handleWomen}
        >
          Women
        </p>
        <p
          className="cursor-pointer transition duration-500 ease-in-out rounded-[5px] hover:rounded-[5px] flex items-center box-border border-[1px] border-white hover:scale-[110%] hover:border-[black] hover:border-dashed hover:border-[1px]
       px-2"
          onClick={handleMen}
        >
          Men
        </p>
        <p
          className="cursor-pointer transition duration-500 ease-in-out rounded-[5px] hover:rounded-[5px] flex items-center box-border border-[1px] border-white hover:scale-[110%] hover:border-[black] hover:border-dashed hover:border-[1px]
       px-2"
          onClick={handleKids}
        >
          Kids
        </p>
        <p
          className="cursor-pointer transition duration-500 ease-in-out rounded-[5px] hover:rounded-[5px] flex items-center box-border border-[1px] border-white hover:scale-[110%] hover:border-[black] hover:border-dashed hover:border-[1px]
       px-2"
          onClick={handleElec}
        >
          Electronics
        </p>
        <p
          className="cursor-pointer transition duration-500 ease-in-out rounded-[5px] hover:rounded-[5px] flex items-center box-border border-[1px] border-white hover:scale-[110%] hover:border-[black] hover:border-dashed hover:border-[1px]
       px-2"
          onClick={handleKitchen}
        >
          Kitchen
        </p>
      </div>
      <hr className="min-w-[99vw] bg-[#878787] h-[1px]" />
      <CenterPopUp
        onClose={handleClose}
        visible={visible}
        isLoading={isLoading}
      />
    </>
  );
};

export default Navbar;
