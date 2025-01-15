import "./Color.css";
import ContrastChecker from "../ContrastChecker/ContrastChecker.jsx";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard.jsx";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm.jsx";
import Button from "../Button/Button.jsx";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  function handleDeleteConfirm() {
    onDeleteColor(color.id);
  }

  function handleEditColorConfirm(editedColorData) {
    onEditColor({ id: color.id, ...editedColorData });
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
          <Button buttonType="cancel" onClick={cancelEdit} />
        </div>
      ) : (
        <>
          <h3 className="color-card-headline">{color.hex}</h3>
          <CopyToClipboard hexValue={color.hex} />

          {!showConfirm && (
            <>
              <Button buttonType="delete" onClick={handleDeleteClick} />
              <Button buttonType="edit" onClick={handleEditClick} />
            </>
          )}

          {showConfirm && (
            <div style={{ display: "inline-flex" }}>
              <p className="color-card--alert-dialoge--message">
                Really delete?
              </p>
              <Button buttonType="cancel" onClick={cancelDelete} />
              <Button buttonType="delete" onClick={handleDeleteConfirm} />
            </div>
          )}

          <ContrastChecker color={color} />
          <h4>{color.role}</h4>
          <p>contrast: {color.contrastText}</p>
        </>
      )}
    </div>
  );
}
