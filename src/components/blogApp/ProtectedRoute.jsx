import { Link } from "react-router";


const ProtectedRoute = ({ children }) => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold">
          Please log in to access the blog app.
        </h1>
        <span className="text-slate-400 mt-2">
          You will be redirected to the <Link to="/blogapp/login" className="text-blue-500 hover:underline">
            login page
          </Link>.
        </span>
      </div>
    );
  } 
  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute
