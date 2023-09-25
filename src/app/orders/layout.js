import { Inter } from "next/font/google";
import { Fragment } from "react";


const inter = Inter({ subsets: ["latin"] });
//psql connection
export const metadata = {
  title: "Orders",
  description: "Orders' Section",
};
export default function OrderLayout({ children }) {
  return (
    <Fragment >
     {children}
     
    </Fragment>
  );
}
