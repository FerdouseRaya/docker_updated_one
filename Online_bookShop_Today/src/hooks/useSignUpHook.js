import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstanceforAuth from "../utils/axiosInstanceforAuth";

const useSigUpHook = () => {
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();
  const signupPost = (formData) => {
    console.log("The form data ", formData);
    axiosInstanceforAuth
      .post("/sign-up", formData)
      .then((resp) => {
        const token = resp.data.result.token;
        localStorage.setItem("token", token);
        console.log(token);
        navigate("/login-signUp");
        return resp.data;
      })
      .then((data) => {
        console.log("Successfully logged!", data);
        setBookData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return { bookData, setBookData, signupPost };
};

export default useSigUpHook;
