import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
            if(value.payload){
                try{
                    localStorage.setItem("user",JSON.stringify(value.payload));
                    console.log("user set successfully in localstorage");
                }
                catch(e){
                    console.log("error in setting user in localstorage",e.message);
                }
            }

        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    },
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;