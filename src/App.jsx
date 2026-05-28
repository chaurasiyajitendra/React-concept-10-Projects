import { Route, Routes } from "react-router";

import Home from "./pages/Home";
import FormValidation from "./pages/FormValidation";
import MovieReview from "./pages/MovieReview";
import QuizGame from "./pages/QuizGame";
import RecipeFinder from "./pages/RecipeFinder";
import WeatherDashboard from "./pages/WeatherDashboard";
import TodoList from "./pages/TodoList";
import { ToastContainer } from "react-toastify";
import Login from "./components/blogApp/Login";
import Register from "./components/blogApp/Register";
import BlogRouting from "./services/BlogRouting";
import BlogApp from "./pages/BlogApp";
import ProtectedRoute from "./components/blogApp/ProtectedRoute";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/formvalidation" element={<FormValidation />} />
        <Route path="/moviereview" element={<MovieReview />} />

        <Route path="/blogapp" element={<BlogRouting/>}> 
          <Route index element={<Register />} />         
          <Route path="login" element={<Login />} />
          <Route path="home" element={<ProtectedRoute><BlogApp /></ProtectedRoute>} />
        </Route>

        <Route path="/quizgame" element={<QuizGame />} />
        <Route path="/recipefinder" element={<RecipeFinder />} />
        <Route path="/weather" element={<WeatherDashboard />} />
      </Routes>
    </>
  );
};

export default App;