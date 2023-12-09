const editorReducer = (state = "", action) => {
    switch (action.type) {
      case "SET_EDITOR_CONTENT":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default editorReducer;
  