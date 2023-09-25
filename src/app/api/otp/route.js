import {  generateOTP, nodeMailerFunct } from "@/utils/auth";
import { connectPostgress } from "@/utils/db";
import { sendResponse } from "@/utils/response";

import url from "url";
export const GET = async (req) => {
  const tempReqObj = await req;
  //parsing and destructuring email from query parameters using URL module
  var address = url.parse(tempReqObj.url, true);
  const { email } = address.query;
  //console.log(email)
  let text = "select * from otpvalidation where email = $1";
  let params = [email];
  let result = await connectPostgress(text, params);
  let newOTP 
  //checking if email exists in otpvalidation
  if (result.rows.length === 1) {
    //date has  expired
    if (result.rows[0].date_of_expiry < Date.now()) {
      //otp generation and storing in database
      newOTP = generateOTP()
      text = "update otpvalidation set otp = $1,date_of_expiry =$2  where email = $3 returning *"
      params = [newOTP,Date.now()+2*60*1000,email]
      result = await connectPostgress(text,params)

      //sending otp to email
      const temp = await nodeMailerFunct(email,"ShopY OTP verification",`Your OTP is <h1>${newOTP}</h1>.This is valid for the next 2 minutes`)
      //console.log(temp)

      return sendResponse(200, "OTP sent to email.Valid for 2 minutes", {}, []);
    } else if(result.rows[0].date_of_expiry >= Date.now()) {
      //if date hasnt  expired
      //console.log(result.rows[0].date_of_expiry,Date.now(),"2")

      return sendResponse(400, "Cannot resend OTP within 2 minutes", {}, []);
    }
  }

  //generating the otp
  newOTP = generateOTP();
  
  //storing the otp alongside email in database
  text =
    "insert into otpvalidation (email,otp,date_of_expiry) values ($1,$2,$3)";
  
  params = [email, newOTP, Date.now() + 2 * 60 * 1000];

  result = await connectPostgress(text, params);
  //console.log(result);
  const temp = await nodeMailerFunct(email,"ShopY OTP verification",`Your OTP is <h1>${newOTP}</h1>.This is valid for the next 2 minutes`)
  //console.log(temp)
  try {
    return sendResponse(200, "OTP sent to email.Valid for 2 minutes", {}, []);
  } catch (error) {
    return sendResponse(500, "Error in OTP verification", {}, [error.message]);
  }
};

export const POST = async (req) => {
  const data =await req.formData()
  let email = data.get('email')
  let otp = data.get('otp')
  let text = "select * from otpvalidation where email = $1 and otp =$2" 
  let params = [email,otp]
  console.log(email,otp)
  const result = await connectPostgress(text,params)
  //wrong otp
  if(result.rows.length===0){
    return sendResponse(400,"Invalid email or otp",{},[]) 
  }
  //otp expired
  if(result.rows[0].date_of_expiry<Date.now()){
    return sendResponse(400,"OTP has expired",{},[]) 
  }
  try {
    //email validated
    text="update otpvalidation set validationcheck=$1 where email= $2"
    params=[true,email]
    await connectPostgress(text,params)

    return sendResponse(200,"Email verified successfully",{},[])
  } catch (error) {
    return sendResponse(500, "Error in OTP verification", {}, [error.message]);
  }
};
