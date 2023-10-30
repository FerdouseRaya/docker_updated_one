import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstanceforAuth from "../utils/axiosInstanceforAuth";

const useLoginHook = () => {
  const [bookData, setBookData] = useState([]);
  const navigate = useNavigate();
  const loginPost = (formData) => {
    console.log("The form data ", formData);
    axiosInstanceforAuth
      .post("/login", formData)
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
  const forgetPassword = (dataforget) => {
    console.log("The form data ", dataforget);
    axiosInstanceforAuth
      .post("/forgot-password", dataforget)
      .then((resp) => {
        // navigate("/");
        return resp.data;
      })
      .then((data) => {
        console.log("Successfully logged!", data);
        // setBookData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const resetPassword = (payload) => {
    console.log("The form data reset ", payload);
    axiosInstanceforAuth
      .post("/reset-password", payload)
      .then((resp) => {
        // navigate("/");
        return resp.data;
      })
      .then((data) => {
        console.log("Successfully Reset!", data);
        setBookData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return { bookData, setBookData, loginPost, forgetPassword, resetPassword };
};

export default useLoginHook;
