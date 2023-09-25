"use client";
import React, { useEffect, useState } from "react";
import pic from "../../images/shp.png";
import Image from "next/image";
import PagePostError from "../ErrorPage/PagePostError";
import { uploadFunct } from "@/utils/awsUpload";
import { addProductName } from "@/functions/apiFunction";

const AddProduct = () => {
  const [tagText, setTagText] = useState("");
  const [tagArray, settagArray] = useState([]);
  const handleTag = (e) => {
    e.preventDefault();
    if(tagText!==""){
    settagArray((prev) => [...prev, tagText]);
    setTagText("");
    }
    
  };
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showError, setshowError] = useState({
    num:0,
    text:""
  })
  const handleFileChange = (event) => {
    event.preventDefault();

    const files = Array.from(event.target.files);

    //console.log(files)
    if (files.length ===3 /* && isLoading === false */){
      setSelectedFiles(files);
    }else{
   
      setshowError( 
        {
          num:1,
          text:"Three Images Compulsory"
        }
       
    )
    }
  };
  //console.log(showError)
  const handleDeleteTag = (e, id) => {
    e.preventDefault();

    //let arr = tagArray.filter(item=>item===tagArray[id])
    settagArray((prev) => prev.filter((item) => item !== prev[id]));
  };
  const [visible, setvisible] = useState(false)
  const handleClose=(e)=>{
    e.preventDefault()
    setvisible(false)
  }
