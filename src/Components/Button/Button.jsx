import PropTypes from "prop-types";

export default function Button({ onClick, style, type }) {
  return (
    <button onClick={onClick} style={style}>
      {type === "add" && "Add"}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  type: PropTypes.oneOf(["add", "edit", "delete"]).isRequired,
};
