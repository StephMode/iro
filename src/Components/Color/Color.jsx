import "./Color.css";
import ContrastChecker from "../ContrastChecker/ContrastChecker.jsx";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard.jsx";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm.jsx";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  function handleDeleteConfirm() {
    onDeleteColor(color.id);
  }

  function handleEditColorConfirm(editedColorData) {
    onEditColor({id: color.id, ...editedColorData});
    cancelEdit();
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
      {showEdit === true ? (
          <div>
            <ColorForm
              isEdit={true}
              initialData={color}
              onEditColor={handleEditColorConfirm}
            />
            <button className="color-card--button" onClick={cancelEdit}>
              ❌ Cancel
            </button>
          </div>
        ) : (
          <>

            <h3 className="color-card-headline">{color.hex}</h3>
            <CopyToClipboard hexValue={color.hex} />
            <ContrastChecker color={color} />
            <h4>{color.role}</h4>
            <p>contrast: {color.contrastText}</p>
          
              {!showConfirm && (
              <>
              <button className="color-card--button" onClick={handleDeleteClick}>
                  🗑️ Delete
              </button>
              <button className="color-card--button" onClick={handleEditClick}>
                  🖍️ Edit
              </button>
              </>
            )}

            {showConfirm && (
              <div className="buttons-container--confirm-message">
              <p className="color-card--message">Really delete?</p>
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
        
          </>
        )}
      </div>
  );
}