useEffect(() => {
  setTimeout(() => {
    setshowError({
      num:0,
      text:""
    })
  }, 1500);
}, [showError.num!==0])

  //id,userId,prod uctname,price,categories,description
  const [finalObj, setfinalObj] = useState({
    productName:"",
    price:"",
    stockCount:"",
    description:""
  })
    
  //console.log(urlsImage.length===3)
  const formSubmit=async(e)=>{
    e.preventDefault()
    let formData = new FormData()
    for(let i=0;i<selectedFiles.length;i++){
      formData.set(`file-${i+1}`,selectedFiles[i])
    }
    formData.set('tagArray',tagArray)
    formData.set('stockCount',finalObj.stockCount)
    formData.set('description',finalObj.description)
    formData.set('price',finalObj.price)
    formData.set('productName',finalObj.productName)
    
    //form.set()
    //const formData = Object.fromEntries(form.entries());

    const res = await addProductName(formData)
    console.log(res)
    if(finalObj.productName && finalObj.price && finalObj.stockCount && finalObj.description && selectedFiles.length===3 && tagArray.length>0 ){
    //console.log(selectedFiles)
    
  
     
    }else{

    }
  }
  const handleChangeField=(e)=>{
    e.preventDefault()
    const {name,value}=e.target
    if((name==='price' || name==='stockCount') && value<0){
      setshowError({
        num:2,
        text:"Number can't be lesser than 0"
      })
      return ;
    }
    setfinalObj(prev=>({...prev,[name]:value}))
  }
  return (
    <div className="w-[100%] sevenHun:w-[700px] rounded-[6px] shadow-lg shadow-[#61a0ff]  bg-[rgb(241,241,241)] mt-[15px]">
      <div
        className="w-[100%] h-[100%]  box-border  flex flex-col"
        
      >
        <div className="w-[80%] box-border  flex flex-col">
          <label htmlFor="productName" className="ml-[40px] mb-1 mt-1">
            Images*
          </label>

          <div className="pl-[40px] flex flex-col w-[100%] justify-between">
            <label
              htmlFor="fileInput"
              className="text-[12px] cursor-pointer bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white w-[100px] h-[40px] rounded"
            >
              Choose Files
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              onInput={handleFileChange} 
              name="fileInput"
            />
            <div className="flex flex-row justify-between mt-4">
            {selectedFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="file-preview-image w-[30%]"
              />
            ))}
              
             
            </div>
          </div>
          <div className="h-[30px] flex justify-center text-[red]">
              {showError.num===1 && (
              <>
              {showError.text}
              </>)}
          </div>
        </div>

        <div className="w-[80%] box-border  flex flex-col">
          <label htmlFor="productName" className="ml-[40px] mb-1 mt-1">
            Product Name*
          </label>
          <input
            type="text"
            value={finalObj.productName}
            onChange={handleChangeField}
            className={`ml-[40px] w-[100%] border-[1px] border-[#5f5f5f] h-[40px] placeholder:text-[#5c5c5c] pl-2 rounded-[3px]`}
            id="productName"
            placeholder={`Eg : "Saree" or "Jeans"`}
            name="productName"
            required
          />
        </div>
        <div className="w-[80%] box-border  flex flex-col">
          <label htmlFor="price" className="ml-[40px] mb-1 mt-1">
            Price*
          </label>
          <input
            type="number"
            className={`ml-[40px] w-[100%] border-[1px] border-[#5f5f5f] h-[40px] placeholder:text-[#5c5c5c] pl-2 rounded-[3px]`}
            id="price"
            value={finalObj.price}
            onChange={handleChangeField}
            placeholder="Eg - Rs. 3000"
            name="price"
            required
          />
        </div>
        
        <div className="w-[50%] box-border  flex flex-col">
          <label htmlFor="stockCount" className="ml-[40px] mb-1 mt-1">
            Stock Count*
          </label>
          <input
            type="number"
            className={`ml-[40px] w-[100%] border-[1px] border-[#5f5f5f] h-[40px] placeholder:text-[#5c5c5c] pl-2 rounded-[3px]`}
            id="stockCount"
            placeholder="1,2,3...or 1000"
            name="stockCount"
            value={finalObj.stockCount}
            onChange={handleChangeField}
            required
          />
        </div>
        <div className="h-[30px] pt-[10px] flex justify-center text-[red]">
              {showError.num===2 && (
              <>
              {showError.text}
              </>)}
          </div>
        <form className="w-[80%] box-border  flex flex-col"  onSubmit={handleTag}>
          <label htmlFor="price" className="ml-[40px] mb-1 mt-1">
            Category*
          </label>

          <input
            type="text"
            className={`ml-[40px] w-[100%] border-[1px] border-[#5f5f5f] h-[40px] placeholder:text-[#5c5c5c] pl-2 rounded-[3px]`}
            id="price"
            value={tagText}
            onChange={(e) => {
              e.preventDefault();
              setTagText(e.target.value);
            }}
            placeholder="mens,womens,home"
            name="price"
            required
          />
          <button
            type="submit"
           
            className="ml-[40px] mt-2 w-[70px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span className="mr-1">+</span>
            Add
          </button>
          <div className="w-[100%] box-border pl-[40px] grid sm:grid-cols-3 grid-flow-row">
            {tagArray.map((item, id) => (
              <button
                onClick={(e) => handleDeleteTag(e, id)}
                key={id}
                type="button"
                className="w-fit flex flex-row justify-between text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mt-4"
              >
                <span className="text-black">{item}</span>
                <span className="ml-2">X</span>
              </button>
            ))}
          </div>
        </form>

        <div className="w-[80%] box-border  flex flex-col">
          <label htmlFor="description" className="ml-[40px] mb-1 mt-1">
            Description*
          </label>
          <textarea
            className={`ml-[40px] text-[12px] w-[100%]  border-[1px] border-[#5f5f5f] h-[200px] placeholder:text-[#5c5c5c] p-2 rounded-[3px] resize-none`}
            id="description"
            placeholder={`Eg : "Hand embroidered saree with silk"`}
            name="description"
            value={finalObj.description}
            onChange={handleChangeField}
            required
          />
        </div>
        <button className="bg-[#11b4ff] w-[120px] h-[50px] mt-[10px] mb-[10px] ml-[40px]  rounded-[10px] text-[white]" onClick={formSubmit}>
          Add Product</button>
      </div>
      
    </div>
  );
};

export default AddProduct;
