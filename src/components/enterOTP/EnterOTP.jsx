import React, { useState } from "react";

const EnterOTP = ({ onClose,handleOTP }) => {
    const [inputVal, setinputVal] = useState("")
  return (
    <div className="bg-[white]  ThreeHun:w-[300px] w-[100%] p-3 ThreeHun:rounded-[3px]">
      <div className="w-[100%] flex  justify-end px-2">
        <div
          onClick={onClose}
          className="cursor-pointer border-[2px] border-dashed px-1 border-[white] hover:border-[black]"
        >
          X
        </div>
      </div>
      <div className="w-[100%] flex justify-center">
        Enter 6 digit OTP sent to Email
      </div>
      <div className="w-[100%] flex items-center mt-[10px] flex-col">
        <input type="number" className="border-[1px] outline-none border-black h-[35px] rounded-full pl-2" value={inputVal}
        onChange={
            e=>{
                e.preventDefault()
                const str = e.target.value.toString()
                str.length<=6 &&  setinputVal(e.target.value)
            }
        }
        />
        <div className="text-[12px] cursor-pointer bg-blue-500 hover:bg-blue-600 flex justify-center items-center text-white w-[90px] h-[40px] rounded mt-[15px]"
        onClick={e=>handleOTP(e,{
            num:2,
            text:inputVal
        })}
        >
        Send OTP
      </div>
      </div>

      
    </div>
  );
};

export default EnterOTP;
