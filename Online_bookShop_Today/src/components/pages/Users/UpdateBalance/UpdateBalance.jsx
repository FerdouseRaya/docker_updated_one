import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

const BalanceUpdateForm = ({user}) => {
  console.log(user);
  const onSubmit = (data) => {
    updateBalanceUser(data)
    console.log(data);
  };
  const { handleSubmit, control, formState: { errors } } = useForm();
  return (
    <div>
    <h3>Update Balance</h3>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Amount:
        <Controller
          name="amount"
          control={control}
          rules={{
            required: 'Amount is required',
            validate: {
              minValue: (value) => value >= 200 || 'Amount must be at least 200',
              maxValue: (value) => value <= 2000 || 'Amount must not exceed 2000',
            },
          }}
          render={({ field }) => (
            <div>
              <input type="number" {...field} />
              {errors.amount && <p>{errors.amount.message}</p>}
            </div>
          )}
        />
      </label>
      <br />
      <button type="submit">Update Balance</button>
    </form>
  </div>
  );
};

export default BalanceUpdateForm;
