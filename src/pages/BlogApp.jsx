import { PenSquare, User2, Calendar, Edit, Trash2, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, deleteBlog, logout, updateBlog } from "../features/BlogSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const BlogApp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector(
    (state) => state.blog.blogs
  );

  const currentUser = useSelector(
    (state) => state.blog.currentUser
  );


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editBlog, setEditBlog] = useState(null)

  

  function handleAddBlog(e) {

    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please write a Task")
      return;
    }

    const blog = {
      id: Date.now(),

      title,

      content,

      author: currentUser?.username,

      date: new Date().toLocaleDateString(),
    };

    dispatch(addBlog(blog));

    toast.success("Blog added successfully!");

    setTitle("");
    setContent("");
  }

  function handleUpdateBlog(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please write a Task")
      return;
    }

    const upadteBlog = {
      id: editBlog,

      title,

      content,

      author: currentUser?.username,

      date: new Date().toLocaleDateString(),
    };
    
    dispatch(updateBlog(upadteBlog));
    setContent('');
    setTitle('');
    toast.success("Blog Update successFully")
  }

  function handleDeletBlog(id){

    dispatch(deleteBlog(id));
    console.log(("Workinggg"));
    
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-white px-6 py-6">

      <div className="max-w-7xl mx-auto h-full flex flex-col">


        <div className="mb-6">

          <h1 className="text-5xl font-bold mb-2">
            Blog App
          </h1>

          <p className="text-slate-400">
            Write and share your thoughts
          </p>
          
          <LogOutIcon onClick={()=>{dispatch(logout()); navigate("/blogapp/login");}} className="cursor-pointer hover:text-red-400 transition absolute top-8 right-20" />
        </div>


        <div className="grid grid-cols-[360px_1fr] gap-6 flex-1 overflow-hidden">

          <div className="sticky top-0 h-fit">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">


              <div className="flex items-center gap-3 mb-6">

                <div className="bg-slate-800 p-3 rounded-2xl">
                  <PenSquare size={22} />
                </div>

                <h2 className="text-2xl font-semibold">
                  Create Blog
                </h2>
              </div>


              <form
                onSubmit={editBlog === null ? handleAddBlog : handleUpdateBlog}
                className="flex flex-col gap-4"
              >

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Blog title"
                  className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl outline-none focus:border-white transition"
                />

                <textarea
                  rows="8"
                  value={content}
                  onChange={(e) =>
                    setContent(e.target.value)
                  }
                  placeholder="Write something..."
                  className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl resize-none outline-none focus:border-white transition"
                />

                <button
                  type="submit"
                  className="bg-white text-black py-3 rounded-2xl font-semibold hover:opacity-90 transition"
                >
                  {editBlog === null ? "Publish Blog" : "Update Blog"}
                </button>
              </form>
            </div>
          </div>


          <div
            className="
              overflow-y-auto
              pr-2
              flex
              flex-col
              gap-5
              scroll-smooth

              [-ms-overflow-style:none]
              [scrollbar-width:none]

              [&::-webkit-scrollbar]:hidden
            "
          >

            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
                >


                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                        <User2 size={20} />
                      </div>
                      <div>

                        <h3 className="font-medium capitalize">
                          {blog.author}
                        </h3>

                        <div className="flex items-center gap-2 text-slate-400 text-sm">

                          <Calendar size={14} />

                          {blog.date}
                        </div>
                      </div>
                    </div>
                    <div>
                      {
                        currentUser?.username === blog.author && (

                          <div className="text-slate-400 flex items-center gap-4 text-sm cursor-pointer">
                            <span onClick={()=>{setEditBlog(blog.id);setContent(blog.content);setTitle(blog.title)}} className="flex items-center gap-2 hover:text-green-300 transition">
                              <Edit size={16} /> Edit
                            </span>
                            <span onClick={()=>{handleDeletBlog(blog.id)}} className="flex items-center gap-2 hover:text-red-400 transition">
                              <Trash2 size={16} /> Delete
                            </span>
                          </div>
                        )
                      }
                    </div>
  
                  </div>


                  <h2 className="text-3xl font-bold mb-3 capitalize">
                    {blog.title}
                  </h2>

                  <p className="text-slate-400 capitalize leading-relaxed">
                    {blog.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-xl">
                No Blogs Yet 🚀
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogApp;