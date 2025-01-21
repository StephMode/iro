import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";
import Button from "../Button/Button";

export default function ColorForm({
  isEdit,
  onAddColor,
  onEditColor,
  initialData = { role: "some color", hex: "#ffef22", contrastText: "#ffffff" },
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    {
      isEdit ? onEditColor(data) : onAddColor(data);
    }
    event.target.reset();
    event.target.elements.role.focus();
  }

  return (
    <form className="color-form--form" onSubmit={handleSubmit}>
      <fieldset className="color-form--fieldset">
        <label htmlFor="hex" className="color-form--role-label">
          Hex
          <ColorInput id="hex" defaultValue={initialData.hex} />
        </label>

        <label htmlFor="role" className="color-form--role-label">
          Role
          <input
            id="role"
            name="role"
            type="text"
            defaultValue={initialData.role}
            className="color-form--input-field--color-text"
          />
        </label>

        <label htmlFor="contrastText" className="color-form--role-label">
          Contrast Text
          <ColorInput
            id="contrastText"
            defaultValue={initialData.contrastText}
          />
        </label>
      </fieldset>
      <Button
        buttonType={isEdit ? "edit" : "add"}
        type="submit"
        className="color-form--submit-button"
      />
    </form>
  );
}
