import { useState } from "react";
import Button from "../Button/Button";
import viteLogo from "/vite.svg";

export default function ThemeManager({
  themes,
  seletedThemeId,
  onThemeSelect,
  onAddTheme,
  onDeleteTheme,
  onEditTheme,
}) {
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
      <div style={{ display: "flex", gap: "15px" }}>
        {!isEditing && (
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
        )}

        {!isEditing && (
          <>
            {selectedTheme.id === "t1" && (
              <Button
                style={{
                  backgroundColor: "#FAFAFA",
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  color: "#46453D",
                }}
                buttonType="edit"
              />
            )}
            {selectedTheme.id !== "t1" && (
              <Button buttonType="edit" onClick={() => setIsEditing(true)} />
            )}
          </>
        )}

        {isEditing && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={editName}
              placeholder={selectedTheme?.name || "enter a name"}
              onChange={(e) => setEditName(e.target.value)}
            ></input>
            <Button buttonType="save" type="submit" />
            <Button buttonType="cancel" onClick={() => setIsEditing(false)} />
          </form>
        )}

        {!isEditing && (
          <>
            {selectedTheme.id !== "t1" && (
              <Button
                buttonType="delete"
                onClick={() => onDeleteTheme(seletedThemeId)}
              />
            )}
            {selectedTheme.id === "t1" && (
              <Button
                buttonType="delete"
                style={{
                  backgroundColor: "#FAFAFA",
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  color: "#46453D",
                }}
              />
            )}
          </>
        )}
      </div>
      <Button onClick={onAddTheme} buttonType={"add"} />
    </>
  );
}
