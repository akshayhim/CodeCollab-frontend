/* eslint-disable react/prop-types */
import CodeMirror from "codemirror";
import { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      editorRef.current = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "neat",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit("code-change", {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("code-change", ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off("code-change");
    };
  }, [socketRef.current]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
