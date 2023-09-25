import { sendResponse } from "@/utils/response";
import { NextResponse } from "next/server";


export const GET = async(req)=>{
    try {
        const res = sendResponse(200,"Logged Out",{},[])
        res.cookies.set(process.env.token_name,"",
        {
            httpOnly:true,
            expires:new Date(0)
        })
        return res
    } catch (error) {
        return sendResponse(500,error.message,{},[error]) 
    }
}