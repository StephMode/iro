import PropTypes from "prop-types";

export default function Button({ onClick, style, type }) {
  return (
    <button onClick={onClick} style={style}>
      {type === "add" && "Add"}
    </button>
  );
}

const buttonTypes = ["add", "edit", "delete"];

Button.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.oneOf(buttonTypes).isRequired,
};
