import "./ColorInput.css";
import { useState } from "react";

export default function ColorInput({ currentColor }) {
  // implement state to give both input fields of respective group same value
  const [hexValue, setHexValue] = useState(currentColor?.hex || "#54c73d");
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
          defaultValue={hexValue}
        ></input>
        <input
          id="color-hex--input"
          //   name="hex"
          type="color"
          value={hexValue}
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
          defaultValue={contrastColorValue}
        ></input>
        <input
          id="color-contrast-text--input"
          //   name="contrastText"
          type="color"
          value={contrastColorValue}
          onChange={handleContrastColorChange}
        ></input>
      </fieldset>
    </>
  );
}
