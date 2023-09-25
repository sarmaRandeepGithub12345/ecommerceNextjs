import React from 'react'
import { IconButton } from '@mui/material'
import { AiFillEdit } from 'react-icons/ai'
const EachItem = ({
    num,item,dispatch:funcDispatch
}) => {
  //console.log(item)
  return (
    <div className="Name flex items-center flex-row text-[13px]">
          <p className="w-[30%] flex justify-between items-center">
            <span className="text-[13px]">{item.displayName}</span>
            <span className='text-[15px] font-bold'>:</span>
          </p>
          <span className="w-[55%] pl-[20px]">{item.value}</span>
          <IconButton sx={{
            
          }}>
               <AiFillEdit />
          </IconButton>
    </div>
  )
}

export default EachItem