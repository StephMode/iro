import "./Color.css";
import { useState, useEffect } from "react";

export default function Color({ color, onDeleteColor }) {
  const [cancelButtonStatus, setCancelButtonStatus] = useState(false);

  function handleClick() {
    console.log("delete button clicked");
  }

  function showHideCancelButton() {
    setCancelButtonStatus(!cancelButtonStatus);
    console.log("delete button clicked and should do something with CANCEL");
  }

  useEffect(() => {
    console.log(cancelButtonStatus);
  });

  // const button = <button></button>;

  // (click) => {
  //   click === true ? (
  //     <>
  //       <button>CANCEL</button>
  //       <button>DELETE</button>
  //     </>
  //   ) : (
  //     <button>DELETE</button>
  //   );
  // };

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
          onDeleteColor;
          handleClick();
          showHideCancelButton();
        }}
      >
        DELETE
      </button>
      {cancelButtonStatus === false ? (
        ""
      ) : (
        <button onClick={handleClick}>CANCEL</button>
      )}
    </div>
  );
}
