import PropTypes from "prop-types";

export default function Button({ onClick, style, buttonType }) {
  const buttonTypeLabes = {
    labels: [
      { labelType: "add", buttonLabel: "Add" },
      { labelType: "edit", buttonLabel: "Edit" },
      { labelType: "delete", buttonLabel: "Delete" },
      { labelType: "save", buttonLabel: "Save" },
      { labelType: "cancel", buttonLabel: "Cancel" },
      { labelType: "copy", buttonLabel: "Copy" },
    ],
    returnLabel() {
      const buttonLabelFinder = this.labels.find(
        (label) => label.labelType === buttonType
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
