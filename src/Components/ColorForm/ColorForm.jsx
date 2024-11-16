import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({ onColorSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onColorSubmit(data);
    event.target.reset();
    event.target.elements.role.focus();
  }

  return (
    <form className="color-form--form" onSubmit={handleSubmit}>
      <div className="color-form--input-fields--wrapper">
        <label
          htmlFor="color-role-input"
          className="color-form--input-field-container"
        >
          Role
          <input id="color-role-input" name="role" type="text" />
        </label>

        <ColorInput></ColorInput>
      </div>
      <button className="color-form--submit-button">🎨 ADD COLOR</button>
    </form>
  );
}
