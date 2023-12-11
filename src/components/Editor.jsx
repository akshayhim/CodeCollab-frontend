/* eslint-disable react/prop-types */
import CodeMirror from "codemirror";
import { useDebugValue, useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    // Initialize CodeMirror
    editorRef.current = CodeMirror.fromTextArea(
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

    editorRef.current.on("change", (instance, changes) => {
      console.log("changes", changes);
      const { origin } = changes;
      const code = instance.getValue();
      if (origin !== "setValue") {
        socketRef.current.emit("code-change", {
          roomId,
          code,
        });
      }
      console.log(code);
    });

    return () => {
      Editor.toTextArea();
    };
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("code-change", ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
  }, [socketRef.current]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
