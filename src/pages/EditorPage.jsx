import { useState, useRef, useEffect } from "react";
import Client from "../components/Client";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";

const EditorPage = () => {
  const user = useSelector((state) => state.user);
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const reactNavigator = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        socketRef.current = await initSocket();
        // console.log("Socket connected successfully");
        toast.success("Socket connection established", {
          toastId: "socket-success",
        });

        // Emit the "join" event only after the socket connection is established
        socketRef.current.emit("join", {
          roomId,
          username: user?.user.username,
        });
      } catch (error) {
        console.error("Error connecting to socket:", error);
        toast.error("Socket Connection Failed");
        reactNavigator("/");
      }
    };

    init();
  }, [roomId, user, reactNavigator]);

  const [clients, setClients] = useState([
    { socketId: 1, username: "John Doe" },
    { socketId: 2, username: "test test" },
  ]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-row">
      {/* Aside component */}
      <div className="w-48 bg-gradient-to-b from-white to-red-100 flex flex-col justify-between flex-shrink-0">
        <div className="flex flex-col items-center justify-start px-4 pt-4">
          <h3 className="underline mb-2">Participants</h3>
          {/* Client List */}
          <div>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-end pb-4">
          <button className="mb-4 bg-black/[.85] text-white rounded-lg px-4 py-2 font-sans">
            Copy Room ID
          </button>
          <button className="bg-black/[.85] text-white rounded-lg px-6 py-2 font-sans">
            Leave Room
          </button>
        </div>
      </div>
      {/* Editor Part */}
      <div className="flex-grow overflow-hidden">
        <Editor />
      </div>
      <Toaster />
    </div>
  );
};

export default EditorPage;
