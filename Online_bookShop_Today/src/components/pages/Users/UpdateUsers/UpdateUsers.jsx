import React, { useEffect,useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from "react-router-dom";
import { updateUserInfo } from "../../../../source/slices/userSlice";
import useUserUpdateHook from '../../../../hooks/Users/useUserUpdateHook';
//import '../../../form/Add_books_Form/Demo_form.scss';
import BalanceUpdateForm from "../UpdateBalance/UpdateBalance";



const UpdateUsers = () => {
  const { updateUserByID,loading } =useUserUpdateHook();
  const dispatch =useDispatch();
  const location = useLocation();
  console.log("The state data ", location);
  const { userID } = useParams();
  console.log(userID)
    const userInfo = useSelector((state) => state.users);
    const [formData, setFormData] = useState({
        userID:userID,
        name:'',
        phone:'',
        address:{
            house:'',
            road:'',
            area:'',
            city:'',
            country:''

        }
      });
      const {
        handleSubmit,
        control,
        formState: { errors },
        setValue      

    } = useForm();


  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      userID: userID,
      updatedData: formData
    };

    console.log("Form Submitted");
    const filteredData = Object.keys(payload.updatedData).reduce((acc, key) => {
      if (payload.updatedData[key] || key === "userID") {
        acc[key] = payload.updatedData[key];
      }
      return acc;
    }, {});

    console.log("Form Submitted",payload);
    toast.success('Successfully Updated User Info!', {
      position: 'top-right',
      autoClose: 3000,
    })
    updateUserByID(payload);
    dispatch(updateUserInfo(payload.updatedData));
    setValue("name", "Name");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <div >
      <h1>Update Information</h1>
      {loading==true && <h2>Loading...</h2>}
      <form className="form-container" onSubmit={handleUpdate}>
        
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
                onChange={handleInputChange}
                style={{ border: errors.name ? "1px solid red" : "" }}
              />
            )}
          />
          {errors.name && <h5>{errors.name.message}</h5>}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                {...field}
              />
            )}
          />
          {errors["address.country"] && (
            <p className="error-message">{errors["address.country"].message}</p>
          )}
        </div>
        <BalanceUpdateForm user={userID}/>
        <button type="submit" className="custom-btn custom-btn-success">Submit</button>
      </form>
    </div>
  );
};

export default UpdateUsers;