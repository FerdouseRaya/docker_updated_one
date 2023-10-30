import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import Shop from "./components/pages/Shop/Shop";
import AddBookform from "./components/form/Add_books_Form/Demo_form";
import DeleteBook from "./components/pages/Books/DeleteBooks";
import UpdateBook from "./components/pages/Books/UpdateBooks";
import Navbar from "./components/common/Navbar/Navbar";
// import SearchBar from "./components/SearchBar/SearchBar";
// import LoginForm from "./components/form/LoginSignUpForm/LoginForm";
import BookDetails from "./components/pages/Books/BookDetails/BookDetails";
import Authenticate from "./components/pages/Authentication/Authentication";
// import SearchBar from "./components/pages/SearchBar/SearchBar";
// import SignUpForm from "./components/form/LoginSignUpForm/SignUpForm";
import LoginSignUp from "./components/pages/LoginSignup/LoginSignup";
import ShowUser from "./components/pages/Users/ShowUsers/ShowUser";
import AddUserform from "./components/pages/Users/AddUsers/AddUsers";
import UpdateUsers from "./components/pages/Users/UpdateUsers/UpdateUsers";
import DeleteUser from "./components/pages/Users/DeleteUsers/DeleteUser";
import ShowCarts from "./components/pages/Cart/ShowCarts";
import SearchBar from "./components/pages/SearchBar/SearchBar";
import UserNavbar from "./components/common/Navbar/UserNavbar";
import Transactions from "./components/pages/Cart/Transaction.jsx";
import ReviewEdit from "./components/pages/ReviewRating/ReviewEdit";
import ForgotPasswordForm from "./components/form/LoginSignUpForm/ForgotPasswordForm";
import ResetPassword from "./components/form/LoginSignUpForm/ResetPassword";
import AddFile from "./components/pages/Filehandler/AddFile/AddFile";
import GetFile from "./components/pages/Filehandler/GetFile/GetFile";
function App() {
  const check = localStorage.getItem("token");
  const decodedToken = check? jwt_decode(check):null;
  const userRole =decodedToken?decodedToken.user.role:null;
  return (
    <>
    <ToastContainer />
     {userRole === 1 ? <Navbar />:<UserNavbar/>}
      
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/home" element={<Shop />} />
        <Route path="/search-results" element={<SearchBar/>} />
        <Route path="/users" element={<ShowUser/>} />
        <Route path="/addUsers" element={<AddUserform/>} />
        {/* <AddBooks /> */}
        <Route element={<Authenticate />}>
          <Route path="/addbooks" element={<AddBookform />} />
          <Route path="/home/:bookID/update" element={<UpdateBook />} />
          <Route path="/home/:bookID/delete" element={<DeleteBook />} />
          <Route path="/users/:userID/edit" element={<UpdateUsers/>} />
          <Route path="/users/:userID/delete" element={<DeleteUser/>} />
          {/* <Route path="/updatebook" element={<UpdateBook />} /> */}
        </Route>

        <Route path="/home/:bookID" element={<BookDetails />} />
        <Route path="/home/review-edit" element={<ReviewEdit/>}/>
        {/* <Route path="/home/:bookId/:reviewId/:userId" element={<ReviewEdit/>}/> */}
        {/* <Route element={<UserCheck/>}>
          
        </Route> */}
        <Route path="/cart" element={<ShowCarts/>} />
        <Route path="/login-signup" element={<LoginSignUp/>}></Route>
        <Route path="/update-info-user" element={<UpdateUsers/>}/>
        <Route path ="/login-signUp/forget-password" element={<ForgotPasswordForm/>}/>
        <Route path ="/reset-password/:token/:user" element={<ResetPassword/>}/>
        {/* <Route path="/login" element={<LoginForm />} /> */}
        <Route path ="/transactions-user" element={<Transactions/>}/>
        <Route path="/files/upload-file/:bookId" element={<AddFile/>}/>
        <Route path="/files/get/:filepath" element={<GetFile/>}/>
      </Routes>
    </>
  );
}

export default App;
