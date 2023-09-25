//"use client"
import AWS from "aws-sdk";
// import awsSdk from "aws-sdk";

// import nextConnect from 'next-connect'
// import multer from 'multer'
// import {S3Client , PutObjectCommand} from '@aws-sdk/client-s3'
// import {Transform} from 'stream'
// import {Upload} from '@aws-sdk/lib-storage'
// import {createRequestPresigner} from '@aws-sdk/s3-request-presigner'
// import formidable from "formidable";
require("aws-sdk/lib/maintenance_mode_message").suppress = true;



export const uploadFunct = async (blobs, endpoint) => {
  //console.log(process.env.NEXT_PUBLIC_ACCESS_KEY)
  //console.log(file)
  //console.log(blobs)
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
    region: "ap-south-1",
    signatureVersion: "v4",
  });
  
  const s3 = new AWS.S3(); 
  if (!blobs) {
    return;
  }
  let urls = []
  //console.log(blobs)
  for(const blob of blobs){
    const file = new Uint8Array(await blob.arrayBuffer())
   //console.log(file.originalname)
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_END + endpoint,
      Key: `${Date.now()}.${blob.name}`,
      Body:file,
      ContentType:blob.type
    };
    const {Location} =await s3.upload(params).promise()
    urls.push(Location)
  }
return urls
};
export const handleDelete = async (url, endpoint) => {
  let arr = url.split("/");
  //console.log(arr)

  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
    region: "ap-south-1",
    signatureVersion: "v4",
  });

  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_END + endpoint,
    Key: `${arr[arr.length - 1]}`,
  };
  //console.log(params)
  s3.deleteObject(params, (error, data) => {
    if (error) {
      console.error("Error deleting phoho:", error);
    } else {
      //console.log('Photo deleted successfully');
    }
  });
};
