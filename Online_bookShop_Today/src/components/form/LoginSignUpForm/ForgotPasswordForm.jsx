import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import useLoginHook from "../../../hooks/useLoginHook";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../../source/slices/authenticationSlice";
//import './ForgotPass.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const { forgetPassword } = useLoginHook();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "", 
    },
  });

  const handlerOnSubmit = (data) => {
    console.log("Form is submitted");
    forgetPassword(data);
  };

  useEffect(() => {
    console.log("Errors: ", errors);
  }, [errors]);

  return (
    <div className="forgot-password-form">
      <form onSubmit={handleSubmit(handlerOnSubmit)}>
        <label htmlFor="chk" aria-hidden='true'>Forgot Password</label>
        <div>
          <h3>Email</h3>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <input
                placeholder="Enter email"
                {...field}
              />
            )}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <button type="submit" className="btn" >Submit</button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
