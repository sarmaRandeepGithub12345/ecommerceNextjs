import Landing from '@/components/LandingPage/Landing'
import {cookies} from "next/headers"
const Page = () => {
  console.log(cookies()) 
  return (
    <>
    <Landing/>
    </>
  )
}

export default Page