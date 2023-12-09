// import React from "react";
// import { NavbarDefault } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
// import { useState } from "react";
import { useSelector } from "react-redux";
// import toast from "react-hot-toast";

const Home = () => {
  // const [roomId, setRoomId] = useState("");

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const createNewRoom = () => {
    const roomId = nanoid(7);
    // toast.success("Created a new room");
    console.log(roomId);
    navigate(`/editor/${roomId}`);
  };

  return (
    <>
      <div className="text-3xl font-serif">
        Real-Time Collaborative Code Editor
      </div>
      <div className="mt-8">
        {/* <Link to="/editor/:roomId" unstable_viewTransition> */}
        <button
          className="bg-white border-red-300 border-2 font-semibold py-2 px-4 rounded-lg font-sans mr-4"
          onClick={() => (user ? createNewRoom() : navigate("/login"))}
        >
          Create Room
        </button>
        {/* </Link> */}
        <Link to="/joinroom" unstable_viewTransition>
          <button className="bg-white border-red-300 border-2 font-semibold py-2 px-4 rounded-lg font-sans">
            Join Room
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
