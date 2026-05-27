import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tasks: [],
}

export const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTask:(state,action)=>{
            state.tasks.push(action.payload);
        },
        deleteTask:(state,action) =>{
            state.tasks.splice(action.payload,1);
        },
        updateTask:(state,action)=>{
            const {updateTask ,index} = action.payload;
            // const updateTask = [...state]
            state.tasks[index] = updateTask
        }

    }
})

export const  {addTask,deleteTask,updateTask} = todoSlice.actions
export default todoSlice.reducer