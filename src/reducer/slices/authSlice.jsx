// import {createSlice} from "@reduxjs/toolkit"

// const initialState = {
//    signupData : null,
//    loading : false,
//    token: localStorage.getItem("token") 
//    ? JSON.parse(localStorage.getItem("token")) 
//    : null};


// const authSlice  = createSlice({
//    name:"auth",
//    initialState : initialState,
//    reducers : {
//       setSignupData(state , value){
//          state.signupData = value.payload;
//       },
//       setLoading(state , value){
//          state.loading = value.payload;
//       },
//       setToken(state,value){
//          state.token = value.payload;
//          if(value.payload){
//             localStorage.setItem("token",JSON.stringify(value.payload))
//          }
//          else {
//             localStorage.removeItem("token");
//          }
//       }

//    }
// })


// export const {setSignupData , setLoading , setToken} = authSlice.actions;

// export default authSlice.reducer;




import {createSlice} from "@reduxjs/toolkit"

// Fixed the initial state to safely handle localStorage token
const initialState = {
   signupData: null,
   loading: false,
   token: null
};

// Safely get token from localStorage
try {
   const storedToken = localStorage.getItem("token");
   if (storedToken) {
      initialState.token = JSON.parse(storedToken);
   }
} catch (error) {
   console.error("Error parsing token from localStorage:", error);
   // Remove invalid token from localStorage
   localStorage.removeItem("token");
}

const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {
      setSignupData(state, value) {
         state.signupData = value.payload;
      },
      setLoading(state, value) {
         state.loading = value.payload; // Fixed typo from payloadl to payload
      },
      setToken(state, value) {
         state.token = value.payload;
         if (value.payload) {
            localStorage.setItem("token", JSON.stringify(value.payload));
         } else {
            localStorage.removeItem("token");
         }
      }
   }
})

export const {setSignupData, setLoading, setToken} = authSlice.actions;

export default authSlice.reducer;