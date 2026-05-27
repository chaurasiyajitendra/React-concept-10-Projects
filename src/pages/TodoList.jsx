import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, updateTask } from "../features/TodoListSlice";
import { toast } from "react-toastify";
import { Plus, ClipboardList, Trash2, Pencil } from "lucide-react";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const tasks = useSelector((state) => state.todo.tasks);

  const dispatch = useDispatch();

  function handleAddTask(task) {
    if (!task.trim()) {
      toast.error("Please enter a task");
      return;
    }

    dispatch(addTask(task));

    toast.success("Task Added Successfully");

    setTask("");
  }

  function handleDeleteTAsk(index){
    dispatch(deleteTask(index))
    
    toast.success("Task Delete Successfully");
    setTask("");
  }

  function hnadleUpdateTask(task){
    if (!task.trim()) {
      toast.error("Please enter a task");
      return;
    }
    dispatch(updateTask({
      updateTask:task ,
      index:editIndex
    }))
    setTask('');
    toast.success("Task Update")
    setEditIndex(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col items-center justify-center px-4 py-10">
      
      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8">
        
        {/* Heading */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-cyan-500/20 p-3 rounded-2xl">
            <ClipboardList className="text-cyan-400" size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Todo List
            </h1>

            <p className="text-slate-400">
              Manage your daily tasks easily
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 bg-slate-900/60 border border-slate-700 text-white px-4 py-3 rounded-2xl outline-none focus:border-cyan-400 transition"
            placeholder="Enter your task..."
            type="text"
          />

          <button
            onClick={() => {editIndex == null ? handleAddTask(task) : hnadleUpdateTask(task)}}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <Plus size={20} />
            {editIndex == null ? "Add Task" : "Update Task" }
          </button>
        </div>

        {/* Task List */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-5">
          
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-white">
              Your Tasks
            </h2>

            <span className="bg-cyan-500/20 text-cyan-400 text-sm px-3 py-1 rounded-full">
              {tasks.length} Tasks
            </span>
          </div>

          {tasks.length > 0 ? (
            <div className="flex flex-col gap-3">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-white/5 border flex gap-2 items-center justify-between border-white/10 px-4 py-3 rounded-xl text-slate-200 hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-all"
                >
                  <p>
                    {task}
                  </p>
                  <div className="flex items-center gap-3 w-20">
                    <Pencil size={24} className=" hover:text-cyan-400" onClick={()=>{setEditIndex(index); setTask(tasks[index])}} />
                    <Trash2 size={24} className=" hover:text-red-500" onClick={()=>{handleDeleteTAsk(index)}} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500">
              No tasks added yet 🚀
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;