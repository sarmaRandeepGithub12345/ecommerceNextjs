import React from 'react'
import men2 from "../../images/mens2.jpg"
import Image from 'next/image'
const ProductImage = () => {
  return (
    <div className="Images  w-[100%] Thou:w-[40%] sevenHun:w-[100%] flex flex-col h-fit justify-center sevenHun:flex-row mt-[15px]">
          <div className="LittleImage flex flex-row justify-around sevenHun:flex-col sevenHun:w-[20%] sevenHun:justify-around sevenHun:items-center mb-[15px]">
            <Image
              alt="Product Image"
              priority={true}
              src={men2}
              width="auto"
              height="auto"
              className="w-[15%] sevenHun:w-[80%] h-[90px] EightFif:h-[90px] sevenHun:h-[70px]  cursor-pointer rounded-lg"
            />
            <Image
              alt="Product Image"
              priority={true}
              src={men2}
              width="auto"
              height="auto"
              className="w-[15%] sevenHun:w-[80%] h-[90px] EightFif:h-[90px] sevenHun:h-[70px]  cursor-pointer rounded-lg"
            />
            <Image
              alt="Product Image"
              priority={true}
              src={men2}
              width="auto"
              height="auto"
              className="w-[15%] sevenHun:w-[80%] h-[90px] EightFif:h-[90px] sevenHun:h-[70px]  cursor-pointer rounded-lg"
            />
          </div>
          <div className=" sevenHun:w-[80%] w-[100%] flex justify-center">
            <Image
              alt="Product_Image"
              priority={true}
              src={men2}
              width="auto"
              height="auto"
              className="w-[260px] EightHun:w-[250px] sevenHun:h-[350px] sevenHun:w-[100%] NineFif:w-[300px] EightHun:h-[400px] h-[400px]  "
            />
          </div>
        </div>
  )
}

export default ProductImage