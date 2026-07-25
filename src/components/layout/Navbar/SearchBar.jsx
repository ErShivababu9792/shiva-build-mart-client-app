import styles from "./SearchBar.module.css";

const SearchBar = ({ search, setSearch }) => {

  console.log("SEARCHBAR LOADED");


  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    console.log("SEARCH TEXT:", value);

  };


  return (
    <input
      className={styles.search}
      placeholder="Search products..."
      value={search}
      onChange={handleSearch}
    />
  );

};

export default SearchBar;