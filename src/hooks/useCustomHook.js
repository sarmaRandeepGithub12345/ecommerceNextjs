import React, { useState } from 'react'

const useCustomHook = () => {
  const [visible, setvisible] = useState(false)
  const handleClose =()=>{
    setvisible(false)
  }
  const [isLoading, setisLoading] = useState(false);

  return {
    isLoading,
    setisLoading,
    visible,
    setvisible,
    handleClose
  }
}

export default useCustomHook