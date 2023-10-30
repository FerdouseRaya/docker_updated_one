
import { useNavigate } from "react-router-dom";
const Users = ({id, name,email,phone,balance,verified,address

}) => {
  const navigate = useNavigate();

  return (
    <div className="book-card">
      <div className="book-card-content">
        <div className="book-details">
          <p>Id:{id}</p>
          <p className="book-author">User Name: {name}</p>
          <p className="book-author">Email:{email}</p>
          <p className="book-author">Phone:{phone}</p>
          <p className="book-author">Balance:{balance}</p>
          <button
            className="book-details-button"
            onClick={() =>
              navigate(`/users/${id}/edit`, {
                replace: true,
                state: { ID: id, name:name },
              })
            }
          >
           Edit
          </button>
          <button
            className="book-details-button"
            onClick={() =>
              navigate(`/users/${id}/delete`, {
                replace: true,
                state: { ID: id, name:name  },
              })
            }
          >
           Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default Users;
