import React, { useEffect,useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import useLoginHook from "../../../hooks/useLoginHook";
//import './ForgotPass.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
const ResetPassword= () => {
  const {resetPassword}=useLoginHook();
  
    const {token,user}=useParams();
    const navigate = useNavigate();
    console.log(token);
    console.log(user)
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handlerOnSubmit = (data) => {    
        console.log(data.password);
        console.log(data.confirmPassword);
        console.log("Form is submitted");
        const payload = {
          token: token,
          user: user,
          password: data.password,
          confirmPassword: data.confirmPassword
        };
    
        resetPassword(payload)
          .then(() => {
            toast.success("Password reset successful. Redirecting to login-signup page...");
            navigate('/login-signUp');
          })
          .catch((error) => {
            console.error("Password reset failed:", error);
            toast.error("Password reset failed. Please try again.");
          });
      
  };

  useEffect(() => {
    console.log("Errors: ", errors);
  }, [errors]);

  return (
    <div className="reset-password-container">
 <div className="reset-password-form" >
      <form  onSubmit={handleSubmit(handlerOnSubmit)}>
      <label htmlFor="chk" aria-hidden='true'>Reset Password</label>
        <div >
          <h3>Password</h3>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at lease 8 charachters",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
                message:
                  "Password must include uppercase, lowercase, numbers, and special characters",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter Password"
                type="password"
                {...field}
                style={{ border: errors.password ? "1px solid red" : "" }}
              />
            )}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <h3>Confirm Password</h3>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Confirm Password is required",
              minLength: {
                value: 6,
                message: "Minimum length must be 6",
              },
              maxLength: {
                value: 20,
                message: "Max length must be 20",
              },
              validate: (value) =>
                value === watch("password") ||
                "Confirm password should match given password",
            }}
            render={({ field }) => (
              <input
                placeholder="Enter Confirm Password"
                type="password"
                {...field}
                style={{
                  border: errors.confirmPassword ? "1px solid red" : "",
                }}
              />
            )}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Reset</button>
       
        {/* <button type="submit"  onClick={() =>
              navigate(`/login-signUp`)
            }>Submit</button> */}
      </form>
      
    </div>
        </div>
   
  );
};

export default ResetPassword ;
