import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {useDispatch} from 'react-redux';
import useUserAddHook from '../../../../hooks/Users/useUserAddHook'
import {addUsers} from '../../../../source/slices/userSlice'
//import '../../../form/Add_books_Form/Demo_form.scss'
const AddUserform = () => {
    const { createUser } = useUserAddHook();
    const dispatch =useDispatch()
    const {
      handleSubmit,
      control,
      formState: { errors }
  } = useForm();

  const handlerOnSubmit = (data) => {
    console.log("Form Data:", data);
    createUser(data);
    dispatch(addUsers(data))
  };

  useEffect(() => {
    console.log("Errors: ", errors);
  }, [errors]);

  return (
    <div>
      <h1>Add Users</h1>
      <form className="form-container" onSubmit={handleSubmit(handlerOnSubmit)}>
        <div>
          <p>Enter UserName</p>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "UserName is required",
              minLength: {
                value: 6,
                message: "Minimum length must be 6",
              },
              maxLength: {
                value: 30,
                message: "Maximum length must be 30",
              },
            }}
            render={({ field }) => (
              <input
                type="text"
                label="name"
                placeholder="Enter Username"
                className="custom-input"
                {...field}
                style={{ border: errors.name ? "1px solid red" : "" }}
              />
            )}
          />
          {errors.name && <h5>{errors.name.message}</h5>}
        </div>

        <div>
          <p>Enter Email</p>
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
                  <input type="text"
                  label="email"
                  placeholder="Enter Email"
                  className="custom-input"
                  {...field}
                    style={{ border: errors.email ? "1px solid red" : "" }} />
                )}
              />
              {errors.email && <h5>{errors.email.message}</h5>}
        </div>
        <div>
              <p>Password</p>
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
                  type="password"
                  label="password"
                  placeholder="Enter password"
                  className="custom-input"
                    {...field}
                    style={{ border: errors.password ? "1px solid red" : "" }}
                  />
                )}
              />
              {errors.password && <h5>{errors.password.message}</h5>}
            </div>

            <div>
              <p>Phone Number</p>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone is required",
            }}
            render={({ field }) => (
              <input
              type="text"
                  label="phone"
                placeholder="Enter Phone"
                className="custom-input"
                {...field}
                style={{ border: errors.phone ? "1px solid red" : "" }}
              />
            )}
          />
          {errors.phone && <h5>{errors.phone.message}</h5>}
        </div>
        <div>
          <p>Enter Address</p>
          <Controller
            name="address.house"
            control={control}
            rules={{
              required: "House is required",
              maxLength: {
                value: 10,
                message: "Maximum length must be 10 characters",
              },
            }}
            render={({ field }) => (
              <input
                type="text"
                label="address.house"
                placeholder="House"
                className="custom-input"
                {...field}
              />
            )}
          />
          {errors["address.house"] && (
            <p className="error-message">{errors["address.house"].message}</p>
          )}
        </div>

        <div>
          <Controller
            name="address.road"
            control={control}
            rules={{
              required: "Road is required",
              maxLength: {
                value: 50,
                message: "Maximum length must be 50 characters",
              },
            }}
            render={({ field }) => (
              <input
                type="text"
                label="address.road"
                placeholder="Road"
                className="custom-input"
                {...field}
              />
            )}
          />
          {errors["address.road"] && (
            <p className="error-message">{errors["address.road"].message}</p>
          )}
        </div>

        <div>
          <Controller
            name="address.area"
            control={control}
            rules={{
              required: "Area is required",
              maxLength: {
                value: 50,
                message: "Maximum length must be 50 characters",
              },
            }}
            render={({ field }) => (
              <input
                type="text"
                label="address.area"
                placeholder="Area"
                className="custom-input"
                {...field}
              />
            )}
          />
          {errors["address.area"] && (
            <p className="error-message">{errors["address.area"].message}</p>
          )}
        </div>

        <div>
          <Controller
            name="address.city"
            control={control}
            rules={{
              required: "City is required",
              maxLength: {
                value: 50,
                message: "Maximum length must be 50 characters",
              },
            }}
            render={({ field }) => (
              <input
                type="text"
                label="address.city"
                placeholder="City"
                className="custom-input"
                {...field}
              />
            )}
          />
          {errors["address.city"] && (
            <p className="error-message">{errors["address.city"].message}</p>
          )}
        </div>

        <div>
          <Controller
            name="address.country"
            control={control}
            rules={{
              required: "Country is required",
              maxLength: {
                value: 50,
                message: "Maximum length must be 50 characters",
              },
            }}
            render={({ field }) => (
              <input
                type="text"
                label="address.country"
                placeholder="Country"
                className="custom-input"
                {...field}
              />
            )}
          />
          {errors["address.country"] && (
            <p className="error-message">{errors["address.country"].message}</p>
          )}
        </div>
        <div>
        <p>Role</p>
          <Controller
            name="role"
            control={control}
            rules={{
              required: "Role is required",              
            }}
            render={({ field }) => (
              <input
                type="text"
                label="role"
                placeholder="Enter Role"
                className="custom-input"
                {...field}
              />
            )}
          />
          {errors.role && (
            <h5 className="error-message">{errors.role.message}</h5>
          )}
        </div>
        
        <button type="submit" className="custom-btn custom-btn-success">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddUserform;
