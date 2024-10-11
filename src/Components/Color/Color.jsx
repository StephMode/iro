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
        <CopyToClipboard hexValue={color.hex}></CopyToClipboard>
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

✅ 1. Implement a comp CopyToClipboard with plain succes msg logic

- state for success msg

2. Implement writeText to add functionality to the comp

✅ 2.1.plain writeText function

2.2. connection between Color and CopyTo… to identify click

data flow

Parent/Child
Color > color.hexValue >> CopyTo > clipBoardText state

Component internal
setFn  state clipBoard > color.hexValue >> state clipBoard >> param of writeClipBoard 

Prop structure:
Parent/Child
CopyTo < hexValue > Color

CopyTo internal
{hexValue} < > argument of write fn

Steps:

✅ - initialize state for clipBoardText
✅ - give writeClipBoardText fn the param of curent value of clipBoardText state
✅ - declare setFn for clipBoardText state
✅ - implement hexValue prop

Okay, my implementation is even simpler than my layed out plan

This is how it works:

export default function CopyToClipboard({ hexValue }) { ==> I set the prop

<CopyToClipboard hexValue={color.hex}></CopyToClipboard> ==> I used the prop to store the hex value of the chosen color

I take the value of the prop hexValue, which I used to "grab" the single hexValue and put it into
- default value of state clipBoardText
- setFn of said state

In turn, the clipboardtext value then serves as 
- argument for the write clipboard fn

🏗️ Refactor!

maybe I can use a single const, because there is only one clipboard text
✅ made sense, stiill working and more concise and DRY code

✅ 3. Implement logic make msg disspear

needs to trigger setFn of succM state if success message is visible

useEffect 
  if success message === true
    setInterval method( fn hideSuccessMsg, 3000 )

  


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
