import PropTypes from "prop-types";
import { IoTrash } from "react-icons/io5";
import { IoBrush } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosSave } from "react-icons/io";

export default function Button({ onClick, style, buttonType }) {
  const buttonTypeLabes = {
    labels: [
      { labelType: "add", buttonLabel: <IoAddCircle /> },
      { labelType: "edit", buttonLabel: <IoBrush /> },
      { labelType: "delete", buttonLabel: <IoTrash /> },
      { labelType: "save", buttonLabel: <IoIosSave /> },
      { labelType: "cancel", buttonLabel: <MdOutlineCancel /> },
      { labelType: "copy", buttonLabel: <IoCopyOutline /> },
    ],
    returnLabel() {
      const buttonLabelFinder = this.labels.find(
        (label) => label.labelType === buttonType,
      );
      return buttonLabelFinder ? buttonLabelFinder.buttonLabel : "";
    },
  };

  return (
    <button onClick={onClick} style={style}>
      {buttonTypeLabes.returnLabel()}
    </button>
  );
}

const buttonTypes = ["add", "edit", "delete", "save", "cancel", "copy"];

Button.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  buttonType: PropTypes.oneOf(buttonTypes).isRequired,
};
