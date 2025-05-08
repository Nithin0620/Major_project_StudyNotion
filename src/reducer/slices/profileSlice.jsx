import {createSlice} from "@reduxjs/toolkit"

const initialState = {
   user: localStorage.getItem("user") 
      ? JSON.parse(localStorage.getItem("user")) 
      : null,
}

const profileSlice = createSlice({
   name:"profile",
   initialState: initialState,
   reducers:{
      setUser(state, value){
         state.user = value.payload;
         // Save user to localStorage when it changes
         if(value.payload) {
            localStorage.setItem("user", JSON.stringify(value.payload));
         } else {
            localStorage.removeItem("user");
         }
      }
   }
})

export const {setUser} = profileSlice.actions;

export default profileSlice.reducer;