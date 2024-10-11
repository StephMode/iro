import ColorButton from "../ColorButton/ColorButton.jsx";
import ColorEditor from "../ColorEditor/ColorEditor.jsx";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard.jsx";
import "./Color.css";
import { useState } from "react";

export default function Color({ color, onDeleteColor, onEditColor }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  // const [showDelete, setShowDelete] = useState(false); // only for test ternary

  // functions for data/state flow
  function handleDeleteConfirm() {
    // onDeleteColor(cancelButtonStatus); // this only displays clicked-status of delete btn
    onDeleteColor(color.id); // this is what we will need in order to pass ID of clicked color
  }

  function handleEditColorConfirm(editedColor) {
    onEditColor(editedColor);
  }

  function handleDeleteClick() {
    setShowConfirm(true);
  }

  function cancelDelete() {
    setShowConfirm(false);
  }

  function handleEditClick() {
    setShowEdit(true);
  }

  function cancelEdit() {
    setShowEdit(false);
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <>
        <CopyToClipboard></CopyToClipboard>
      </>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <div className="color-card--button-container">
        {showEdit === true ? (
          <div>
            <ColorEditor
              currentColor={color}
              onEditColorSubmission={(editedColor) => {
                handleEditColorConfirm(editedColor);
                cancelEdit();
              }}
              onCancelColorEditor={cancelEdit}
            ></ColorEditor>
            <button className="color-card--button" onClick={cancelEdit}>
              ❌ Cancel
            </button>
          </div>
        ) : !showConfirm ? (
          <>
            <button className="color-card--button" onClick={handleDeleteClick}>
              🗑️ Delete
            </button>
            <button className="color-card--button" onClick={handleEditClick}>
              🖍️ Edit
            </button>
          </>
        ) : (
          <div className="buttons-container--confirm-message">
            <p className="color-card--message">Really delete?</p>
            <button className="color-card--button" onClick={cancelDelete}>
              ❌ Cancel
            </button>
            <button
              className="color-card--button"
              onClick={handleDeleteConfirm}
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* Notes in Issue 6

Understanding Requirements & Problem:

1) There shall be a button to copy the hex code of the current color in the temp storage/clipboard
2) Upon btn click there shall be confirmation message for 3 seconds


1)

top lvl
- Where does the user start? in Color
- Color needs an additional comp as a Child >> CopyToClipBoardButton

Problem breakdown
- needs event handling logic >> btn clicked ? success message : btn
- needs writeText() method
- needs to be connected the hex value of the current color 💡 maybe work with logic similar to currentColor-prop linking
- does it need a state? 👉🏻 yes, at least to handle the succ msg


2)

top lvl
- Where does it take place: within the CopyToClipBoardButton comp

Problem breakdown
- Needs logic within useState
- Needs to utilize timeout 💡 ISS challenge


Plan:

1. Implement a comp CopyToClipboard with plain succes msg logic

2. Implement writeText to add functionality to the comp

3. Implement logic make msg disspear



*/

/* My previous logic for DELETE/CANCEL btn

const [cancelButtonStatus, setCancelButtonStatus] = useState(false);

function showHideCancelButton() {
    setCancelButtonStatus(!cancelButtonStatus);
  }

  // useEffect(() => {
  //   console.log(cancelButtonStatus);
  // }, []);

<div>
        <button
          onClick={() => {
            showHideCancelButton();
            handleDeleteClick();
          }}
        >
          DELETE
        </button>
        {cancelButtonStatus === false ? (
          ""
        ) : (
          <button
            onClick={() => {
              showHideCancelButton();
            }}
          >
            CANCEL
          </button>
        )}
      </div>

*/
