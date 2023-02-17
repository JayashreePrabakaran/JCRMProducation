import {createSlice} from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: "user",
    initialState:{},
    reducers: {
        userData : (state, action) => {
            state = {...state, ...action.payload}
            return state
        } 
    }
})

export const {userData} = userSlice.actions;
export default userSlice.reducer;