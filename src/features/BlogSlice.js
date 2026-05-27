import { createSlice }  from "@reduxjs/toolkit";


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
        logout:(state)=>{
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        },
        addBlog:(state,action)=>{
            const blog = action.payload;
            state.blogs.push(blog);
            localStorage.setItem("blogs",JSON.stringify(state.blogs));
        },
        updateBlog:(state,action)=>{
            const updatedBlog = action.payload;
            const index = state.blogs.findIndex((blog)=>blog.id === updatedBlog.id);    
            if(index !== -1)
            {
                state.blogs[index] = updatedBlog;
                localStorage.setItem("blogs",JSON.stringify(state.blogs));
            }
        },
        deleteBlog:(state,action)=>{
            const blogId = action.payload;
            state.blogs = state.blogs.filter((blog) => blog.id !== blogId);
            localStorage.setItem("blogs",JSON.stringify(state.blogs));
        }
    }
})

export const {register,login,logout,addBlog,updateBlog,deleteBlog} = blogSlice.actions
export default blogSlice.reducer