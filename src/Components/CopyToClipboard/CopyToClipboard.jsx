import { useEffect, useState } from "react";

export default function CopyToClipboard({ hexValue }) {
  const [successMessage, setSuccessMessage] = useState(false);

  const clipBoardText = hexValue; // I could add the hexValue as argument in the writeClipboard fn instead of storing it in a separate var

  async function writeClipBoard() {
    try {
      await navigator.clipboard.writeText(clipBoardText);
    } catch (error) {
      console.error("error");
    }
  }

  function handleCopyButtonClick() {
    setSuccessMessage(true);
    writeClipBoard();
  }

  function hideSuccessMessage() {
    setSuccessMessage(false);
  }

  // instead of hideSuccessMessage as encapsulation of set fn, I could use => arrow fn to call set fn on the useEffect directly
  useEffect(() => {
    let interval = setInterval(hideSuccessMessage, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {!successMessage ? (
        <button
          className="color-card--button"
          onClick={() => {
            handleCopyButtonClick();
          }}
        >
          📋
        </button>
      ) : (
        <div
          style={{
            display: "inline-block",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "green",
            width: "50px",
            height: "30px",
          }}
        >
          Saved
        </div>
      )}
    </>
  );
}
