import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm></ColorForm>

      {initialColors.map((color) => {
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
  we want the state to hold the [inital colors] for now
  we want state management to add a color = new object to THE BEGINNING of an array (=> array .unhsift() )
we need STATE MANAGEMENT in App, because data managment shall be handled there







*/
