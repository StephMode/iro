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
  // const [themeSelector, setThemeSelector] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState(initialThemes[0].id);
  // const [coolors, setCoolors] = useState(selectedTheme.colors);

  // let selectedThemeColors = selectedTheme.colors; // FIXME: why not try a state or const instead of this
  const selectedTheme = themes.find((t) => t.id === selectedThemeId);

  // console.log("This is the STATE selectedTheme:", selectedTheme);
  // console.log("This is the LET selectedThemeColors:", selectedThemeColors);
  // console.log("This is the CONST selectedThemeColors:", selectedThemeColors2);
  // console.log("This is the STATE coolors:", coolors);

  // this returns `undefined`
  // const selectedThemeColors2 = themes[selectedTheme];
  // console.log("selThC2", selectedThemeColors2);

  // useEffect(() => {
  //   console.log("something changed with the colors of the selected theme");
  //   selectedThemeColors = selectedTheme.colors;
  // }, []);

  // const yetAnotherThemeVar = themes[0].id;
  // console.log("This is value of yetAnother:", yetAnotherThemeVar);

  // function selectTheme(id) {
  //   // const selTheme = themes.find((theme) => theme.id === id);
  //   // const themeIndex = selTheme.id;
  //   // setThemeSelector(id);
  //   setSelectedTheme(themes.find((theme) => theme.id === id));
  //   // console.log("This is the theme selected in option", selTheme);
  //   console.log("This is the value of state selectedTheme now", selectedTheme);
  // }

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
      <ThemeSelector themes={themes} onThemeSelect={setSelectedThemeId} />

      <ColorForm onAddColor={handleAddColor} />

      {selectedTheme.length === 0 && (
        <h3 className="no-colors-message">
          🎨 No colors? How about adding one?
        </h3>
      )}

      <h2>{selectedTheme.name}</h2>

      <ul className="color-card--list">
        {selectedTheme.colors.map((color) => {
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
