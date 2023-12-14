import { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch and useSelector hooks
// import { Navigate, json } from "react-router-dom"; // Import useRouter hook
// import { register, saveToken } from "../utils/auth";
import { registerUser } from "../../redux/actions/userActions"; // Import registerUser action creator
// import { jwtDecode } from "jwt-decode";
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


  return (
    <div className="flex justify-center mt-16 h-[calc(100vh-11.16rem)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-md p-8 max-w-sm"
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            required
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            required
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white rounded-md py-2 px-4 focus:outline-none focus:shadow-outline-red"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
