import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
      'force new connection': true,
      reconnectionAttempt: 'Infinity',
      timeout: 10000,
      transports: ['websocket'],
  };
  try {
      const socket = io('http://localhost:5000', options);
      await new Promise((resolve) => socket.on('connect', resolve));
      console.log("Socket connected successfully");
      return socket;
  } catch (error) {
      console.error("Error connecting to socket:", error);
      throw error;
  }
}