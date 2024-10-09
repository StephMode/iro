import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";
import { useState } from "react";

function App() {
  // declare state and lift [initialColors] into it
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([newColor, ...colors]); // spread opertor did the deal
  }

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onAddColor={handleAddColor}></ColorForm>

      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;

/*

#1

✅ 1. Create ColorForm comp 

✅ 2. Implement acc criteria 1,2 into ColorForm comp ✅

3. Implement eventHandling logic

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

4. fix state update

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




*/
