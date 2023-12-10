import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";


const JoinRoom = () => {
  const navigate = useNavigate();

  const joinaroom = (meetingId) => {
    navigate(`/editor/${meetingId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold mb-8">Join Room</h1>
      <div className="w-80 flex flex-col items-center space-y-4">
        <input
          type="text"
          id="meetingIdInput"
          placeholder="Enter Meeting ID"
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition duration-300"
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
