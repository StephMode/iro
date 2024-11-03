import { useState } from "react";

export default function ColorInput({ currentColor }) {
  const [hexValue, setHexValue] = useState(currentColor?.hex || "#4dffea");
  const [contrastColorValue, setContrastColorValue] = useState(
    currentColor?.contrast || "#000000"
  );

  const handleHexChange = (event) => {
    setHexValue(event.target.value);
  };

  const handleContrastColorChange = (event) => {
    setContrastColorValue(event.target.value);
  };

  return (
    <>
      <label
        htmlFor="color-hex-input"
        className="color-form--input-field-container"
      >
        Hex
        <input
          id="color-hex-input"
          name="hex"
          type="text"
          value={hexValue}
          onChange={handleHexChange}
        />
        <input
          id="color-hex--input"
          type="color"
          value={hexValue}
          onChange={handleHexChange}
          className="color-form--input-field--color-picker"
        />
      </label>

      <label
        htmlFor="color-contrast-text-input"
        className="color-form--input-field-container"
      >
        Contrast Text
        <input
          id="color-contrast-text-input"
          name="contrastText"
          type="text"
          value={contrastColorValue}
          onChange={handleContrastColorChange}
        />
        <input
          id="color-contrast-text-input"
          type="color"
          value={contrastColorValue}
          onChange={handleContrastColorChange}
          className="color-form--input-field--color-picker"
        />
      </label>
    </>
  );
}
