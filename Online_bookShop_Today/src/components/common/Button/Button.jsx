import React from "react";

const Button = ({ type, text, onClick }) => {
  return (
    <button type={type} className="custom-btn custom-btn-success" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
