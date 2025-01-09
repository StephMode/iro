import { useState } from "react";

export default function ThemeSelector({
  themes,
  seletedThemeId,
  onThemeSelect,
  onAddTheme,
  onDeleteTheme,
  onEditTheme,
}) {
  // TODO:
  // 1) get rid of <form> ✅
  // 2) develop logic for theme selection ✅
  // 3) develop edit theme logic -- take Color.jsx and App.jsx for color as an example
  // 4) develop delete theme logic -- take Color.jsx and App.jsx for color as an example
  // 5) develop add theme logic -- take Color.jsx and App.jsx for color as an example
  const selectedTheme = themes.find((t) => t.id === seletedThemeId);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onEditTheme(editName);
    setIsEditing(false);
  }

  return (
    <>
      <h2>ThemeSelector</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        <select
          value={seletedThemeId}
          onChange={(e) => onThemeSelect(e.target.value)}
        >
          {themes.map((theme) => {
            return (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            );
          })}
        </select>

        <button onClick={onAddTheme}>Add</button>
        <button onClick={() => onDeleteTheme(seletedThemeId)}>Delete</button>

        {selectedTheme.id === "t1" && (
          <button
            style={{
              backgroundColor: "#FAFAFA",
              border: "none",
              color: "#46453D",
            }}
          >
            Edit
          </button>
        )}

        {selectedTheme.id !== "t1" && (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}

        {isEditing && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={editName}
              placeholder={selectedTheme?.name || "enter a name"}
              onChange={(e) => setEditName(e.target.value)}
            ></input>
            <button type="submit">✏️</button>
            <button onClick={() => setIsEditing(false)}>cancel</button>
          </form>
        )}
      </div>
    </>
  );
}
