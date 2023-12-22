
import React, { useContext, useState } from "react";
import { Mycontext } from "../Context";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
 
  const {formData,setFormData}=useContext(Mycontext)
  const nav = useNavigate();
  const[username,setUsername]=useState("")
   const [email, setEmail] = useState("");
   const [password,setPassword]=useState("")
   const [cpassword, setCpassword] = useState("");

 
  
  const handleSubmit = (e) => {
  e.preventDefault();


  if(username!="" && email!="" &&password!="" &&cpassword!=""){
  const abc=formData.find((item)=>item.username===username)
  
 if (abc) {
   alert("Username is already taken");
   return;
 }
    if(!abc){
    if (password !== cpassword) {
      alert("Passwords don't match");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least one capital letter and one number");
      return;
    }

  
    if (!email.includes("@")) {
      alert("Email must contain @ symbol");
      return;
    }
     setFormData([...formData, { username, email, password, cpassword }]);
  }
  alert("successfully registered")
  nav("/userlogin");
}
else{
  alert("enter all the fields")
}

setUsername("")
setEmail("")
setPassword("")
setCpassword("")
    
  };

  return (
    <div className="bodyyy">
      <h1>WELCOME TO  ASMO</h1>
      <form>
          <h4>REGISTER </h4>
       
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Enter the Username"
            onChange={(e) => setUsername(e.target.value)}
          />
       
        <br />
       
        
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter the Email"
            onChange={(e) => setEmail(e.target.value)}
          />
       
        <br />
     
     
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter the Password"
            onChange={(e)=>setPassword(e.target.value)}
          />
       
        <br />
     
      
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Re-enter the Password"
            onChange={(e)=>setCpassword(e.target.value)}
          />
       
        <br />
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
        <p>Already Have an Account? <Link to="/userlogin">Login</Link></p>
      </form>
      <Link to="/edituser">edit user</Link>
    </div>
  );
};

export default Register;
