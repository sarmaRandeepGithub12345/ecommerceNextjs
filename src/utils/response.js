import { NextResponse } from "next/server";
export const sendResponse = (status,message,data = {},errors=[])=>{
  //console.log(status)  
  return NextResponse.json(
        {
          message,
          data,
          errors
        },
           {status}
        )
      
}