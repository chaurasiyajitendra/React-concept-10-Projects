import { createSlice }  from "@reduxjs/toolkit";
import { use } from "react";


const initialState ={
    users:JSON.parse(localStorage.getItem('users')) || [],
    currentUser:JSON.parse(localStorage.getItem('currentUser')) || [],
    blogs:JSON.parse(localStorage.getItem('blogs')) || [],
}
const blogSlice =  createSlice({
    name:'blog',
    initialState,
    reducers:{
        register:(state,action)=>{
            const user = action.payload;
            state.users.push(user);
            localStorage.setItem("users",JSON.stringify(state.users));
        },
        login:(state,action)=>{
            const {email,password} = action.payload;
            const user = state.users.find((user)=>
                user.email === email &&
                user.password === password
            );

            if(user)
            {
                state.currentUser = user;
                localStorage.setItem("currentUser",JSON.stringify(state.currentUser));
            }
        },
        addBlog:(state,action)=>{
            const blog = action.payload;
            state.blogs.push(blog);
            localStorage.setItem("blogs",JSON.stringify(state.blogs));
        }
    }
})

export const {register,login,addBlog} = blogSlice.actions
export default blogSlice.reducer