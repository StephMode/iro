export default function ThemeSelector({ themes, onThemeSelect, onAddTheme }) {
  // TODO:
  // 1) get rid of <form> ✅
  // 2) develop logic for theme selection ✅
  // 3) develop edit theme logic -- take Color.jsx and App.jsx for color as an example
  // 4) develop delete theme logic -- take Color.jsx and App.jsx for color as an example
  // 5) develop add theme logic -- take Color.jsx and App.jsx for color as an example

  return (
    <>
      <h2>ThemeSelector</h2>
      <div style={{ display: "flex" }}>
        <select onChange={(e) => onThemeSelect(e.target.value)}>
          {themes.map((theme) => {
            return (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            );
          })}
        </select>

        <button onClick={onAddTheme}>Add</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </>
  );
}
