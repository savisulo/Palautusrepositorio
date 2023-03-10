const Filter = ({ text, search, handleSearchChange }) => <div>{text} <input value={search} onChange={handleSearchChange} /></div>

export default Filter