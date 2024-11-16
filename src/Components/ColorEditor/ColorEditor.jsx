import ColorInput from "../ColorInput/ColorInput";

export default function ColorEditor({ currentColor, onEditColor }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const updatedColor = { ...currentColor, ...data };
    // to pass on the id + edited data as an object to the parents
    onEditColor(updatedColor);
  }

  return (
    <form className="color-form--form" onSubmit={handleSubmit}>
      <div className="color-form--input-fields--wrapper">
        <label
          htmlFor="color-role-input"
          className="color-form--input-field-container"
        >
          Role
          <input
            id="color-role-input"
            name="role"
            type="text"
            defaultValue={currentColor.role}
          />
        </label>

        <ColorInput currentColor={currentColor} />
      </div>
      <button className="color-form--submit-button" type="submit">
        🔄 Update Color
      </button>
    </form>
  );
}
