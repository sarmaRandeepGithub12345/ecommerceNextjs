import { VerifyToken } from "@/utils/auth";
import { handleDelete, uploadFunct } from "@/utils/awsUpload";
import { connectPostgress } from "@/utils/db";
import { sendResponse } from "@/utils/response";

export const PATCH = async (req) => {
  
  const data = await req.formData()
  const opNum = data.get('opNum')
  // console.log(opNum)
  // return sendResponse(200,"Done",{},[])
  
  // opNum ===1 Change Display Picture
  // opNum ===2 Change Name
  // opNum ===3 location
  // opnum ===4 description
  
  //Token verification
  const tokenInfo = await VerifyToken(req);
  console.log(tokenInfo)
  let text
  let params

  // if(opNum==="1"){
  //   const urlDP = data.get('urlDP')
  //   //delete the present Display Picture of user using url of user
  //   const temp = await handleDelete(urlDP,"Display_Picture")
  //   const file = await data.get('file')
  //   //upload file
  //   const urls = await uploadFunct([file],"Display_Picture")
  //   text = "update users set img = $1 where id = $1 and email = $2"
  //   params = [urls[0],tokenInfo.id,tokenInfo.email]

  // }else if(opNum==="2"){
  //   const newName = data.get('newName')
  //   text = "update users set name = $1 where id = $2 and email=$3 returning *";
  //   params = [newName, tokenInfo.id, tokenInfo.email];
  // }else 
  if(opNum==="3"){
    //console.log('Hi')
    const location = data.get('location')
    //console.log(location)
    text = "update users set location = $1 where id = $2 returning *";
    params = [location, tokenInfo.id];
   }
  //   else if(opNum==="4"){
  //   //description only allowed for sellers
  //   const description = data.get('description')
  //   text = "update users set description = $1 where id = $2 and email=$3 and isseller=$4 returning *";
  //   params = [description, tokenInfo.id, tokenInfo.email,true];
  // }
  try {
    //console.log(text,params)
    const result = await connectPostgress(text, params);
    const {password,...info} = result.rows[0]
    return sendResponse(200, "Profile Information Updated Successfully", {}, []);


  } catch (error) {
    return sendResponse(500,error.message,{},[error])
  } 
  
};
