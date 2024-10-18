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

import React, { useEffect, useState } from "react";
import "./ContrastChecker.css";

async function getContrastCheck(color) {
  try {
    const response = await fetch(
      "https://www.aremycolorsaccessible.com/api/are-they",
      {
        method: "POST",
        body: JSON.stringify({ colors: [color.hex, color.contrast] }),
        headers: {
          "Content-Type": "application/json", // set content-type to application/json
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Issue with fetch operation");
  }
}

export default function ContrastChecker({ color }) {
  const [contrastValue, setContrastValue] = useState(null);

  useEffect(() => {
    const checkContrastValue = async () => {
      const contrastValueResult = await getContrastCheck(color); // call the API fetch fn with color prop as argument
      //   console.log(checkContrastValue);
      setContrastValue(contrastValueResult);
      //   console.log("Result to:", contrastValue);
    };

    checkContrastValue();
  }, [color]);

  return (
    <>
      {result ? (
        <h5>Overall Contrast Score: {contrastValue.overall}</h5>
      ) : (
        <h5>Checking Contrast</h5>
      )}
    </>
  );
}
