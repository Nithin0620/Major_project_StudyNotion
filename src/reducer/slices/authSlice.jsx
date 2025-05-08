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

// Fixed initial state with safe localStorage access
const initialState = {
   signupData: null,
   loading: false,
   token: safeGetFromLocalStorage("token")
};

const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {
      setSignupData(state, action) {
         state.signupData = action.payload;
      },
      setLoading(state, action) {
         state.loading = action.payload;
      },
      setToken(state, action) {
         state.token = action.payload;
         if (action.payload) {
            try {
               localStorage.setItem("token", JSON.stringify(action.payload));
               console.log("Token set in localStorage:", action.payload);
            } catch (error) {
               console.error("Error setting token in localStorage:", error);
            }
         } else {
            localStorage.removeItem("token");
            console.log("Token removed from localStorage");
         }
      }
   }
})

export const {setSignupData, setLoading, setToken} = authSlice.actions;

export default authSlice.reducer;