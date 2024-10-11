# previous button code for Color com

```JS

<div className="color-card--button-container">
        {/* ternary op for edit/btns switch */}

        {/* test ternary for cancel btn ausblenden */}

        {/* {showDelete === true ? <button>lalala</button> : ""} */}

        {/* ternary op for Cancel Button UI */}
        {!showConfirm ? (
          <button className="color-card--button" onClick={handleDeleteClick}>
            🗑️ Delete
          </button>
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
        {/* ternary op for cancel btn end */}

        {/* ternary op for Edit Button UI */}
        {showEdit === true ? (
          <div>
            <ColorEditor></ColorEditor>
            <button className="color-card--button" onClick={cancelEdit}>
              ❌ Cancel
            </button>
          </div>
        ) : (
          <button className="color-card--button" onClick={handleEditClick}>
            🖍️ Edit
          </button>
        )}
        {/* ternary op for edit btn end */}
      </div>

```

# Playground

```JS

{showDelete === true ? <button>lalala</button> : ""}

        {/* ternary op for Cancel Button UI */}

        {!showConfirm ? (

        )}


        {showEdit ===true ? (
          <div>
            <ColorEditor></ColorEditor>
            <button className="color-card--button" onClick={cancelEdit}>
              ❌ Cancel
            </button>
             </div>) : (
            <button className="color-card--button" onClick={handleDeleteClick}>
            🗑️ Delete
            </button>
            <button className="color-card--button" onClick={handleEditClick}>
            🖍️ Edit
            </button>
            ) : (
            <div className="buttons-container--confirm-message">
            <p>Really delete?</p>
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


```

/\* Notes on #2 add a color to the theme

✅ 1. Create ColorForm comp

✅ 2. Implement acc criteria 1,2 into ColorForm comp ✅

✅ 3. Implement eventHandling logic

Color Form >form submission data >> App >take form submission data >> App >> update > State

3.1 we need to PASS FORM SUBMISSON data ColorForm to App
add handleSubmit to ColorForm to capture form data

3.2. set props
xx> in ColorForm { onAddColor } return(<form onAddColor=handleSubmit) ❌ needs to be linked with handleSubmit
in ColorForm { onAddColor } handleSubmit(onAddColor(data))
in App fn handleAddColor return(<ColorForm onAddColor=handleAddColor)
=> to enable communication of form submit data from Child to Parent

3.3. we need a STATE for that, becuase values are going to change
STATE
we want the state to hold the [inital colors] for now
STATE MANAGEMENT
we want state management to add a color = new object to THE BEGINNING of an array (=> array .unhsift() )
we need STATE MANAGEMENT in App, because data managment shall be handled there

handleAddColor (newColor)

{ setColors( colors.unshift(newColor ))) }

handhabe die neue Farbe (nehme die neue Farbe -- diese nimmst du aus der Comp ColorForm)
{
setColor - verändere den state(colors - nimm dir den aktuellen state.unshift - füge etwas neues hinzu(newColor - und zwar das obj aus dem form input -- diese nimmst du wiederum aus der Comp ColorForm ))
}

✅ 4. fix state update

Code seems to be working, but console throws error

Console: Uncaught TypeError: colors.map is not a function

Assumptions:

1. .map needs to be adjusted to state
2. something is wrong with passing of form data between COlorForm and App

Fix 1)

.map shouldn't be the issue.
The issue lies on the state is being modified.
.unshift modifies the array and returns the lenght of it, not the array itself

Rather use spread opertor

setColors (newColor, ...colors)
modify/set the state (take the form data, ...take the rest of the array and SPREAD IT APART)

setColors([newColor, ...colors]); // spread opertor did the deal

Learnings:

- if you want to add to an array, try spread operator as a simple solution first
- since you want the updated state to be returned as an array, set newColor and ...colors in []

👍🏻 5. Fix bug in rendering of newColor

🟡 Color component renders newColor upon submission, but doesn't show

<p3>
<p>

Assumption: Color doesn't receive state update
How to reflect a state from a parent to a child?

xx> it does get rendered. There is text content in the dom, but it's somehow overshadowed by the bcg

👍🏻 no bug, just me entering the same color for hex and contrastText
which makes the font color and the bcg of the ColorCard appear in the same color

observe:

className="color-card"
style={{
        background: color.hex,
        color: color.contrastText,
      }}

Gives the text content of h3 and p the color of contrat text automatically

✅ 6. Add package and logic to assign id to newly created objects for colors

6.1. understand the data structure of the updated state

function handleAddColor(newColor) {
setColors([newColor, ...colors]);
}); // spread opertor did the deal
console.log(colors);
}
xx> doesn't work, because logging takes place before the state is completely updated

