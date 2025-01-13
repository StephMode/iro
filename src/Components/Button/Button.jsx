export default function Button({ onClick, style, type }) {
  return (
    <button onClick={onClick} style={style}>
      {type === "add" && "Add"}
    </button>
  );
}
