import "./App.css";
import { initialColors } from "./lib/colors";
import { initialThemes } from "./lib/themes";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector";
import { useState } from "react";

function App() {
  const [themes, setThemes] = useState(initialThemes);

  // const [colors, setColors] = useLocalStorageState("colors", {
  //   defaultValue: initialColors,
  // });

  // TODO: this needs to be made dynamic
  const themeSelector = 0;
  const selectedTheme = themes[themeSelector];
  const selectedThemeColors = selectedTheme.colors;

  console.log(selectedThemeColors);

  function handleAddColor(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]);
    console.log("Colors in App", colors);
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
    // setColors(
    //   colors.map((color) => {
    //     return color.id === editedColor.id ? editedColor : color;
    //   })
    // );
  }

  return (
    <main>
      <h1>Theme Creator</h1>
      <ThemeSelector></ThemeSelector>

      <ColorForm onAddColor={handleAddColor} />

      {selectedThemeColors.length === 0 && (
        <h3 className="no-colors-message">
          🎨 No colors? How about adding one?
        </h3>
      )}

      <h3>{selectedTheme.name}</h3>

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
