import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import useLoginHook from "../../../hooks/useLoginHook";
import { useDispatch,useSelector  } from 'react-redux';
import { setUser } from "../../../source/slices/authenticationSlice";
//import '../../pages/LoginSignup/LoginSignup.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { loginPost } = useLoginHook();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login_info = useSelector((state) => state.user);
  console.log("all",login_info);

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
      password: "",
      // confirmPassword: "",
    },
  });

  const handlerOnSubmit = (data) => {
    console.log("Form is submitted ");
   
    loginPost(data)
    .then((response) => {
      dispatch(setUser(data));
      toast.success('Successfully Logged in!', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/home');
    })
    .catch((error) => {
      console.error("Login failed:", error);
    });
  };

  useEffect(() => {
    console.log("Errors: ", errors);
  }, [errors]);



  return (
    <div>
      
        <form onSubmit={handleSubmit(handlerOnSubmit)}>
          {/* <h2>Login Form</h2> */}
          <label htmlFor="chk" aria-hidden='true'>Login</label>
          
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
                  <input placeholder="Enter email" {...field}
                    style={{ border: errors.email ? "1px solid red" : "" }} />
                )}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <h3>Password</h3>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at lease 8 charachters"
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
                    message: 'Password must include uppercase, lowercase, numbers, and special characters',
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
            <Link to='/login-signUp/forget-password'>Forget Password?</Link>
             
            </div>          
            <button type="submit" className="btn">Submit</button>
            
            {/* <Button type={'submit'}></Button> */}
          
        </form>
      
    </div>
  );
};

export default LoginForm;