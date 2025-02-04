import "./App.css";
import { initialThemes } from "./lib/themes";
import ColorCard from "./Components/ColorCard/ColorCard";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import ThemeManager from "./Components/ThemeManager/ThemeManager";
import Button from "./Components/Button/Button";
import { LuHeart } from "react-icons/lu";
import { LuPalette } from "react-icons/lu";

export default function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [selectedThemeId, setSelectedThemeId] = useState(initialThemes[0].id);
  const selectedTheme = themes.find((t) => t.id === selectedThemeId);
  const [showAddColorForm, setShowAddColorForm] = useState(false);

  function handleAddTheme() {
    setThemes([...themes, { id: uid(), name: "new Theme", colors: [] }]);
  }

  function handleDeleteTheme(themeId) {
    setThemes((prevThemes) => prevThemes.filter((t) => t.id !== themeId));
    setSelectedThemeId(initialThemes[0].id);
  }

  function handleEditTheme(newName) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedThemeId ? { ...theme, name: newName } : theme
      )
    );
  }

  function handleAddColor(newColor) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedTheme.id
          ? {
              ...theme,
              colors: [...theme.colors, { id: uid(), ...newColor }],
            }
          : theme
      )
    );
    setShowAddColorForm(false);
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
      <header>
        <div className="header--wrapper">
          <h1>色</h1>
          <h2>iro</h2>
          <p className="header--caption">
            color palettes for the projects you love
          </p>
          <LuHeart style={{ color: "red" }} />
        </div>
      </header>

      <ThemeManager
        themes={themes}
        seletedThemeId={selectedTheme.id}
        onThemeSelect={setSelectedThemeId}
        onAddTheme={handleAddTheme}
        onDeleteTheme={handleDeleteTheme}
        onEditTheme={handleEditTheme}
      />

      <h2>{selectedTheme.name}</h2>

      {selectedTheme.colors.length === 0 && (
        <div className="no-colors-message">
          <h3>This theme has no colors yet.</h3>
          <h3>How about adding one?</h3>
          <LuPalette className="no-colors-message--icon" />
        </div>
      )}

      <ul className="color-card--list">
        {selectedTheme.colors.map((color) => {
          return (
            <li key={color.id}>
              <ColorCard
                className="color-card--item"
                color={color}
                onDeleteColor={handleDeleteColor}
                onEditColor={handleEditColor}
              />
            </li>
          );
        })}
        {showAddColorForm ? (
          <>
            <ColorForm
              onAddColor={handleAddColor}
              colorAddFormCloseListener={setShowAddColorForm}
            />
          </>
        ) : (
          <Button
            buttonType="add"
            onClick={() => setShowAddColorForm(true)}
            isCentered={true}
          />
        )}
      </ul>
      <footer>Built with React & Vite | Stephan Model | 2025</footer>
    </main>
  );
}
