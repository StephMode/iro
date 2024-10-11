import ColorInput from "../ColorInput/ColorInput";
import "./ColorEditor.css";

export default function ColorEditor({
  currentColor,
  onEditColorSubmission,
  onCancelColorEditor,
}) {
  // add fn to handle submit and store input data to be passed to App
  function handleSubmit(event) {
    event.preventDefault();
    // store input data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // ensure that ID is kept with the updated color
    // ...curentColor keeps the only value that's not overriden == id
    // ...data overrides the data with the FormData
    const updatedColor = { ...currentColor, ...data };
    console.log(data);

    // to pass on the id + edited data as an object to the parents
    onEditColorSubmission(updatedColor);

    // event handling logic to improve form UX
    // 🟡 not sure if i need this at all
    // event.target.reset();
    // event.target.elements.role.focus();
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
          defaultValue={currentColor.role}
        ></input>
      </fieldset>
      <ColorInput currentColor={currentColor}></ColorInput>

      <button
        className="ColorForm--submit-button"
        // onClick={onCancelColorEditor}
        type="submit"
      >
        🔄 Update Color
      </button>
    </form>
  );
}
