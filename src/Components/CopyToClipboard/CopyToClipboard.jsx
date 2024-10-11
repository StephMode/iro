// import "./CopyToClipBoardButton.css";

import { useState } from "react";

export default function CopyToClipboard() {
  const [successMessage, setSuccessMessage] = useState(false);

  function handleCopyButtonClick() {
    setSuccessMessage(true);
  }

  if (successMessage === false) {
    return (
      <button className="color-card--button" onClick={handleCopyButtonClick}>
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
