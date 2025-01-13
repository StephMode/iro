export default function Button({ onClick, style, type }) {
  const buttonTypes = ["add", "edit", "delete"];
  const checkButtonType = buttonTypes.find((buttonType) => type === buttonType);

  !type &&
    console.warn(
      "Button type missing. Provide one out of the valid types:",
      buttonTypes
    );

  !onClick && console.warn("Please add onClick for button functionality");

  checkButtonType === undefined &&
    console.error(
      type,
      "is not a valid type. Provide one out of the valid types:",
      buttonTypes
    );

  return (
    <button onClick={onClick} style={style}>
      {type === "add" && "Add"}
    </button>
  );
}
