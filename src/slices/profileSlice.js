import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  loading: false,
  serverStartupMessage: false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
    setServerStartupMessage(state, value) {
      state.serverStartupMessage = value.payload
    },
  },
})

export const { setUser, setLoading, setServerStartupMessage } = profileSlice.actions

export default profileSlice.reducer
