import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FiSearch, FiX } from "react-icons/fi";

function SearchBar({ searchTerm, onSearch, placeholder = "Search tasks..." }) {
  const [localSearch, setLocalSearch] = useState(searchTerm || "");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearch(value);
  };

  const handleClear = () => {
    setLocalSearch("");
    onSearch("");
  };

  return (
    <div className="search-bar-container">
      <InputGroup className="search-input-group">
        <InputGroup.Text className="search-icon">
          <FiSearch size={16} />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={localSearch}
          onChange={handleInputChange}
          className="search-input"
        />
        {localSearch && (
          <Button
            variant="outline-secondary"
            className="clear-search-btn"
            onClick={handleClear}
            title="Clear search"
          >
            <FiX size={16} />
          </Button>
        )}
      </InputGroup>
    </div>
  );
}

export default SearchBar;