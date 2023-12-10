import { useState, useRef, useEffect } from "react";
import Client from "../components/Client";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { toast, Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/auth";

const EditorPage = () => {
  const token = getToken();
  console.log(token);
  const decoded = jwtDecode(token);
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

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
          username: decoded.username,
        });
      } catch (error) {
        console.error("Error connecting to socket:", error);
        console.log({ decoded });
        toast.error("Socket Connection Failed");

        reactNavigator("/");
      }

      socketRef.current.on("join", ({ clients, username, socketId }) => {
        if (username !== decoded.username) {
          toast.success(`${username} joined the room.`);
        }
        setClients(clients);
      });
    };
    init();
  }, [roomId, reactNavigator]);

  if (!decoded) {
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
