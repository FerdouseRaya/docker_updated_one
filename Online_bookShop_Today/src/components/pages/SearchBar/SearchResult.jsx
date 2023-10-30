
    import React from 'react';
    import { useLocation } from 'react-router-dom'; 
    import { Outlet } from 'react-router-dom'; 
   import SearchDataPrint from './SearchDataPrint';
    const SearchResults = () => {
      
      const location = useLocation();
      const searchResults = location.state.searchResult;
    
      return (
        <div>
          
          <div className="search-results">
          {searchResults.map((book) => (
            <SearchDataPrint
              key={book.id}
              id={book.id}
              title={book.title}
              ISBN={book.ISBN}
              author={book.author}
              genre={book.genre}
              stock={book.stock}
              pageCount={book.pageCount}
              price={book.price}
              img={book.img}
            />
          ))}
          {errorMsg && <h4>Error: {errorMsg}</h4>}
        </div>
        <div>
        <Outlet />
      </div>
        </div>
      );
    };
    
    export default SearchResults;
    