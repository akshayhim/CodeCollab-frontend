import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
// import { jwtDecode } from "jwt-decode";

const Home = () => {
  const token = useSelector((state) => state.user);
  // const decoded = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // Clear all toasts when the component unmounts
      toast.dismiss();
    };
  }, []);

  const joinRoom = () => {
    if (token) {
      navigate("/joinroom");
    } else {
      toast.error("You need to login first");
      setTimeout(() => {
        navigate("/login");
      }, 0);
    }
  };

  const createRoom = () => {
    if (token) {
      const roomId = nanoid(7);
      navigate(`/editor/${roomId}`);
    } else {
      toast.error("You need to Login First");
      setTimeout(() => {
        navigate("/login");
      }, 0);
    }
  };

  return (
    <>
      {/* ... (other elements) */}
      <button
        className="bg-white border-red-300 border-2 font-semibold py-2 px-4 rounded-lg font-sans mr-4"
        onClick={createRoom}
      >
        Create Room
      </button>
      <button
        className="bg-white border-red-300 border-2 font-semibold py-2 px-4 rounded-lg font-sans"
        onClick={joinRoom}
      >
        Join Room
      </button>
      <Toaster />
    </>
  );
};

export default Home;
