import axios from "axios"

export const logoutFunction=async ()=>{
    try {
        const response = await fetch(`/api/logout`,{
            method: 'GET', 
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
           
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
      
        }) 
        return response
    } catch (error) {
        
    }
}
export const loginUser = async(data)=>{
    try {
        const resp = await fetch('/api/login',{
            method:'POST',
            body:data
        })
        return resp
    } catch (error) {
        return error
    }
}
export const registerNewUser = async(data)=>{
  
    try {
        const resp = await fetch('/api/register',{
            method:'POST',
            body:data
        })
        resp
    
        return resp
    } catch (error) {
        return error
    }
}
export const addProductName =async (data)=>{
    //console.log(urls,finalObj,tagArray)
    //console.log(data)
    try {
        const resp = await fetch('/api/product',{
           
            method:'POST',
            
            body:data

        })
        
        return await resp.json()
        //const final = await 
        //return final
    } catch (error) {
        console.log(error)
    }
}
export const getOTPinEmail = async(email)=>{
    try {
        const resp = await fetch(`/api/otp?email=${email}`,{
           method:'GET',
            
        })
        return resp
    } catch (error) {
        return error
    }
}
export const verifyOTPinEmail = async(data)=>{
    try {
        const resp = await fetch('/api/otp',{
            method:'POST',
            body:data
        })
        return resp
    } catch (error) {
        return error
    }
}

export const editProfile = async(data)=>{
    try {
        const resp = await fetch('/api/editinfo',{
            method:'PATCH',
            body:data
        }) 
        return resp       
    } catch (error) {
        return error
    }
}