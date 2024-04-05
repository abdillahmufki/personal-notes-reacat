import React, { useContext } from "react";
import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";

function SearchBar({ keyword, keywordChange }) {
  const { selectLanguage } = useContext(LocaleContext);

  const handleKeywordChange = (event) => {
    keywordChange(event.target.value);
  };

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder={selectLanguage({
          id: "Cari berdasarkan judul ...",
          en: "Search by title...",
        })}
        value={keyword}
        onChange={handleKeywordChange}
      />
    </section>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
