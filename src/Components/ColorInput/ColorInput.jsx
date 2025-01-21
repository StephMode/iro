import { useState } from "react";

export default function ColorInput({ id, defaultValue }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="color-form--color-input-wrapper">
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
    </div>
  );
}
