import { uploadFunct } from "@/utils/awsUpload";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req)=>{
  
    const data =await req.formData()
    //const fileOne = data.get('file-1')
    const files = Array.from([data.get('file-1'),data.get('file-2'),data.get('file-3')])
    //console.log(files)
    const urls =await uploadFunct(files,"Product")
    //console.log(urls)
    try {
        //const query = "insert into products ()"
        return new NextResponse(
            JSON.stringify({
              urls,
              message: "success"
            })
          );
    } catch (error) {
        
    }
}