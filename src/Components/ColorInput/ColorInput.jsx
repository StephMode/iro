import { useState } from "react";

export default function ColorInput({ currentColor }) {
  // implement state to give both input fields of respective group same value
  const [hexValue, setHexValue] = useState(currentColor?.hex || "#4dffea");
  const [contrastColorValue, setContrastColorValue] = useState(
    currentColor?.contrast || "#000000"
  ); // for the solution of having separate comps for having this comp as child of ColorForm and ColorEditor, this state initialization gives me EITHER value of current color selected OR the assigned default value ""

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
      <label htmlFor="color-hex-input">Hex</label>
      <input
        id="color-hex-input"
        name="hex"
        type="text"
        value={hexValue}
        onChange={handleHexChange}
      ></input>
      <input
        id="color-hex--input"
        type="color"
        value={hexValue}
        onChange={handleHexChange}
      ></input>

      <label htmlFor="color-contrast-text-input">Contrast Text</label>
      <input
        id="color-contrast-text-input"
        name="contrastText"
        type="text"
        value={contrastColorValue}
        onChange={handleContrastColorChange}
      ></input>
      <input
        id="color-contrast-text-input"
        type="color"
        value={contrastColorValue}
        onChange={handleContrastColorChange}
      ></input>
    </>
  );
}
