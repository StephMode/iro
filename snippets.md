# previous button code for Color com

```JS

<div className="color-card--button-container">
        {/* ternary op for edit/btns switch */}

        {/* test ternary for cancel btn ausblenden */}

        {/* {showDelete === true ? <button>lalala</button> : ""} */}

        {/* ternary op for Cancel Button UI */}
        {!showConfirm ? (
          <button className="color-card--button" onClick={handleDeleteClick}>
            🗑️ Delete
          </button>
        ) : (
          <div className="buttons-container--confirm-message">
            <p className="color-card--message">Really delete?</p>
            <button className="color-card--button" onClick={cancelDelete}>
              ❌ Cancel
            </button>
            <button
              className="color-card--button"
              onClick={handleDeleteConfirm}
            >
              🗑️ Delete
            </button>
          </div>
        )}
        {/* ternary op for cancel btn end */}

        {/* ternary op for Edit Button UI */}
        {showEdit === true ? (
          <div>
            <ColorEditor></ColorEditor>
            <button className="color-card--button" onClick={cancelEdit}>
              ❌ Cancel
            </button>
          </div>
        ) : (
          <button className="color-card--button" onClick={handleEditClick}>
            🖍️ Edit
          </button>
        )}
        {/* ternary op for edit btn end */}
      </div>

```

# Playground

```JS

{showDelete === true ? <button>lalala</button> : ""}

        {/* ternary op for Cancel Button UI */}

        {!showConfirm ? (

        )}


        {showEdit ===true ? (
          <div>
            <ColorEditor></ColorEditor>
            <button className="color-card--button" onClick={cancelEdit}>
              ❌ Cancel
            </button>
             </div>) : (
            <button className="color-card--button" onClick={handleDeleteClick}>
            🗑️ Delete
            </button>
            <button className="color-card--button" onClick={handleEditClick}>
            🖍️ Edit
            </button>
            ) : (
            <div className="buttons-container--confirm-message">
            <p>Really delete?</p>
            <button className="color-card--button" onClick={cancelDelete}>
              ❌ Cancel
            </button>
            <button
              className="color-card--button"
              onClick={handleDeleteConfirm}
            >
              🗑️ Delete
            </button>
          </div>
        )}









      </div>


```
