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
    <form className="ColorForm--form" onSubmit={handleSubmit}>
      <label htmlFor="color-role--input">Role</label>
      <input
        id="color-role--input"
        name="role"
        type="text"
        placeholder="some color"
      ></input>

      <ColorInput></ColorInput>

      <button className="ColorForm--submit-button">🎨 ADD COLOR</button>
    </form>
  );
}
