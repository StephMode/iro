import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";

export default function ColorForm({ 
  isEdit,
  onAddColor,
  onEditColor,
  initialData = {role: "some color", hex: "#123456", contrastText: "#ffffff"}
  }) 
  
  {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    {isEdit ? onEditColor(data) : onAddColor(data)}
    event.target.reset();
    event.target.elements.role.focus();
  }

  return (
    <form className="color-form--form" onSubmit={handleSubmit}>
      
      
        <label htmlFor="role" className="color-form--role-label">Role
          <input id="role" name="role" type="text" defaultValue={initialData.role} />
        </label>
      

      
          <label htmlFor="hex">Hex
            <ColorInput id="hex" defaultValue={initialData.hex}/>
          </label>
      

      
          <label htmlFor="contrastText">Contrast Text
            <ColorInput id="contrastText" defaultValue={initialData.contrastText}/>
          </label>
      

      
      <button type="submit" className="color-form--submit-button">{isEdit ? "Edit " : "Add"} Color</button>
    </form>
  );
}
