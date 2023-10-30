import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector  } from "react-redux";// Import useDispatch
import "../../Shop/Shop.css"
import Users from "./Users";
import { getUsers } from "../../../../source/slices/userSlice";
import axiosInstanceforUser from '../../../../utils/axiosInstanceforUser'
const ShowUser = () => {
  const [users, setUserData] = useState([]);
  //   const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);
  console.log(allUsers)
  useEffect(() => {
    axiosInstanceforUser
    .get("/viewUsers")
    .then((resp) => resp.data)
    .then((data) => {
      console.log("Data: ", data.result.result);      
      setUserData(data.result.result);
      dispatch(getUsers(data.result.result));
      });
  }, [dispatch]);

  return (
    <div className="my-container">
      <h1>All Users</h1>
      <div className="container">
        <div className="row">
          {users.map((user) => (
            <Users
            key={user.id}
              id={user._id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              balance={user.wallets_balance}
              />
          ))}
  
        </div>
      </div>
    </div>
  );
};

export default ShowUser;
