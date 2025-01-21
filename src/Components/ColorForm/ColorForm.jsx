import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";
import Button from "../Button/Button";
import { useState } from "react";

export default function ColorForm({
  isEdit,
  onAddColor,
  onEditColor,
  initialData = { role: "highlight", hex: "#b55b16", contrastText: "#ffffff" },
}) {
  const [cardBackgroundColor, setCardBackgroundColor] = useState(
    initialData.hex,
  );
  const [cardContrastTextColor, setCardContrastTextColor] = useState(
    initialData.contrastText,
  );

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    {
      isEdit ? onEditColor(data) : onAddColor(data);
    }
    event.target.reset();
    event.target.elements.role.focus();
  }

  return (
    <form
      className="color-form--form"
      onSubmit={handleSubmit}
      style={{
        backgroundColor: cardBackgroundColor,
        color: cardContrastTextColor,
      }}
    >
      <fieldset className="color-form--fieldset">
        <label htmlFor="hex" className="color-form--input-field">
          Hex
          <ColorInput
            id="hex"
            defaultValue={initialData.hex}
            cardBackgroundColor={setCardBackgroundColor}
          />
        </label>

        <label htmlFor="contrastText" className="color-form--input-field">
          Text
          <ColorInput
            id="contrastText"
            defaultValue={initialData.contrastText}
            cardContrastTextColor={setCardContrastTextColor}
          />
        </label>

        <label htmlFor="role" className="color-form--input-field">
          Role
          <input
            id="role"
            name="role"
            type="text"
            defaultValue={initialData.role}
            className="color-form--input-field--color-text"
          />
        </label>
      </fieldset>
      <Button
        buttonType={isEdit ? "edit" : "add"}
        type="submit"
        className="color-form--submit-button"
      />
    </form>
  );
}
