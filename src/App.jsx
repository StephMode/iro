import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useEffect, useState } from "react";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

function App() {
  // declare state and lift [initialColors] into it
  // const [colors, setColors] = useState(initialColors);
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  function handleAddColor(newColor) {
    // setColors([newColor, ...colors]); // spread opertor did the deal
    setColors([{ id: uid(), ...newColor }, ...colors]);
    // console.log(colors); // doesn't give the updated state, because it's executed before state update
  }

  function handleDeleteColor(id) {
    setColors(colors.filter((color) => color.id !== id));
  }

  function handleEditColor(editedColor) {
    setColors(
      colors.map((color) => {
        return color.id === editedColor.id
          ? { ...color, ...editedColor }
          : color;
      })
    );
    console.log("edited");
  }

  // useEffect(() => {
  //   console.log(colors); // logs colors state after setFn has been executed
  // });

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onAddColor={handleAddColor}></ColorForm>
      {colors.length === 0 ? (
        <h3 className="no-colors-message">
          🎨 No colors? How about adding one?
        </h3>
      ) : (
        ""
      )}
      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
            onEditColor={handleEditColor}
          />
        );
      })}
    </>
  );
}

export default App;
