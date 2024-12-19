

export default function ThemeSelector() {
  return (
    <>
    <h2>ThemeSelector</h2>
    <div style={{display: "flex"}}>
    <form>
        <select>
            <option>Theme 1</option>
            <option>Theme 2</option>
        </select>
    </form>
    <button>Add</button>
    <button>Edit</button>
    <button>Delete</button>
    </div>
    </>
  )
}