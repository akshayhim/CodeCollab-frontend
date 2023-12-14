import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import { getToken } from "../utils/auth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const jwtToken = getToken();
  console.log(jwtToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(credentials));
    } catch (error) {
      setError(error.message || "Invalid email or password.");
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-md p-8 max-w-sm"
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            required
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 font-sans"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500 font-sans"
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white rounded-md py-2 px-4 focus:outline-none focus:shadow-outline-red"
        >
          Login
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
