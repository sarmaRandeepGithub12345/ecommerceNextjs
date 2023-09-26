import { sendResponse } from "@/utils/response";
import { NextResponse } from "next/server";


export const GET = async(req)=>{
    try {
        const res = NextResponse.json(
            {
              message:"Logged Out",
              data:{},
              errors:[]
            },
               {status:200}
            ) 
        res.cookies.set("token","",
        {
            httpOnly:true,
            expires:new Date(-10)
        })
        return res
    } catch (error) {
        return sendResponse(500,error.message,{},[error]) 
    }
}