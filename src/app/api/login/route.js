import { connectPostgress } from "@/utils/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { createJWT } from "@/utils/auth"
import jwt from "jsonwebtoken";
import { sendResponse } from "@/utils/response";
export const POST =async(req)=>{
   
    const data= await req.formData()
    const email = data.get('email')
    const password = data.get('password')
    const isSeller = data.get('status')
   // console.log(email,password,isSeller)
    const text =`select * from users where email = $1 and isseller = $2`
    const params = [email,isSeller];
    //db 
     
    const result = await connectPostgress(text,params)
    //console.log(result)
    if(result.rows.length==0){
            
        return sendResponse(400,"No user Found",{},[])
        
    }
    const isMatch = await bcrypt.compare(password,result.rows[0].password)
    
    if(!isMatch){

        return sendResponse(400,"Wrong Password",{},[])
        
    }
   
    try {
        
        const {password,...info}= result.rows[0]
        //console.log(result.rows[0])
        const tokenData = {
            id:result.rows[0].id,
            username:result.rows[0].name,
            email:result.rows[0].email
        }
        const tkn = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"30d"})//await createJWT(data)
        

        const res =  sendResponse(200,"Welcome back",info,[])
        res.cookies.set(process.env.token_name,tkn,
        {
            httpOnly:true,
            path:"/"
        })
        return res
    } catch (error) {
        return sendResponse(500,error.message,{},[error])    
    }    
}