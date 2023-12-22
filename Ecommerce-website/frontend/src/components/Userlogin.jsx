// src/components/LoginForm.js
import React, { useState,useContext } from "react";
import { Mycontext } from "../Context";
import { useNavigate } from "react-router-dom";
import '../styles/register.css'

const Userlogin = () => {
 

  const{username,setUsername}=useContext(Mycontext)
  const[password,setPassword]=useState("")

  const { formData, setFormData } = useContext(Mycontext);
  const nav=useNavigate();

 

  const handleSubmit = (e) => {
    e.preventDefault();
       const abc = formData.find((item) => item.username === username && item.password===password);
  if(abc){
    alert("login successful")
    nav("/")
   
  }
  else{
    alert("invalid username or password")
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
