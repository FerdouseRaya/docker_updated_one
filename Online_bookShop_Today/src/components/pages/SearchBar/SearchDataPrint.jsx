
//import './SearchBar.scss'
import React, { useState } from "react";



const SearchDataPrint = ({ id, img,rating,  ISBN, title, author, genre, stock, price, pageCount }) => {
    //console.log('addProductToCart:', addProductToCart);
    return (
        <div className="search-data-print">
            <div className="search-data-print-content">
                <img className="search-data-print-image" src={img} alt={title} />
                <div className="search-data_info">
                    <h3>Title: {title}</h3>
                    <h3>ISBN: {ISBN}</h3>
                    <h3>Author: {author}</h3>
                    <h3>Genre: {genre}</h3>
                    <h3>Stock:  {stock}</h3>
                    <h3>PageCount: {pageCount}</h3>
                    <h3>Price:  ${price}</h3>   
                    <h3>Rating:  ${rating}</h3>                    
                </div>
            </div>
        </div>

    );
};
export default SearchDataPrint