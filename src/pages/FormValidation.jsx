import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name too short")
    .max(25, "Name too long")
    .required("Enter your name"),

  email: Yup.string()
    .email("Invalid email")
    .required("Enter email address"),

  password: Yup.string()
    .min(6, "Password must be 6 characters")
    .required("Enter your password"),

  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

  date: Yup.date()
    .required("Select your date of birth")
    .min(new Date(1900, 0, 1), "Date cannot be before Jan 1, 1900")
    .max(new Date(), "Date cannot be in the future")
    .test(
      "age",
      "You must be at least 18 years old",
      function (value) {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      }
    ),
  
  adhar: Yup.string()
    .matches(/^\d{12}$/, "Aadhaar number must be 12 digits")
    .required("Enter your Aadhaar number"), 

});

const FormValidation = () => {
  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      date: "",
      adhar: "",
    },

    validationSchema,

    onSubmit: () => {
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 flex items-center justify-center px-4 py-10">
      
      <div className="absolute w-[300px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full top-0 left-0"></div>
      <div className="absolute w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full bottom-0 right-0"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)] rounded-[32px] p-8 flex flex-col gap-4"
      >
        <div className="text-center mb-3">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Create Account
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Join and start your journey
          </p>
        </div>

        {/* NAME */}
        <div className="flex flex-col gap-1">
          <input
            className={`w-full bg-white/5 border ${
              errors.name && touched.name
                ? "border-red-500"
                : "border-white/10"
            } text-white placeholder:text-slate-500 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            type="text"
            placeholder="Enter your name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.name && touched.name ? (
            <span className="text-red-400 text-sm px-1">
              {errors.name}
            </span>
          ) : null}
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <input
            className={`w-full bg-white/5 border ${
              errors.email && touched.email
                ? "border-red-500"
                : "border-white/10"
            } text-white placeholder:text-slate-500 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.email && touched.email ? (
            <span className="text-red-400 text-sm px-1">
              {errors.email}
            </span>
          ) : null}
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-1">
          <input
            className={`w-full bg-white/5 border ${
              errors.password && touched.password
                ? "border-red-500"
                : "border-white/10"
            } text-white placeholder:text-slate-500 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.password && touched.password ? (
            <span className="text-red-400 text-sm px-1">
              {errors.password}
            </span>
          ) : null}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="flex flex-col gap-1">
          <input
            className={`w-full bg-white/5 border ${
              errors.confirmPassword && touched.confirmPassword
                ? "border-red-500"
                : "border-white/10"
            } text-white placeholder:text-slate-500 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.confirmPassword && touched.confirmPassword ? (
            <span className="text-red-400 text-sm px-1">
              {errors.confirmPassword}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <input
            className={`w-full bg-white/5 border ${
              errors.adhar && touched.adhar
                ? "border-red-500"
                : "border-white/10"
            } text-white placeholder:text-slate-500 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            type="password"
            name="adhar"
            placeholder="Enter your Aadhaar number"
            value={values.adhar}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.adhar && touched.adhar ? (
            <span className="text-red-400 text-sm px-1">
              {errors.adhar}
            </span>
          ) : null}
        </div>



        <div className="flex flex-col gap-1">
          <input
            className={`w-full bg-white/5 border ${
              errors.date && touched.date
                ? "border-red-500"
                : "border-white/10"
            } text-white placeholder:text-slate-500 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
            type="date"
            name="date"
            placeholder="date"
            value={values.date}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {errors.date && touched.date ? (
            <span className="text-red-400 text-sm px-1">
              {errors.date}
            </span>
          ) : null}
        </div>

        <button
          className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-white font-semibold py-3 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default FormValidation