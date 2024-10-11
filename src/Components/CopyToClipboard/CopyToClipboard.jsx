// import "./CopyToClipBoardButton.css";

import { useEffect, useState } from "react";

export default function CopyToClipboard({ hexValue }) {
  const [successMessage, setSuccessMessage] = useState(false);
  //   const [clipBoardText, setClipBoardText] = useState(hexValue);

  const clipBoardText = hexValue;

  async function writeClipBoard() {
    try {
      await navigator.clipboard.writeText(clipBoardText);
    } catch (error) {
      console.log("error");
    }
  }

  function handleCopyButtonClick() {
    setSuccessMessage(true);
    writeClipBoard();
  }

  function hideSuccessMessage() {
    setSuccessMessage(false);
  }

  useEffect(() => {
    let interval = setInterval(hideSuccessMessage, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (successMessage === false) {
    return (
      <button
        className="color-card--button"
        onClick={() => {
          handleCopyButtonClick();
        }}
      >
        📋 Copy
      </button>
    );
  }

  if (successMessage === true) {
    return <button className="color-card--button">✅ Copied!</button>;
  }
}

/*

Alternative to tern op:

try to use several if condition bound return statements
to make 

return (
    <>
      {successMessage === false ? (
        <button onClick={handleCopyButtonClick}>📋 Copy</button>
      ) : (
        <button>✅ Copied!</button>
      )}
    </>
  );


*/
