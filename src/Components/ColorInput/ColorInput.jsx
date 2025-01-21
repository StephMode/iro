import { useState } from "react";

export default function ColorInput({
  id,
  defaultValue,
  cardBackgroundColor,
  cardContrastTextColor,
}) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
    id === "hex"
      ? cardBackgroundColor(event.target.value)
      : cardContrastTextColor(event.target.value);
  };

  return (
    <>
      <input
        id={id}
        name={id}
        type="text"
        value={inputValue}
        onChange={handleInputValue}
        className="color-form--input-field--color-text"
      />
      <input
        type="color"
        value={inputValue}
        onChange={handleInputValue}
        className="color-form--input-field--color-picker"
      />
    </>
  );
}
