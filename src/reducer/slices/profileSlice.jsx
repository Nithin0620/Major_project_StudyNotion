import {createSlice} from "@reduxks/toolkit"

const initialState = {
   User: null,
}

const profileSlice = createSlice({
   name:"profile",
   initialState : initialState,
   reducers:{
      setUser(state,value){
         state.User = value.payload;
      }
   }
})

export const{setUser} = profileSlice.actions;

export default profileSlice.reducer;