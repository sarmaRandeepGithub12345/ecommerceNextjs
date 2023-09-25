"use client"
import React, { useEffect } from 'react'

const PagePostError = ({visible,setshowError,setvisible,onClose,showError}) => {
  const handleClose=(e)=>{
    e.preventDefault()
    if(e.target.id==='test'){
        onClose()
    }
  }
  if(!visible)return null
  useEffect(() => {
    setTimeout(() => {
      setvisible(false)
      setshowError("")
    },1500);
  }, [visible===true])
  
  return (
    <div className='fixed z-[20] inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center' id="test" onClick={handleClose}>
        <div className='bg-[white] '>
            <div className='flex justify-end'><span className='pt-[10px] pr-[10px] cursor-pointer'
            onClick={e=>{
              e.preventDefault()
              onClose()
            }}
            >X</span></div>
            <div className='text-[red] italic p-[10px]'>{showError}</div>
        </div>
    </div>
  )
}

export default PagePostError