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

  // alternative syntax here: if (!successMessage) {…}, alternatively a lovely ternary op
  if (successMessage === false) {
    return (
      <button
        className="color-card--button"
        onClick={() => {
          handleCopyButtonClick();
        }}
      >
        📋
      </button>
    );
  }
  // second if statement not necessary, because it's bascially the else statement
  if (successMessage === true) {
    return <button className="color-card--button">✅</button>;
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
