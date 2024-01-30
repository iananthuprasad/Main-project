// src/components/LoginForm.js
import React, { useState,useContext } from "react";
import { Mycontext } from "../Context";
import { useNavigate } from "react-router-dom";
import '../styles/register.css'
import axios from "axios";
import Getuserid from "./sessionid";

const Userlogin = () => {
 

  const { username, setUsername, userToken, setUserToken,password,setPassword,formData,setFormData,alluser,setAlluser ,wishid,setWishid} =useContext(Mycontext);
 
  const nav=useNavigate();
  const sessionid=Getuserid()

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!username || !password) {
        alert("Username and password are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        {
          username,
          password,
        },
        {
          withCredentials: true, // Include credentials if using cookies for authentication
        }
      );


    
      
     

      const data = response.data;
      console.log(response.data);
      console.log("token in frontEnd", data.token);
       console.log("user id", data.UserID);
      console.log("Login successful", data.message);
      setUserToken(data.token);
      alert("Login Success!!!!");
      nav("/");
      

        sessionStorage.setItem('usertoken',data.token)
        sessionStorage.setItem("userid", data.UserID);



    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        // The request was made and the server responded with an error status
        console.error("Server response:", error.response.data);
      }

      alert("Login failed!!!");
    }
  };




  return (
    <div className="bodyyy">
      <h1>WELCOME TO ASMO</h1>
      <form>
        <h4>LOGIN </h4>

        <input
          type="text"
        
        
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Userlogin;
