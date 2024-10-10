import "./Color.css";
import { useState, useEffect } from "react";

export default function Color({ color, onDeleteColor }) {
  const [cancelButtonStatus, setCancelButtonStatus] = useState(false);

  function handleDeleteClick() {
    // console.log("del button clicked");
    onDeleteColor(cancelButtonStatus);
  }

  function showHideCancelButton() {
    setCancelButtonStatus(!cancelButtonStatus);
  }

  // useEffect(() => {
  //   console.log(cancelButtonStatus);
  // }, []);

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <button
        onClick={() => {
          showHideCancelButton();
          handleDeleteClick();
        }}
      >
        DELETE
      </button>
      {cancelButtonStatus === false ? (
        ""
      ) : (
        <button
          onClick={() => {
            showHideCancelButton();
          }}
        >
          CANCEL
        </button>
      )}
    </div>
  );
}
