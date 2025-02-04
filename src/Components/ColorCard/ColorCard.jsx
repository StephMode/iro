import "./ColorCard.css";
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
    <section
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {editMode ? (
        <>
          <ColorForm
            isEdit={true}
            initialData={color}
            onEditColor={handleEditColorConfirm}
          />
          <Button buttonType="cancel" onClick={() => setEditMode(false)} />
        </>
      ) : (
        <>
          <div>
            <h3 className="color-card-headline">{color.hex}</h3>
            <h4>
              <span className="color-card-descriptor-label">Contrast Text</span>
              {color.contrastText}
            </h4>
            <h4>
              <span className="color-card-descriptor-label">Role</span>
              {color.role}
            </h4>
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
    </section>
  );
}
