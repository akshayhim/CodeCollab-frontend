import CodeMirror from "codemirror";
import { useEffect } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

const Editor = () => {
  useEffect(() => {
    // Initialize CodeMirror
    const editor = CodeMirror.fromTextArea(
      document.getElementById("realtimeEditor"),
      {
        mode: { name: "javascript", json: true },
        theme: "neat",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        lineWrapping: true,
      }
    );

    // Cleanup function to destroy CodeMirror instance
    return () => {
      editor.toTextArea(); // Remove the editor and restore the original textarea
    };
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
