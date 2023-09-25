
import pic from "../images/mens2.jpg"
export const dataSample = [
  {
    itemId:1,
    imageUrl :"/../images/mens2.jpg",
    price: 1299,
    rating:4.2,
    ratingsCount : 4000,
    clothesName:"Jeans Shirt & Pant Pair"
  },
  {
    itemId:2,
    imageUrl :"/../images/mens2.jpg",
    price: 1200,
    rating:4.1,
    ratingsCount : 2000,
    clothesName:"Jeans Pant"
  },
  {
    itemId:3,
    imageUrl :"/../images/mens2.jpg",
    price: 800,
    rating:3.0,
    ratingsCount : 4000,
    clothesName:"Jeans Shirt & Pant Pair"
  },
  {
    itemId:4,
    imageUrl :"/../images/mens2.jpg",
    price: 199,
    rating:3.4,
    ratingsCount : 5000,
    clothesName:"Shirt & Pant "
  },
  {
    itemId:5,
    imageUrl :"/../images/mens2.jpg",
    price: 1299,
    rating:4.2,
    ratingsCount : 4000,
    clothesName:"Jeans Shirt & Pant Pair"
  },
  {
    itemId:6,
    imageUrl :"/../images/mens2.jpg",
    price: 1299,
    rating:4.2,
    ratingsCount : 4000,
    clothesName:"Jeans Shirt & Pant Pair"
  },
  {
    itemId:7,
    imageUrl :"/../images/mens2.jpg",
    price: 1299,
    rating:4.2,
    ratingsCount : 4000,
    clothesName:"Jeans Shirt & Pant Pair"
  },
  {
    itemId:8,
    imageUrl :"/../images/mens2.jpg",
    price: 19,
    rating:1.2,
    ratingsCount : 40,
    clothesName:"JPair"
  },
  {
    itemId:9,
    imageUrl :"/../images/mens2.jpg",
    price: 1299,
    rating:4.8,
    ratingsCount : 4000,
    clothesName:"Shirt"
  },
  {
    itemId:10,
    imageUrl :"/../images/mens2.jpg",
    price: 1299,
    rating:2.9,
    ratingsCount : 400,
    clothesName:"Jeans Shirt Pair"
  },
  {
    itemId:11,
    imageUrl :"/../images/mens2.jpg",
    price: 129,
    rating:1.0,
    ratingsCount : 4000,
    clothesName:"Jeans Shirt & Pant Pair"
  },
  {
    itemId:12,
    imageUrl :"/../images/mens2.jpg",
    price: 299,
    rating:2.2,
    ratingsCount : 4000,
    clothesName:" Shirt & Pant Pair"
  },


]
export const getLocalItem = (key)=>{
  return JSON.parse(localStorage.getItem(key))
}
export const setLocalItem = (key,value)=>{
  return localStorage.setItem(key,JSON.stringify(value))
}