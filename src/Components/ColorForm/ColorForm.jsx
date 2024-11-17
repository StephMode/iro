import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({ 
  onColorSubmit,
  initialData = {role: "some color", hex: "#123456", contrastText: "#ffffff"}
  }) 
  
  {
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
          htmlFor="role"
          className="color-form--input-field-container"
        >
          Role
          <input 
          id="role" 
          name="role" 
          type="text"
          defaultValue={initialData.role} />
        </label>

        <label htmlFor="hex">
          Hex
        <ColorInput id="hex" defaultValue={initialData.hex}/>
        </label>

        <label htmlFor="contrastText">
          Contrast Text
        <ColorInput id="contrastText" defaultValue={initialData.contrastText}/>
        </label>

      </div>
      <button type="submit" className="color-form--submit-button">🎨 COLOR MAGIC</button>
    </form>
  );
}
