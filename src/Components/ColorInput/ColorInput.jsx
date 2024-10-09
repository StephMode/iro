import "./ColorInput.css";
import { useState } from "react";

export default function ColorInput() {
  // implement state to give both input fields of respective group same value
  const [hexValue, setHexValue] = useState("");
  const [contrastColorValue, setContrastColorValue] = useState("");
  //   const contrastValue = "#000000"; // for testing purposes of 1st iteration

  // implement input handler to give both input fields of respective group same value after input
  const handleHexChange = (event) => {
    setHexValue(event.target.value);
  };

  const handleContrastColorChange = (event) => {
    setContrastColorValue(event.target.value);
  };

  return (
    <>
      <fieldset className="ColorForm--form--fieldset">
        <legend>Hex</legend>
        <label htmlFor="color-hex--input"></label>
        <input
          id="color-hex--input"
          name="hex"
          type="text"
          placeholder="#54c73d"
          value={hexValue}
          onChange={handleHexChange}
        ></input>
        <input
          id="color-hex--input"
          type="color"
          onChange={handleHexChange}
        ></input>
      </fieldset>

      <fieldset className="ColorForm--form--fieldset">
        <legend>Contrast Text</legend>
        <label htmlFor="color-contrast-text--input"></label>
        <input
          id="color-contrast-text--input"
          name="contrastText"
          type="text"
          placeholder="#54c73d"
          value={contrastColorValue}
          onChange={handleContrastColorChange}
        ></input>
        <input
          name="color-contrast-text--input"
          type="color"
          value={contrastColorValue}
          onChange={handleContrastColorChange}
        ></input>
      </fieldset>
    </>
  );
}
