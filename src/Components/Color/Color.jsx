import "./Color.css";
import { useState, useEffect } from "react";

export default function Color({ color, onDeleteColor }) {
  const [cancelButtonStatus, setCancelButtonStatus] = useState(false);
  // state for showConfirm
  const [showConfirm, setShowConfirm] = useState(false);

  function handleDeleteConfirm() {
    // onDeleteColor(cancelButtonStatus); // this only displays clicked-status of delete btn
    onDeleteColor(color.id); // this is what we will need in order to pass ID of clicked color
  }

  function handleDeleteClick() {
    setShowConfirm(true);
  }

  function cancelDelete() {
    setShowConfirm(false);
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

      <div className="button-container">
        {!showConfirm ? (
          <button onClick={handleDeleteClick}>DELETE</button>
        ) : (
          <div className="buttons-container--confirm-message">
            <p>Really delete?</p>
            <button onClick={cancelDelete}>CANCEL</button>
            <button onClick={handleDeleteConfirm}>DELETE</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* My previous logic for DELETE/CANCEL btn

<div>
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

*/
