// /*
// How does the API return values
// - We post request data to the URL
// - We send the request body as an array of two colors (main and contrast)
// - The API returns an object with a set of ratings as strings in diffrent categories:
// {
//   "Small": "AAA" | "AA" | "A" | "Fail",
//   "Bold": "AAA" | "AA" | "A" | "Fail",
//   "Large": "AAA" | "AA" | "A" | "Fail",
//   "Overall": "Yup" | "Kinda" | "Nope",
//   "Contrast": string,
// }

// implementation example
//  async function postFetch() {
//       const response = await fetch(
//         "https://www.some-api-url.com/api",
//         {
//           method: "POST",
//           body: JSON.stringify({ cool: true }), // hier müssen meine colors rein
//           headers: {
//            "Content-Type": "application/json", // leave as is
//          },
//         }
//       );

//       // store data from fetch in object
//       // return data

//       }

// // wrap in a try/catch overall

// */

// // API fetch goes here because we want to have it asynchronously to the rest of the comp code
// don't forget to implement the color={color} prop into Color component !!

import { useEffect, useState } from "react";
import "./ContrastChecker.css";

async function fetchContrastCheckColor(color) {
  // fetchContrastCheck instead of getContrastCheck to better reflect the purpose of the fn
  try {
    const response = await fetch(
      "https://www.aremycolorsaccessible.com/api/are-they",
      {
        method: "POST",
        body: JSON.stringify({ colors: [color.hex, color.contrastText] }), // we post the values from key value pairs hex and contrastText passed down as a prop from App to here for every individual color in JSON format
        headers: {
          "Content-Type": "application/json", // this tells the server we are fetching from that our request bondy is JSON format. It allows the server to correctly parse the data.
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Issue with fetch operation"); // con.error is better for logging errors
  }
}

export default function ContrastChecker({ color }) {
  const [contrastValue, setContrastValue] = useState(null); // we want to store our a11y contrast value in a state variable so that we can dynamically render it in the component for every single Color (the parent)

  useEffect(() => {
    const checkContrastValue = async () => {
      // const checkContrastValue triggers the API fetch fn and the set fn of the state contrastResult
      const contrastResult = await fetchContrastCheckColor(color); // call the API fetch fn with color prop as argument, also stores the result of the fetch (which is the accesibility check with the parameters of the API) in this variable
      setContrastValue(contrastResult); // contrastResult as the argument of the set function makes the set function to update the state with the data from the API fetch (which is the accesibility Abgleich)
    };
    checkContrastValue(); // this function call triggers the API fetch fn and the set fn sequentially
  }, [color]); // array of dependencies to tell the functions inside useEffect hook to run not only on mounting, but also every time there is a change to the {colors} PROP

  return (
    <>
      {contrastValue ? (
        <h5 className="contrast-checker--info-tag">
          Contrast Score: {contrastValue.small}
        </h5>
      ) : (
        <h5 className="contrast-checker--info-tag">⏳ Checking Contrast</h5>
      )}
    </>
  ); // Ternary operator to show contrast data once fetched. `.small` accesses small-text readibility a11y score from the fetched result object, which is linked to the specific color through the `color` prop
}
