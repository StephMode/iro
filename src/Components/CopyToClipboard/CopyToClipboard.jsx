import { useEffect, useState } from "react";
import Button from "../Button/Button";

export default function CopyToClipboard({ hexValue }) {
  const [successMessage, setSuccessMessage] = useState(false);

  async function writeClipBoard(hexValue) {
    try {
      await navigator.clipboard.writeText(hexValue);
    } catch (error) {
      console.error("error");
    }
  }

  function handleCopyButtonClick() {
    setSuccessMessage(true);
    writeClipBoard(hexValue);
  }

  useEffect(() => {
    let interval = setInterval(() => setSuccessMessage(false), 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {!successMessage ? (
        <Button
          buttonType="copy"
          onClick={() => {
            handleCopyButtonClick();
          }}
        />
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
