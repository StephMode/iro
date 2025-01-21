import PropTypes from "prop-types";
import "./Button.css";
import { LuSquareX } from "react-icons/lu";
import { LuPenLine } from "react-icons/lu";
import { LuSquarePlus } from "react-icons/lu";
import { LuCopy } from "react-icons/lu";
import { LuDelete } from "react-icons/lu";
import { LuSave } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

export default function Button({ onClick, buttonType, isDisabled }) {
  const buttonTypeLabes = {
    labels: [
      { labelType: "add", buttonLabel: <LuSquarePlus /> },
      { labelType: "edit", buttonLabel: <LuPenLine /> },
      { labelType: "delete", buttonLabel: <LuDelete /> },
      { labelType: "save", buttonLabel: <LuSave /> },
      { labelType: "cancel", buttonLabel: <LuSquareX /> },
      { labelType: "copy", buttonLabel: <LuCopy /> },
      { labelType: "successClipboard", buttonLabel: <LuCopyCheck /> },
    ],
    returnLabel() {
      const buttonLabelFinder = this.labels.find(
        (label) => label.labelType === buttonType,
      );
      return buttonLabelFinder ? buttonLabelFinder.buttonLabel : "";
    },
  };

  return (
    <button
      onClick={onClick}
      className={!isDisabled ? "buttonStyled" : "buttonDisabled"}
    >
      {buttonTypeLabes.returnLabel()}
    </button>
  );
}

const buttonTypes = [
  "add",
  "edit",
  "delete",
  "save",
  "cancel",
  "copy",
  "successClipboard",
];

Button.propTypes = {
  onClick: PropTypes.func,
  buttonType: PropTypes.oneOf(buttonTypes).isRequired,
  isDisabled: PropTypes.bool,
};
