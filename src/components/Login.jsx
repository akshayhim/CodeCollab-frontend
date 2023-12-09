import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector hooks
import { Navigate } from "react-router-dom";  // Import useRouter hook
// import { login, saveToken } from "../utils/auth";
import { loginUser } from "../../redux/actions/userActions"; // Import loginUser action creator

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Get a reference to the dispatch function
  const user = useSelector((state) => state.user); // Get a reference to the user state // Get a reference to the router object

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(credentials)); // Dispatch loginUser action with credentials as argument
      // saveToken(response.token);
      // router.push("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      setError(error.message || "Invalid email or password.");
    }
  };

  if (user) {
    console.log("User logged in: ", user.username);
    <Navigate to="/" />
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