function handleAddColor(newColor) {
setColors([newColor, ...colors], () => {
console.log(colors);
}); // spread opertor did the deal

}
xx> according to error thrown by console, the setFn doesn't support second call back

useEffect(() => {
console.log(colors); // logs colors state after setFn has been executed
}); // that worked

💡 Insight: same data structure, except for missing ID
Thus, we need to add ID here

6.2. find way to implement logic to create id for new color upon submission

Where is the logic of creation of new color happening?
=> in the App, more precisely in the handleAddColor

this logic should look something like this to add the key prop:

setColors([...animals, { id: uid(), ...newAnimal }]);
erweitere den state colors([...gliedere den aktuellen state auf, { füge mithilfe von uid id an, ...gliedere alle key value pairs des neuen objects an}])

6.2.1. install uid package

6.2.2. expand logic of handleAddColor to also add ID

7. Develop a ColorInput Component to handle synchronized text/color inputs

requirement: one of two types of input fields for one color should give the valie

breakdown:
set up a state for color hex, color contrast
xyColor = value of the input field -> intially "", onChange=input

App > ColorForm > ColorInput

ColorInput > values of input on only one of the fields >> ColorForm

ColorForm > all input values (including synchronized ColorInput values) >> App

App > handle state change to add new color

Approach:
So, we need a component that takes inputs and stores them in the ColorForm
This means, ColorForm will be part functional, part representational
App shall still get the values all the same

✅ 7.1. first iteration: simple ColorInput comp that holds fixed values

✅ 7.2. second iteration: in ColorInput,implement state and handleChange for hexValue
to verify, if approach is right

✅ 7.3. refine logic fo hex to make logic iterable
change onHexChange to handleHexChange

✅ 7.4. iterate with contrast color

8. Final fixes and refinements on form Components

8.1. fix issue: ContrastTextcolor gets passed twice due to name of color input field
❌ - test if possible if name is identival with text input xx> output now undefinable upon rendering
❎ - test if possible to have name only on one field but ID on both ==> works as expected again

8.2. fix issue: as per req, form should be prefilled with values
❎ - set useSate accordingly

✅ 9. One more final fix

❎ 9.1. - make both input fields for a respective color influence each others value
=> solution is to put value in both text and color input fields

\*/

/\* Notes on #3 delete a color from a theme

Top Level Breakdown and Ideation

where does the user start: in the Color comp

how does the data flow:
App > Color > DeleteButton >> DELETES on object in the colors state, hence

we need props and logic for
Color: onDeleteColor < > onClick=OnDeleteColor
App: handleAddColor < > OnDeleteColor=handleDeleteColor

handleDeleteColor needs to somehow mutate the array, deleting the selected color

Plan

1. Implement a function to handle the deletion of a color.

AC1: button shall be in EVERY color card

✅ 1.1. Add JSX for Button and test for functionality

- Add one button
- Add CANCEL Button and use ternary operator to add interactivity: cancel only to be shown upon click
  {if clicked=true - show text content"DELETE" && button CANCEL "CANCEL", else only show text content "DELETE" }

Observe:

<button onClick={handleClick}>DELETE</button>
<button onClick={handleClick}>CANCEL</button>
🟡 xx> works, but to separate buttons speaking to the same event handler

<button
onClick={(click) => {
click ? (
<>
<button>CANCEL</button>
<button>DELETE</button>
</>
) : (
<button>DELETE</button>
);
}} ></button>
🟡 xx> seems to be working, but doesnt show anything

- Assumption: button within button, maybe I should wrap into something non-semantic, like a div
  ❌ jetzt sieht man gar nichts mehr

Grundsätzlich dürfen die Buttons in nichts eingenested sein, sonst werden sie nur als mini bubbles angezeigt
Thus, I can't nest button into another

I could try making the button appear on click of delete
1.1. 1. add logic to changing state of the cancel button STATE

function showHideCancelButton() {
let cancelButtonStatus = false;
cancelButtonStatus = !false;
console.log(cancelButtonStatus);
console.log("delete button clicked and should do something with CANCEL");
}
💡 ==> this is a good start, but I already see that I need state for that

1.1.2. implement state and change showHideCancelButton to contain state management logic

1.1.3. implement ternary op to show cancel butto upon click

1.2. Implement props

like this
Color: onDeleteColor < > onClick=OnDeleteColor
App: handleAddColor < > OnDeleteColor=handleDeleteColor

