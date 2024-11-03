import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({ onAddColor }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onAddColor(data);
    event.target.reset();
    event.target.elements.role.focus();
  }

  return (
    <form className="color-form--form" onSubmit={handleSubmit}>
      <label htmlFor="color-role-input">
        Role
        <input id="color-role-input" name="role" type="text" />
      </label>

      <ColorInput></ColorInput>

      <button className="color-form--submit-button">🎨 ADD COLOR</button>
    </form>
  );
}
