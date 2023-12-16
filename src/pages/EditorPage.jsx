import { useState, useRef, useEffect } from "react";
import Client from "../components/Client";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { toast, Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/auth";

const EditorPage = () => {
  const token = getToken();
  const codeRef = useRef(null);
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

      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== decoded.username) {
          toast.success(`${username} joined the room.`);
        }
        setClients(clients);
        socketRef.current.emit("sync-code", {
          code: codeRef.current,
          socketId,
        });
      });

      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
      socketRef.current.disconnect();
    };
  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room Id copied");
    } catch (err) {
      toast.error("Error in Copying Room Id");
      console.log(err);
    }
  };

  const leaveRoom = () => {
    reactNavigator("/");
  };

  if (!decoded) {
    reactNavigator("/");
  }

  return (
    <div className="flex flex-row">
      {/* Aside component */}
      <div className="w-28 md:w-48 bg-gradient-to-b from-white from-40% to-red-100 to-800% flex flex-col justify-between flex-shrink-0 h-[calc(100vh-4.65rem)] items-center">
        <div className="flex flex-col items-center justify-start px-4 pt-4">
          <h3 className="underline mb-2">Participants</h3>
          {/* Client List */}
          <div>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        {/* mobile buttons */}
        <div className="flex flex-col items-center justify-start pb-4 md:hidden w-24 ">
          <button
            onClick={copyRoomId}
            className="mb-4 bg-black/[.85] text-white rounded-lg px-4 py-2 font-sans"
          >
            Copy Room ID
          </button>
          <button
            onClick={leaveRoom}
            className="bg-black/[.85] text-white rounded-lg px-6 py-2 font-sans"
          >
            Leave Room
          </button>
        </div>

        {/* laptop buttons */}
        <div className="flex-col items-center justify-end pb-4 hidden md:flex">
          <button
            onClick={copyRoomId}
            className="mb-4 bg-black/[.85] text-white rounded-lg px-4 py-2 font-sans"
          >
            Copy Room ID
          </button>
          <button
            onClick={leaveRoom}
            className="bg-black/[.85] text-white rounded-lg px-6 py-2 font-sans"
          >
            Leave Room
          </button>
        </div>
      </div>
      {/* Editor Part */}
      <div className="flex-grow overflow-hidden h-[calc(100vh-4.65rem)]">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default EditorPage;
