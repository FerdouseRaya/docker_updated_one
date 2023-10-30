import { useDispatch } from "react-redux";
import { clearUser } from "../../../source/slices/authenticationSlice";
import { useNavigate } from "react-router-dom";
//import "./Logout.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged Out Successfully!', {
      position: 'top-right',
      autoClose: 3000, 
    });
    dispatch(clearUser());
    navigate("/login-signUp");
  };

  return (
    <div className="button-container">
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  );
}

export default LogoutButton;