return (
<Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
          />
==> this should work to set the "line of communication with props" within the JSX to render the comp

clog doesn't work due to clog not being executed in useEffect 👉🏻 remember synchronous and asynchronous execution

🟡 App isn't able to listen to DELETE Button click, or at least not to clog it

What do the fn in Color do at the moment?

cancelButtonStatus = saves state of cancel button -- if it was clicked (boolean)

handleClick = registers if the button was clicked -- no value add
xx> make it registering click on CANCEL ftm

showHideCancelButton = switches state to show/hide cancel button
==> thus it should also go into the CANCEL button

❎ ==> the DELETE BTN needed it's own event handler ftm,
which in turn holds the prop onDeleteColor
because the App needs to know WHENEVER THE DELETE BUTTON IS CLICKED

🟡 This still doesn't get me to let the App listen to the click in the comp
Maybe try using the cancelButtonStatus state again
❎ ==> that worked (for now at least)

1.3. Implement HandleDeleteColor

function handleDeleteColor() {
console.log("del btn clicked");
setColors(
colors.filter((color) => {
return color !== color;
})
);
}
🟡 works in general, but deletes all colors

mock code:

set new sate value ( take state value.filter the state/array( (go through every object = color/param) => return color/argum WITHOUT OBJECT WITH ID WE FILTERED BY ) )

function handleDeleteColor(id) {
setColors(colors.filter((color) => color.id !== id));
}
💡 ==> key is (id) argument here, because function gets triggered upon click taking the selected object in the DOM element as argument.
Hence, the param enables the function to only the element of object of arrays as argument und lets it use it as filter criterion

1.4. Delete Button Functionality incomplete, improve!

Right now, the delete button only executes logic to show/hide cancel button

1.4.1. make CANCEL appear to the left of DELETE instead of right
1.4.2. change tern op for <btn> so that it either shows DELETE or CONFIRM MESSAGE, CANCEL, DELETE

✅ 2. Introduce a state to handle the confirmation message

AC2: Clicking the "Delete" button should show a confirmation message before actually deleting

3. Reuse the .color-card-headline css rule for the confirm question, but maybe rename it to .color-card-hightlight

4. Implement "No colors" msg if colors <= 0

if colors === 0 ? "No colors" : map

maybe this doesn't work because I can't reference the same state in tern op twice?

{colors === [] ? "No colors" : {colors.map((color) => {
return (
<Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
          />
);
}
)
}
}

💡 i need a another JSX fragment to nest my tern op in
wait a sec, I don't need to nest the map and Color inside the tern op, it's just the msg that needs to pop up or not based on condition colors.lenght === 0

\*/

/\* Notes on #4 edit color theme

Top Level Breakdown and Ideation

where does the user start: in the Color comp, but state management is taking place within a EditMode Comp

how does the data flow:
App > Color > EditButton >> edit an exisiting element of colors
edit element of colors > stored in edited state >> App > state colors

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

✅ 4. Introduce a state for the edit and state management

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

handleSumbit on ColorEditor needs logic to attach ID of edited color to the formData,
otherwise it won't be able to recognize which color is actually being edited

=> data.id = currentColor.id;

App needs a refined version of the handleEditColor(map) logic I already had

This is what I had so far:

function handleEditColor(editedColor) {
setColors(
colors.map((color) =>
color.id === editedColor.id ? { ...color, ...editedColor } : color
)
);
}

maybe change the return statement even more

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

still not working

I need to revise the overall logic:

✅ 1) Issue with handleEditColorConform
/ functions for data/state flow
function handleEditColorConfirm() {
onEditColor(color.id);
}
xx> this fn only passes on the id

instead try param (editedColor)
onDeleteColor(param as arg)
to pass the edited object

✅ 2) ColorEditor > "Update Color" btn doesn't submit
change "Update Color" to type submit

✅ 3) Pass the edited color object propery -- in ColorEditor > handleSubmit

Instead of

// attach the ID of the current color to the submitted data
data.id = currentColor.id;

    onEditColorSubmission(data);

try storing updated color in a const, like

const updatedColor = {...keep updated color + ...override with updated color}

✅==> colors are now being changed upon submit of editing

5. Final fix and refinements

❎ 5.1. "Update Color" btn shall make form dissapear

- removed the logic from ColorEditor to make the button functionable as actual submission btn

- maybe try implementing it in Colors?

logic: onEditColorSubmission shall trigger handleEditColorConfirm && cancelEdit

now, the updating doesn't work anymore

✅ props are still in ColorEdtiro

{showEdit === true ? (
<div>
<ColorEditor
currentColor={color}
onEditColorSubmission={() => {
handleEditColorConfirm;
cancelEdit;
}}

🟡 This is just referencing the functions without invoking them

I need to invoke them by making adjustments to the callbackfn in the prop onEditColorSubmission={}

logic:
onEditColorSubmission= function with param (editedColors --- link to the edit confirm event handler) {
invoke handleEditColorConfirm with arg --- link to edit confirm …
proper invikation of cancelEdit() to trigger the set function for my show/hide edit state
}

\*/
