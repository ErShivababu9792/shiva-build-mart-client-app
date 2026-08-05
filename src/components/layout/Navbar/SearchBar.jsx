import styles from "./SearchBar.module.css";

const SearchBar = ({ search, setSearch }) => {




  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);



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