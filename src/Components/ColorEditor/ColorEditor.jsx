import ColorInput from "../ColorInput/ColorInput";
import "./ColorEditor.css";

export default function ColorForm({ onEditColorSubmission }) {
  // add fn to handle submit and store input data to be passed to App
  function handleSubmit(event) {
    event.preventDefault();
    // store input data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onEditColorSubmission(data);

    console.log(data);

    // event handling logic to improve form UX
    event.target.reset();
    event.target.elements.role.focus();
  }

  // need logic to make value of "role" equal to current role value of color in editing

  return (
    <form className="ColorForm--form" onSubmit={handleSubmit}>
      <fieldset className="ColorForm--form--fieldset">
        <legend className="ColorForm--form-legend">Role</legend>
        <label htmlFor="color-role--input"></label>
        <input
          id="color-role--input"
          name="role"
          type="text"
          placeholder="some color"
        ></input>
      </fieldset>
      <ColorInput></ColorInput>

      <button className="ColorForm--submit-button">🔄 Update Color</button>
    </form>
  );
}
