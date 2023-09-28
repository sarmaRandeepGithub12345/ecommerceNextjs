
import React from 'react'
import MobileSearchBox from '../MobileSearchBar/MobileSearchBox'

const HeaderComp = ({children}) => {
  return (
   <>
   <MobileSearchBox />
   {children}
   </>
  )
}

export default HeaderComp