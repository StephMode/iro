import "./ColorButton.css";

export default function ColorButton() {
  return <button>Lalala</button>;
}

// export default function ColorButton() {
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showDelete, setShowDelete] = useState(false);

//   function handleDeleteConfirm() {
//     // onDeleteColor(cancelButtonStatus); // this only displays clicked-status of delete btn
//     onDeleteColor(color.id); // this is what we will need in order to pass ID of clicked color
//   }

//   function handleDeleteClick() {
//     setShowConfirm(true);
//   }

//   function cancelDelete() {
//     setShowConfirm(false);
//   }

//   function handleEditClick() {
//     setShowEdit(true);
//     setShowDelete(false);
//   }

//   function cancelEdit() {
//     setShowEdit(false);
//   }

//   return (
//     <div className="color-card--button-container">
//       {showDelete === true ? <button>lalala</button> : ""}

//       {/* ternary op for Cancel Button UI */}

//       {!showConfirm ? (
//         <button className="color-card--button" onClick={handleDeleteClick}>
//           🗑️ Delete
//         </button>
//       ) : (
//         <div className="buttons-container--confirm-message">
//           <p>Really delete?</p>
//           <button className="color-card--button" onClick={cancelDelete}>
//             ❌ Cancel
//           </button>
//           <button className="color-card--button" onClick={handleDeleteConfirm}>
//             🗑️ Delete
//           </button>
//         </div>
//       )}

//       {/* ternary op for Edit Button UI */}
//       {!showEdit ? (
//         <button className="color-card--button" onClick={handleEditClick}>
//           🖍️ Edit
//         </button>
//       ) : (
//         <div>
//           <ColorEditor></ColorEditor>
//           <button className="color-card--button" onClick={cancelEdit}>
//             ❌ Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
