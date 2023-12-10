import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import JoinRoom from "./pages/JoinRoom";
import Login from "./pages/login";
import Register from "./pages/register";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector hook
import { Navigate } from "react-router-dom"; // Import Navigate component
import { useEffect } from "react";
import { setUser } from "../redux/actions/userActions";
import { getToken } from "./utils/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getToken();

    if (token) {
      dispatch(setUser(token));
    }
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/editor/:roomId"
            element={
              // Check if user is logged in
              useSelector((state) => state.user) ? (
                // If yes, redirect to home page
                <EditorPage />
              ) : (
                // If not, render Register component
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={
              // Check if user is logged in
              useSelector((state) => state.user) ? (
                // If yes, redirect to home page
                <Navigate to="/" />
              ) : (
                // If not, render Login component
                <Login />
              )
            }
          ></Route>
          <Route
            path="/register"
            element={
              // Check if user is logged in
              useSelector((state) => state.user) ? (
                // If yes, redirect to home page
                <Navigate to="/" />
              ) : (
                // If not, render Register component
                <Register />
              )
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/joinroom"
            element={
              // Check if user is logged in
              useSelector((state) => state.user) ? (
                // If yes, redirect to home page
                <JoinRoom />
              ) : (
                // If not, render Register component
                <Navigate to="/login" />
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
