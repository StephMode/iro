export default function ThemeSelector({ themes, onThemeSelect }) {
  // TODO:
  // 1) get rid of <form> ✅
  // 2) develop logic for theme selection ✅
  // 3) develop edit theme logic -- take Color.jsx and App.jsx for color as an example
  // 4) develop delete theme logic -- take Color.jsx and App.jsx for color as an example
  // 5) develop add theme logic -- take Color.jsx and App.jsx for color as an example

  // function handleThemeSelect(event) {
  //   const theme = event => event.target.value;
  //   console.log(theme)
  //   // onThemeSelect;
  // }

  const handleThemeSelect = (event) => {
    onThemeSelect(event.target.value);
    console.log("The slected theme value", event.target.value);
  };

  return (
    <>
      <h2>ThemeSelector</h2>
      <div style={{ display: "flex" }}>
        <select onChange={handleThemeSelect}>
          {themes.map((theme) => {
            return (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            );
          })}
        </select>

        <button>Add</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </>
  );
}
