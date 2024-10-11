import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useEffect, useState } from "react";
import { uid } from "uid";

function App() {
  // declare state and lift [initialColors] into it
  const [colors, setColors] = useState(initialColors);

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
      colors.map((color) => (color.id === editedColor.id ? editedColor : color))
    );
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

/* Notes on #4 edit color theme


Top Level Breakdown and Ideation

where does the user start: in the Color comp, but state management is taking place within a EditMode Comp

how does the data flow:
App > Color > EditButton >> edit an exisiting element of colors
 edit element of colors > stored in edited state  >> App > state colors

we need:
create an EDIT btn, which opens editor in Color
create am comp for Editor
state to store an edit
find a way to replace edit state with equivalent element in colors state


Plan

✅ 1. Create Edit btn and basic edit/cancel logic in Color

2. Reuse the ColorForm Component and display it within the Color Component when in edit mode
2.1 change elements so that they match the new context of EditForm
☑️ Done for the time being, component developed and


3. Implement Edit Comp in Color Comp 

3.1. Improve UI, make del btn dissapear when edit is clicked

try using a state on delete btn

logic breakdown

showDelete === true ?
  {!show} flow
  : ""

Try getting this out of the ternary opertors:

1st question: which buttons shall always be rendered
- Delete
- Edit

Which buttons/elements shall be rendered upon click event
- update color << Edit
- cancel << Edit
- Editor Form Comp << Edit

- Cancel << Delete
- delete message << Delete

We need a new comp for the Buttons in Color

it should represent the follwing states:

default btn view: [delete] [edit]

delete-clicked btn view: 
[message] [cancel] [delete]

edit-clicked btn view: 
[message]
[delete]
[cancel]

comp should only need to hold and manage states to change UI Elements according to clicks

think more atomic:

ColorDeleteButton: only represenation, data flow between Color and App

ColorEditButton: only represenation, data flow between Color and App

ColorDeleteButton
states: 
- showConfirm

🔄 Pivot: I decided to stick to my existing solution, which is ternary operator
Improved it and made it ternary op with nested ternary op

<div className="color-card--button-container">
        {showEdit === true ? (
          <div>
            <ColorEditor></ColorEditor>
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

❎ ==> works as it should. Nonetheless rather stop gap. 
Will have to refactor later.



4. Introduce a state for the edit and state management

✅ 4.1. set up props

data flow:

ColorEditor > passes Edit submission data >> Color > takes submitted edit data >> App > iterates over array and changes accordingly

prop structure

1st data handover
ColorEditor >> onEditColorSubmission <> onEditColor << Color

2nd data handover
Color >> onEditColor <> handleEditColor << App

4.2. create logic to edit color in app

4.2.1. handleEditColor within App

Idea is to have a function in App which in the hand handles the state change of colors caused by edition

First Approach: I would use the .map() method for that, because it can give a new array with 1-n elements modified

Mock Logic:
handleEditColor(take a single color as an arugment -- ID) {
set/modify the state -- setColors( colors.iterate through the array in order to modify it -- .map((iterate through each obj in array -- color) 
=> callbackFn {check which color equals the edited color -- color.id === id? {return colors which the edited color changed -- ...colors, id} } ) )
}

Try simplifying the function, because there doesn't need to be if/else, since there is always a change when submitting an edit

 function handleEditColor(id) {
    setColors(
      colors.map((color) => {
        return { color };
      })
    );
  }
🟡 ==> this makes all Color elements go empty, but at least there is something happening

 function handleEditColor(id) {
    setColors(
      colors.map((color) => {
        return { ...color, id };
      })
    );
  }
🟡 ==> this doesn't change the outcome, but throws an error
Warning: Encountered two children with the same key, `c1`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.
App@http://localhost:5173/src/App.jsx?t=1728623703482:26:39

Improvements to make:

✅ - make "Update Color" btn also cancel the form -> prop onCancelColorEditor
✅ - make ColorEditor prefilled with current values
  ColorForm >> <{ currentColor }> << Color >> <{ color }> App
    ❎ works with "role" in color editor
    ❎ - find a way to make it work with ColorInput comp
      solution is to establish line of communication between ColorEditor and ColorInput through {currentColor} referencing itself

- improve functionality of handeEditColor


*/
