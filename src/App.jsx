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

  // useEffect(() => {
  //   // console.log(colors); // logs colors state after setFn has been executed
  // }, []);

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onAddColor={handleAddColor}></ColorForm>

      {colors.map((color) => {
        return (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={handleDeleteColor}
          />
        );
      })}
    </>
  );
}

export default App;

/* Notes on #2 add a color to the theme

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
1) .map needs to be adjusted to state
2) something is wrong with passing of form data between COlorForm and App

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


*/

/* Notes on #3 delete a color from a theme

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
        }}
      ></button>
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

set new sate value ( take state value.filter the state/array( (go through every object = color/param) => return color/argum  WITHOUT OBJECT WITH ID WE FILTERED BY ) )

 function handleDeleteColor(id) {
    setColors(colors.filter((color) => color.id !== id));
  }
💡 ==> key is (id) argument here, because function gets triggered upon click taking the selected object in the DOM element as argument.
Hence, the param enables the function to only the element of object of arrays as argument und lets it use it as filter criterion 


2. Introduce a state to handle the confirmation message

AC2: Clicking the "Delete" button should show a confirmation message before actually deleting

3. Reuse the .color-card-headline css rule for the confirm question, but maybe rename it to .color-card-hightlight


*/
