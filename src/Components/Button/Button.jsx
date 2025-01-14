import PropTypes from "prop-types";

export default function Button({ onClick, style, buttonType }) {
  return (
    <button onClick={onClick} style={style}>
      {buttonType === "add" && "Add"}
      {buttonType === "edit" && "Edit"}
    </button>
  );
}

const buttonTypes = ["add", "edit", "delete"];

Button.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  buttonType: PropTypes.oneOf(buttonTypes).isRequired,
};
