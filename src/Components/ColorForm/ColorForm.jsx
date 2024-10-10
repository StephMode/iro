import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({ onAddColor }) {
  // add fn to handle submit and store input data to be passed to App
  function handleSubmit(event) {
    event.preventDefault();
    // store input data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);
    onAddColor(data);

    // event handling logic to improve form UX
    event.target.reset();
    event.target.elements.role.focus();
  }

  return (
    <form className="ColorForm--form" onSubmit={handleSubmit}>
      <fieldset className="ColorForm--form--fieldset">
        <legend>Role</legend>
        <label htmlFor="color-role--input"></label>
        <input
          id="color-role--input"
          name="role"
          type="text"
          placeholder="some color"
        ></input>
      </fieldset>
      <ColorInput></ColorInput>

      <button type="submit">ADD COLOR</button>
    </form>
  );
}
