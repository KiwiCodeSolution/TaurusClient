import PropTypes from "prop-types";
import { useState } from "react";
import { Cross, Search } from "../icons/iconComponent";

const SearchBar = ({ clickFn }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = e => {
    setQuery(e.target.value);
    clickFn(e.target.value); // Передаємо значення у функцію, яка була передана з OrdersPage
  };

  const clearQuery = () => {
    setQuery("");
    clickFn(""); // Очищаємо фільтр при натисканні на хрестик
  };

  return (
    <div className="w-[695px] h-9 relative flex items-center">
      <input
        type="search"
        value={query}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="w-[610px] h-full bg-dark-btn-bg pl-2 py-[6px] text-beige outline-none custom-search-input"
      />
      {!query && !isFocused && (
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2" />
      )}
      {query && (
        <button onClick={clearQuery}>
          <Cross className="absolute right-[93px] top-1/2 transform -translate-y-1/2 icon" />
        </button>
      )}
      <button className="w-[85px] h-9 bg-dark-btn-bg border border-beige rounded-r-[3px] text-beige text-sm font-medium cursor-pointer hover:border-base-orange hover:text-base-orange">
        Пошук
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  clickFn: PropTypes.func.isRequired,
};

export default SearchBar;
