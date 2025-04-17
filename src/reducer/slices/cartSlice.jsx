import {createSlice} from "@reduxjs/toolkit"
import {toast} from "react-hot-toast"

const initialState = {
   cart:localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")): [],

   total : localStorage.getItem("total")?JSON.parse (localStorage.getItem("total")):0,

   totalItems : localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")):0,
}

const cartSlice = createSlice({
   name:"Cart",
   initialState : initialState,
   reducers :{
      addToCart :(state,value)=>{
         const course = value.payload;
         const index= state.cart.findIndex((item)=> item._id === course._id)

         if(index>=0){
            toast.error("Course already added in the cart")
            return
         }

         state.cart.push(course)

         state.totalItems++;
         state.total += course.price;

         localStorage.setItem("cart",JSON.stringify(state.cart))
         localStrorage.setItem("total",JSON.stringify(state.total))
         localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

         toast.success("Item added to Cart Successfully")
      },
      removeFromCart:(state,value)=>{
         const course = value.payload;
         const index= state.cart.findIndex((item)=> item._id === course._id)

         if(index>=0){
            // state.cart.push(course)

            state.totalItems--;
            state.total -= course.price;
            state.cart.splice(index,1)

            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStrorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

            toast.success("Item removed from Cart Successfully")
         }  
      },
      resetCart : (state)=>{
         state.cart = [];
         state.totalItems = 0;
         state.total = 0;

         localStorage.removeItem("cart")
         localStorage.removeItem("totalItems")
         localStorage.removeItem("total")
      },
   }
})


export const {addToCart,removeFromCart,resetCart} = cartSlice.actions

export default cartSlice.reducer