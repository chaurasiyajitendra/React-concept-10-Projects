import { configureStore } from "@reduxjs/toolkit";
import todoSlice  from "../features/TodoListSlice";
import blogSlice from "../features/BlogSlice"

export const store = configureStore({
    reducer:{
        todo:todoSlice,
        blog:blogSlice
    }
});