import MobileSearchBox from "@/components/MobileSearchBar/MobileSearchBox";
import { Inter } from "next/font/google";
import { Fragment } from "react";


const inter = Inter({ subsets: ["latin"] });
//psql connection
export const metadata = {
  title: "Product",
  description: "Product Section",
};
export default function ProductLayout({ children }) {
  return (
    <Fragment >
     <MobileSearchBox/>
     {children}
     
    </Fragment>
  );
}
