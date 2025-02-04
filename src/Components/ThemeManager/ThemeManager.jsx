import { useState } from "react";
import Button from "../Button/Button";
import { LuChevronDown } from "react-icons/lu";
import "../ThemeManager/ThemeManager.css";

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
    <section>
      <div className="theme-manager-buttons--row">
        {!isEditing && (
          <div className="theme-manager-buttons--theme-picker--row">
            <LuChevronDown style={{ fontSize: "25px" }} />
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
          </div>
        )}

        {!isEditing && (
          <>
            {selectedTheme.id === "t1" && (
              <Button buttonType="edit" isDisabled={true} />
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
              <Button buttonType="delete" isDisabled={true} />
            )}
          </>
        )}
      </div>
      <div className="theme-manager-buttons--add-theme--row">
        <Button onClick={onAddTheme} buttonType={"add"} />
      </div>
    </section>
  );
}
