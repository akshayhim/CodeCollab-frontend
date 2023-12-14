import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const JoinRoom = () => {
  const navigate = useNavigate();

  const joinaroom = (meetingId) => {
    meetingId
      ? navigate(`/editor/${meetingId}`)
      : toast.error("Enter a valid room id");
  };

  return (
    <div className="flex flex-col items-center mt-36 h-[calc(100vh-7.16rem)]">
      <h1 className="text-4xl font-semibold mb-8">Join Room</h1>
      <div className="w-80 flex flex-col items-center space-y-4">
        <input
          type="text"
          id="meetingIdInput"
          placeholder="Enter Room ID"
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md transition duration-300"
          onClick={() => {
            const meetingId = document.getElementById("meetingIdInput").value;
            joinaroom(meetingId);
          }}
        >
          Join
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default JoinRoom;
