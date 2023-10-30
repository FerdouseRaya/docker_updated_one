//import "./Books.scss";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const Books = ({
  id,
  img,
  rating,
  languages,
  reviews,
  ISBN,
  title,
  author,
  genre,
  stock,
  price,
  pageCount,
  filepath
}) => {
  // console.log(filepath)
  //console.log('addProductToCart:', addProductToCart);
  const navigate = useNavigate();
  const check = localStorage.getItem("token");
  const decodedToken =check? jwt_decode(check):null;
  const userRole = decodedToken? decodedToken.user.role:null;
  return (
    <div className="book-card">
      <div className="book-card-content">
        <div className="book-card-image">
          <img className="book-image" src={img} alt={title} />
        </div>
        <div className="book-details">
          <h3 className="book-title">{title}</h3>
          <p className="book-author">Author: {author}</p>
          <p classNam="book-rating">Price: ${price}</p>
          <p className="book-rating">Rating: {rating}</p>

          {/* <h4 className="book-reviews-title">Reviews:</h4>
          <ul className="book-reviews">
            {reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul> */}

          <button
            className="book-details-button"
            onClick={() =>
              navigate(`/home/${id}`, {
                replace: true,
                state: { ID: id, title: title },
              })
            }
          >
            Details
          </button>
          <button
                className="book-details-button"
                onClick={() =>
                  navigate(`/files/upload-file/${id}`)
                }
              >
                Upload Descrp.
              </button>
              <button
                className="book-details-button"
                onClick={() =>
                  navigate(`/files/get/${filepath}`)
                }
              >
                Get Descrp.
              </button>
          {userRole === 1 && (
            <>
              <button
                className="book-details-button"
                onClick={() =>
                  navigate(`/home/${id}/update`, {
                    replace: true,
                    state: { ID: id, title: title },
                  })
                }
              >
                Update
              </button>
              <button
                className="book-details-button"
                onClick={() =>
                  navigate(`/home/${id}/delete`, {
                    replace: true,
                    state: { ID: id, title: title },
                  })
                }
              >
                Delete
              </button>

            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Books;
