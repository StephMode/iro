import { useEffect, useState } from "react";
import "./ContrastChecker.css";

async function fetchContrastCheckColor(color) {
  try {
    const response = await fetch(
      "https://www.aremycolorsaccessible.com/api/are-they",
      {
        method: "POST",
        body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Issue with fetch operation");
  }
}

export default function ContrastChecker({ color }) {
  const [contrastValue, setContrastValue] = useState(null);

  useEffect(() => {
    const checkContrastValue = async () => {
      const contrastResult = await fetchContrastCheckColor(color);
      setContrastValue(contrastResult);
    };
    checkContrastValue();
  }, [color]);

  return (
    <>
      {contrastValue ? (
        <h5 className="contrast-checker--info-tag">
          a11y score: {contrastValue.small}
        </h5>
      ) : (
        <h5 className="contrast-checker--info-tag">⏳ Checking Contrast</h5>
      )}
    </>
  );
}
