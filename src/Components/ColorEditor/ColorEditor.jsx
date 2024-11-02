import ColorInput from "../ColorInput/ColorInput";

export default function ColorEditor({ currentColor, onEditColorSubmission }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const updatedColor = { ...currentColor, ...data };
    console.log(data);

    // to pass on the id + edited data as an object to the parents
    onEditColorSubmission(updatedColor);
  }

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
      <ColorInput currentColor={currentColor} />

      <button className="ColorForm--submit-button" type="submit">
        🔄 Update Color
      </button>
    </form>
  );
}
