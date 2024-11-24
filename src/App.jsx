import "./App.css";
import { initialColors } from "./lib/colors";
import { initialThemes } from "./lib/themes";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import ThemeSelector from "./Components/ThemeSelector/ThemeSelector";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleAddColor(newColor) {
    setColors([{ id: uid(), ...newColor }, ...colors]);
    console.log("Colors in App", colors);
  }

  function handleDeleteColor(id) {
    setColors(colors.filter((color) => color.id !== id));
  }

  function handleEditColor(editedColor) {
    setColors(
      colors.map((color) => {
        return color.id === editedColor.id ? editedColor : color;
      })
    );
  }

  return (
    <main>
      <h1>Theme Creator</h1>
      <ThemeSelector></ThemeSelector>

      <ColorForm onAddColor={handleAddColor} />
      
      {colors.length === 0 && (
        <h3 className="no-colors-message">
          🎨 No colors? How about adding one?
        </h3>
      )}
      
      <div>
        <h4>Some themes</h4>
        {initialThemes.map((theme) => {
          return(
            <section id={theme.id}>
              <h4>{theme.name}</h4>
              <p>colors go here</p>
              <ul>
              {theme.colors.map((themeColor) => {
                return(
                  <li>
                  <h5>{themeColor.role}</h5>
                  <p>{themeColor.hex}</p>
                  </li>
                )
              })}
              </ul>
            </section>
          )
        })}
      </div>

      <p className="no-colors-message">divider</p>

      {/* <ul className="color-card--list">
      {colors.map((color) => {
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
      </ul> */}


    </main>
  );
}

export default App;
