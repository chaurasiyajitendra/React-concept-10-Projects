import { useDispatch, useSelector} from "react-redux"
import { Link } from "react-router"
import { register } from "../../features/BlogSlice"
import { Link2 } from "lucide-react"
import { toast } from "react-toastify"
import * as Yup from "yup";
import { useFormik } from "formik"



const validationSchema = Yup.object({
  username: Yup.string()
    .min(2, "Name too short")
    .max(25, "Name too long")
    .required("Enter your name"),

  email: Yup.string()
    .email("Invalid email")
    .required("Enter email address"),

  password: Yup.string()
    .min(6, "Password must be 6 characters")
    .required("Enter your password"),
});

const Register = () => {

    const dispatch = useDispatch();
    const users = useSelector((state)=>state.blog.users);
    

    function userExist(email) {
        return users?.some(
            (user) => user.email === email
        );
    }
    

    const {values,handleChange,handleSubmit,errors,touched,} = useFormik(
        {
        initialValues: {
          username: "",
          email: "",
          password: "",
        },
    
        validationSchema,
    
        onSubmit: (user,{resetForm}) => {

          const exist = userExist(user.email);

          if (exist) {
                toast.error("User already exists");
                return;
          }

          dispatch(register(user));

          toast.success("Account created successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          resetForm();
          
        },
      });

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold text-white mb-4">
                    Register 📝
                </h1>
            </div>
        </div>
        <div className="max-w-7xl w-96 mx-auto bg-slate-800 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-white mb-3">
                        Username
                    </label>
                    <input
                        type="text"
                        value={values.username}
                        name="username"
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.username && touched.username ? (<span className="text-red-400 text-sm px-1">{errors.username}</span>) : null}
                </div>
                <div>
                    <label className="block text-sm font-medium text-white mb-3">
                        Email
                    </label>
                    <input
                        type="email"
                        value={values.email}
                        name="email"
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && touched.email ? (<span className="text-red-400 text-sm px-1">{errors.email
                        }</span>) : null}
                </div>
                <div>
                    <label className="block text-sm font-medium text-white mb-3">
                        Password
                    </label>
                    <input
                        type="password"
                        value={values.password}
                        name="password"
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && touched.password ? (<span className="text-red-400 text-sm px-1">{errors.password}</span>) : null}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                    Register
                </button>
            </form>
            <Link to="/blogapp/login" className="flex items-center justify-center mt-4 text-sm text-blue-400 hover:text-blue-500">
                <Link2 className="mr-1" size={16} />
                Already have an account? Login
            </Link>
        </div>
    </div>
  )
}

export default Register
