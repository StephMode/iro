import "./ColorForm.css";

export default function ColorForm() {
  return (
    <form className="ColorForm--form">
      <fieldset className="ColorForm--form--fieldset">
        <legend>Role</legend>
        <label htmlFor="color-role--input"></label>
        <input
          id="color-role--input"
          type="text"
          placeholder="some color"
        ></input>
      </fieldset>
      <fieldset className="ColorForm--form--fieldset">
        <legend>Hex</legend>
        <label htmlFor="color-hex--input"></label>
        <input id="color-role--input" type="text" placeholder="#54c73d"></input>
        <input id="color-role--input" type="color"></input>
      </fieldset>
      <fieldset className="ColorForm--form--fieldset">
        <legend>Contrast Text</legend>
        <label htmlFor="color-contrast-text--input"></label>
        <input
          id="color-contrast-text--input"
          type="text"
          placeholder="#54c73d"
        ></input>
        <input id="color-contrast-text--input" type="color"></input>
      </fieldset>
      <button type="button">ADD COLOR</button>
    </form>
  );
}
