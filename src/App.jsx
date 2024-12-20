import "./App.css";
import { initialThemes } from "./lib/themes";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector";
import { useState } from "react";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [themeSelector, setThemeSelector] = useState(0);

  // TODO: this needs to be made dynamic
  // let themeSelector = 0;
  const selectedTheme = themes[themeSelector];
  const selectedThemeColors = selectedTheme.colors;

  

  function selectTheme(id) {
    setThemeSelector(id);
    console.log(id)
  }

  
  

  function handleAddColor(newColor) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedTheme.id
          ? {
              ...theme,
              colors: [{ id: uid(), ...newColor }, ...theme.colors],
            }
          : theme
      )
    );
  }

  function handleDeleteColor(id) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedTheme.id
          ? {
              ...theme,
              colors: theme.colors.filter((color) => color.id !== id),
            }
          : theme
      )
    );
  }

  function handleEditColor(editedColor) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedTheme.id
          ? {
              ...theme,
              colors: theme.colors.map((color) => {
                return color.id === editedColor.id ? editedColor : color;
              }),
            }
          : theme
      )
    );
  }

  return (
    <main>
      <h1>Theme Creator</h1>
      <ThemeSelector themes={themes} onThemeSelect={selectTheme}/>

      <ColorForm onAddColor={handleAddColor} />

      {selectedThemeColors.length === 0 && (
        <h3 className="no-colors-message">
          🎨 No colors? How about adding one?
        </h3>
      )}

      <h2>{selectedTheme.name}</h2>

      <ul className="color-card--list">
        {selectedThemeColors.map((color) => {
          return (
            <li key={color.id}>
              <Color
                className="color-card--item"
                color={color}
                onDeleteColor={handleDeleteColor}
                onEditColor={handleEditColor}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;
