//import "./SearchBar.scss";
import "../Shop/Shop.css";
import axiosInstance from "../../../utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchDataPrint from "./SearchDataPrint";
import { FaSearch } from "react-icons/fa";
const SearchBar = () => {
  const [search, setSearch] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  const [productData, setProductData] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [sortParam, setSortParam] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");


  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const callProductApi = () => {
    setIsLoading(true);
    axiosInstance
      .get(`/viewBySearch?search=${search}&page=${page}&limit=${limit}&sortparam=${sortParam}&sortorder=${sortOrder}`)
      .then((resp) => resp.data)
      .then((data) => {
        console.log("Data : ", data.result.result);
        setProductData(data.result.result);
        setErrorMsg("");
        //navigate('/search-results', { searchResult: data.result.result, errorMsg: "No errors" });
        return data;
      })
      .catch((err) => {
        setErrorMsg("Some error occured");
        setProductData([]);
        //navigate('/search-results', { searchResult: [], errorMsg: "Some error" });
        return "Some error";
      })
      .finally(() => {setIsLoading(false)});
  };

  useEffect(() => {
    if (search !== "") {
      clearTimeout(timeoutId);

      const newTimeoutId = setTimeout(() => {
        callProductApi(search);
      }, 3000);

      setTimeoutId(newTimeoutId);
    }
  }, [search, page, limit]);

  //to control the paging portion 
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };
  const handleSortChange=(newSortParam)=>{
    setSortParam(newSortParam);
    callProductApi(search,newSortParam,sortOrder)
  }
  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    callProductApi(search, sortParam, newSortOrder);
  };

  //to do the sorting by price,rating, pageCount, stock


  return (
    <div className="main-container">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          id="search-input"
          placeholder="Type to search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <label>Sort by:</label>
        <select
          value={sortParam}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="price">Price</option>
          <option value="stock">Stock</option>
          {/* <option value="pagecount">Page Count</option> */}
          <option value="rating">Rating</option>
        </select>
        <button 
         onClick={toggleSortOrder}
        >
          {sortOrder === "asc" ?  "Descending":"Ascending" }
        </button>
      </div>
      {/* <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
        <select value={limit} onChange={(e) => handleLimitChange(e.target.value)}>
          <option value="3">3 per page</option>
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="15">15 per page</option>
          <option value="20">20 per page</option>
        </select>
      </div> */}
      <div className="pagination">
        <button
          className={`pagination-button ${page === 1 ? "disabled" : ""}`}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span className="page-indicator">Page {page}</span>
        <button
          className={`pagination-button ${
            productData.length < limit ? "disabled" : ""
          }`}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
        <select
          className="results-per-page-select"
          value={limit}
          onChange={(e) => handleLimitChange(e.target.value)}
        >
          <option value="3">3 per page</option>
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="15">15 per page</option>
          <option value="20">20 per page</option>
        </select>
      </div>

      <div className="search-results">
        {isLoading ? (
          <div className="loading-indicator">Loading...</div>
        ) : (
          productData.map((book) => (
            <SearchDataPrint
              key={book.id}
              id={book._id}
              title={book.title}
              ISBN={book.ISBN}
              author={book.author}
              genre={book.genre}
              stock={book.stock}
              pageCount={book.pageCount}
              price={book.price}
              img={book.img}
              rating={book.rating}
            />
          ))
        )}
        {errorMsg && <h4 className="error-message">Error: {errorMsg}</h4>}
      </div>
    </div>
  );
};
export default SearchBar;
