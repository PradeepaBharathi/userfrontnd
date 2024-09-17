import React, { useEffect, useState } from "react";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from '../../redux/userSlice';
function Login() {
  const [account, toggleAccount] = useState("login");
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");

        const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, addUserStatus } = useSelector((state) => state.user);
    console.log(addUserStatus);
  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
    const handleLogin = (e) => {
      e.preventDefault();
      let credentials = { email, password };
      dispatch(loginUser(credentials))
  };

  const handleSignup = (e) => {
      e.preventDefault();
      let userData = { username, email, password,phone,profession};
      dispatch(signupUser(userData))
  };
  console.log(user)

  useEffect(()=>{
    if(addUserStatus=='succeeded'){

      setTimeout(()=>{
        navigate("/usersList")
        dispatch({ type: 'user/resetAddUserStatus' });
      },1000)
    }
  })
  return (
    <div className="login-form">
      <ToastContainer />
      <h2 className="title">USERS</h2>

      {account === "login" ? (
        <form className="details">
         <input
            className="form-control login-input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control login-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className=" login-btn-container">
            <button className="btn btn-primary login-button " onClick={handleLogin}>Login</button>
            <div>OR</div>
            <button
              className="btn btn-primary sign-up"
              onClick={() => toggleSignup()}
            >
              Create an account
            </button>
          </div>
        </form>
      ) : (
        <form className="details">
          <input
            className="form-control login-input"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control login-input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control login-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="form-control login-input"
            type="number"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="form-control login-input"
            type="text"
            placeholder="Profession"
            onChange={(e) => setProfession(e.target.value)}
          />
          <div className=" login-btn-container">
            <button className="login-button" onClick={handleSignup}>Register</button>
            <div>OR</div>

            <button
              className="btn btn-primary sign-up"
              onClick={() => toggleSignup()}
            >
              Sign In
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
