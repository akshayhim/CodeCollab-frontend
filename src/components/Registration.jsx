import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector hooks
import { Navigate, json } from "react-router-dom"; // Import useRouter hook
// import { register, saveToken } from "../utils/auth";
import { registerUser } from "../../redux/actions/userActions"; // Import registerUser action creator
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/auth";

const Registration = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Get a reference to the dispatch function
  const jwtToken = getToken();
  console.log(jwtToken); // Get a reference to the user state
  // const decoded = jwtDecode(jwtToken);
  // Get a reference to the router object

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerUser(userData)); // Dispatch registerUser action with userData as argument
      // saveToken(response.token);
      // router.push("/dashboard"); // Redirect to dashboard after successful registration
    } catch (error) {
      setError(error.message || "An error occurred during registration.");
    }
  };

  // if (decoded) {
  //   console.log("User logged in: ", decoded.username);
  //   <Navigate to="/" />
  // }

  return (
    <div>
      <h1>Register</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
