import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFormType } from './authenticationSlice'; // Import the toggleFormType action

const AuthCheck = () => {
  const formType = useSelector((state) => state.auth.formType); // Access the formType from the Redux store
  const dispatch = useDispatch();

  const toggleForm = () => {
    dispatch(toggleFormType()); // Dispatch the action to toggle the form type
  };

  return (
    <div className="wrapper">
      <div className="form-container">
        {formType === 'login' ? <LoginForm /> : <SignUpForm />}
        <div className="link">
          <p onClick={toggleForm}>
            {formType === 'login' ? 'Switch to Sign Up' : 'Switch to Login'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCheck;
