import "./Color.css";
import ContrastChecker from "../ContrastChecker/ContrastChecker.jsx";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard.jsx";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm.jsx";
import Button from "../Button/Button.jsx";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const [showEdit, setShowEdit] = useState(false);

  function handleDeleteConfirm() {
    onDeleteColor(color.id);
  }

  function handleEditColorConfirm(editedColorData) {
    onEditColor({ id: color.id, ...editedColorData });
    cancelEdit();
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

          <>
            <Button buttonType="delete" onClick={handleDeleteConfirm} />
            <Button buttonType="edit" onClick={handleEditClick} />
          </>

          <ContrastChecker color={color} />
          <h4>{color.role}</h4>
          <p>contrast: {color.contrastText}</p>
        </>
      )}
    </div>
  );
}
