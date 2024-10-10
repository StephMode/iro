import ColorEditor from "../ColorEditor/ColorEditor.jsx";
import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDeleteColor }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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

  function handleEditClick() {
    setShowEdit(true);
  }

  function cancelEdit() {
    setShowEdit(false);
  }

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

      <div className="color-card--button-container">
        {!showConfirm ? (
          <button className="color-card--button" onClick={handleDeleteClick}>
            🗑️ Delete
          </button>
        ) : (
          <div className="buttons-container--confirm-message">
            <p>Really delete?</p>
            <button className="color-card--button" onClick={cancelDelete}>
              ❌ Cancel
            </button>
            <button
              className="color-card--button"
              onClick={handleDeleteConfirm}
            >
              🗑️ Delete
            </button>
          </div>
        )}
        {!showEdit ? (
          <button className="color-card--button" onClick={handleEditClick}>
            🖍️ Edit
          </button>
        ) : (
          <div>
            <ColorEditor></ColorEditor>
            <button className="color-card--button" onClick={cancelEdit}>
              ❌ Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* My previous logic for DELETE/CANCEL btn

const [cancelButtonStatus, setCancelButtonStatus] = useState(false);

function showHideCancelButton() {
    setCancelButtonStatus(!cancelButtonStatus);
  }

  // useEffect(() => {
  //   console.log(cancelButtonStatus);
  // }, []);

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
