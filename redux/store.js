import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // Import thunk middleware
import userReducer from "./reducers/userReducer";
import editorReducer from "./reducers/editorReducer";

const reducer = {
  user: userReducer,
  editorContent: editorReducer,
  // Add more reducers as needed
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk), // Add thunk middleware to the array
});

export default store;