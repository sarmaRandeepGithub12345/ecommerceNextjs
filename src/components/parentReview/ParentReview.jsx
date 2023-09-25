"use client";
import { useMediaQuery } from "@mui/material";
import React from "react";
import Reviews from "../reviews/Reviews";

const ParentReview = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return <>{isNonMobileScreens ? <Reviews /> : <></>}</>;
};

export default ParentReview;
