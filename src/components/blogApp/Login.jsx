import { useDispatch, useSelector} from "react-redux"
import { Link, useNavigate } from "react-router"
import { login, register } from "../../features/BlogSlice"
import { Link2 } from "lucide-react"
import { toast } from "react-toastify"
import * as Yup from "yup";
import { useFormik } from "formik"



const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Enter email address"),

  password: Yup.string()
    .min(6, "Password must be 6 characters")
    .required("Enter your password"),
});

const Login = () => {

    const dispatch = useDispatch();
    const users = useSelector((state)=>state.blog.users);
    const navigate = useNavigate();
  
    const {values,handleChange,handleSubmit,errors,touched,} = useFormik(
        {
        initialValues: {
          email: "",
          password: "",
        },
    
        validationSchema,
    
        onSubmit: (user,{resetForm}) => {

          const userExists = users.some((u) => u.email === user.email && u.password === user.password);

          if (!userExists) {
            toast.error("Invalid credentials");
            return;
          }

          dispatch(login(user));

          toast.success("Login successful", {
            position: "top-right",
            autoClose: 3000,
          });
          resetForm();
          navigate("/blogapp/home");
        },
      });

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold text-white mb-4">
                    Login 📝
                </h1>
            </div>
        </div>
        <div className="max-w-7xl w-96 mx-auto bg-slate-800 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4">
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
                    Login
                </button>
            </form>
            <Link to="/blogapp" className="flex items-center justify-center mt-4 text-sm text-blue-400 hover:text-blue-500">
                <Link2 className="mr-1" size={16} />
                Already have an account? Register
            </Link>
        </div>
    </div>
  )
}


export default Login