import {createSlice} from "@reduxjs/toolkit"

// Create a safe localStorage getter function
const safeGetFromLocalStorage = (key) => {
   try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
   } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      localStorage.removeItem(key);
      return null;
   }
};

const initialState = {
   user: safeGetFromLocalStorage("user")
}

const profileSlice = createSlice({
   name: "profile",
   initialState: initialState,
   reducers: {
      setUser(state, action) {
         state.user = action.payload;
         // Save user to localStorage when it changes
         if(action.payload) {
            try {
               localStorage.setItem("user", JSON.stringify(action.payload));
               console.log("User set in localStorage:", action.payload);
            } catch (error) {
               console.error("Error setting user in localStorage:", error);
            }
         } else {
            localStorage.removeItem("user");
            console.log("User removed from localStorage");
         }
      }
   }
})

export const {setUser} = profileSlice.actions;

export default profileSlice.reducer;