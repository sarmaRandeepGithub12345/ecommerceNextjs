import { SignJWT, jwtVerify } from "jose";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { sendResponse } from "./response";
export const createJWT = async (validationObj, expiresIn) => {
  //In JavaScript, Date.now() returns the current timestamp as the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC.
  //Dividing Date.now() by 1000 is a common practice to convert the timestamp from milliseconds to seconds. This is because many systems or APIs use timestamps in seconds rather than milliseconds.
  // const iat = Math.floor(Date.now() /1000)
  // //7 days
  // const exp = iat + 60 * 60 * 60 * 24 * 7;

  // return new SignJWT({
  //         payload :
  //         {
  //             id: user.id,
  //             email: user.email
  //         }
  //     }).setProtectedHeader({
  //         alg:"HS256" ,type:"JWT"
  //     }).setExpirationTime(exp)
  //     .setIssuedAt(iat)
  //     .setNotBefore(iat)
  //     .sign(new TextEncoder().encode(process.env.JWT_SECRET))
  const jwtToken = await jwt.sign(
    validationObj,
    process.env.JWT_SECRET,
    expiresIn
  );

  return jwtToken;
};
export const validateJWT = async (jwt) => {
  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload.payload;
  } catch (error) {
    throw {
      error: error,
      message: "Validation failed",
    };
  }
};
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
export const nodeMailerFunct = async (recipientEmail, subject, htmlText) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //console.log(process.env.EMAIL_HOST,subject,htmlText,recipientEmail)

  let info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject,
    html: htmlText,
  });
  return info;
};
export const VerifyToken = async (req) => {
  //console.log(req)

  // console.log(id,email)
  const token = req.cookies.get(process.env.token_name).value;
  try {
    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenInfo) {
     
        //sending back verified token information
        return {
            ...tokenInfo,
            
        };
      
    } else {
      return sendResponse(400, "Token verification failed", {}, []);
    }
  } catch (error) {
    return sendResponse(500,error.message,{},[error])
  }
};
