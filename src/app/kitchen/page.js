import List from "@/components/List/List";
import MobileSearchBox from "@/components/MobileSearchBar/MobileSearchBox";
import HeaderComp from "@/components/head/HeadComp";
import MenPage from "@/components/men/MenPage";
import React from "react";

const page = () => {
  return (
    <>
      <MobileSearchBox/>
      <MenPage heading="Kitchen Section" num={1} />
    </>
  );
};

export default page;
