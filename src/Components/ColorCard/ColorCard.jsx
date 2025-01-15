import "./Color.css";
import ContrastChecker from "../ContrastChecker/ContrastChecker.jsx";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard.jsx";
import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm.jsx";
import Button from "../Button/Button.jsx";

export default function ColorCard({ color, onDeleteColor, onEditColor }) {
  const [editMode, setEditMode] = useState(false);

  function handleEditColorConfirm(editedColorData) {
    onEditColor({ id: color.id, ...editedColorData });
    setEditMode(false);
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {editMode ? (
        <div>
          <ColorForm
            isEdit={true}
            initialData={color}
            onEditColor={handleEditColorConfirm}
            // style={{
            //   background: color.hex,
            //   color: color.contrastText,
            // }}
          />
          <Button buttonType="cancel" onClick={() => setEditMode(false)} />
        </div>
      ) : (
        <>
          <div>
            <h3 className="color-card-headline">{color.hex}</h3>

            <h4>{color.role}</h4>
            <p>Contrast Text {color.contrastText}</p>
            <ContrastChecker color={color} />
          </div>
          <div className="color-card--buttons">
            <CopyToClipboard hexValue={color.hex} />

            <Button
              buttonType="delete"
              onClick={() => onDeleteColor(color.id)}
            />
            <Button buttonType="edit" onClick={() => setEditMode(true)} />
          </div>
        </>
      )}
    </div>
  );
}
