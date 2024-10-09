import "./ColorForm.css";

export default function ColorForm({ onAddColor }) {
  // add fn to handle submit and store input data to be passed to App
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    //
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
      <fieldset className="ColorForm--form--fieldset">
        <legend>Hex</legend>
        <label htmlFor="color-hex--input"></label>
        <input
          id="color-hex--input"
          name="hex"
          type="text"
          placeholder="#54c73d"
        ></input>
        <input id="color-hex--input" type="color"></input>
      </fieldset>
      <fieldset className="ColorForm--form--fieldset">
        <legend>Contrast Text</legend>
        <label htmlFor="color-contrast-text--input"></label>
        <input
          id="color-contrast-text--input"
          name="contrastText"
          type="text"
          placeholder="#54c73d"
        ></input>
        <input name="color-contrast-text--input" type="color"></input>
      </fieldset>
      <button type="submit">ADD COLOR</button>
    </form>
  );
}
