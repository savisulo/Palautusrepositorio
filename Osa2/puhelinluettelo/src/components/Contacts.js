const Contacts = ({ name, number, handleDelete }) => {
    return (
        <li>{name} {number} <button onClick={handleDelete}>Delete</button></li>
    )
}

export default Contacts