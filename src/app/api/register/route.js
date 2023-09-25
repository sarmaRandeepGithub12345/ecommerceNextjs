

import bcrypt from "bcrypt";

import { connectPostgress } from "@/utils/db";
import { sendResponse } from "@/utils/response";
import { uploadFunct } from "@/utils/awsUpload";

export const POST = async (req) => {
  const data = await req.formData()
  const name =data.get('name')
  const email = data.get('email')
  const password = data.get('password')
  const file = data.get('file')
  const description = data.get('description')
  const status = data.get('status')
  
  //check if password is at least 8 characters
  if(password.length<8){
    return sendResponse(400,"Password length should be minimum 8 characters",{},[])
  }
  //checking if email exists 
  let text = "select * from users where email = $1 and isSeller = $2";
  let params = [email, status];

  let reqPer = await connectPostgress(text, params);
  if (reqPer.rows.length > 0) {
    
    return sendResponse(400,"User with Email Found",{},[])
  }
  //checking if email is validated using otp
  text = "select * from otpvalidation where email = $1 and validationcheck = $2"
  params = [email,true]
  reqPer = await connectPostgress(text,params)

  if(reqPer.rows.length===0){
    return sendResponse(400,"Email not validated",{},[])
  }
  //text="update otpvalidation set validationcheck = $1 where email = $2"
  //params = [false,email]
  //delete otp record after registration
  text='delete from otpvalidation where email = $1 and validationcheck = $2'
  params = [email,true]
  await connectPostgress(text,params)
  
  //uploading picture 
  const urls =await uploadFunct([file],"Display_Picture")
  //console.log(urls)
  //password ecryption
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const text =
      "INSERT INTO  users (name,email,cart,password,img,description,isSeller) values ($1,$2,$3,$4,$5,$6,$7)";
    let arr = name.split(" ")
    let finalName=""
    for(let i=0;i<arr.length;i++){
      finalName+=(arr[i][0].toUpperCase()+arr[i].slice(1))
      if(i!==arr.length-1){
        finalName+=" "
      }
    }
    const params = [finalName, email,[], hashPassword, urls[0], description, status];
    //saving new user to database
    const newUser = await connectPostgress(text, params);

    return sendResponse(200,"User registration successfull",{},[])
    
  } catch (error) {
    return sendResponse(500,error.message,{},[error])
  }
};
