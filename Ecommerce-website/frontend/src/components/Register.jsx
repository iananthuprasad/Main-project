
import React, { useContext, useEffect, useState } from "react";
import { Mycontext } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
 
  const {formData,setFormData}=useContext(Mycontext)
  const nav = useNavigate();
  const[username,setUsername]=useState("")
   const [email, setEmail] = useState("");
   const [password,setPassword]=useState("")
   const [confirmPassword, setConfirmPassword] = useState("");

 
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.example.com/user");
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  fetchData(); // Call the function to fetch data when the component mounts
}, []);



 const handleSubmit = async (e) => {
   e.preventDefault();

   // Basic form field validations
   if (!username || !email || !password || !confirmPassword) {
     alert("All fields are required");
     return;
   }

   // Check if username is already taken
   const isUsernameTaken = formData.some((item) => item.username === username);
   if (isUsernameTaken) {
     alert("Username is already taken");
     return;
   }

   // Password match check
   if (password !== confirmPassword) {
     alert("Passwords don't match");
     return;
   }

   // Password complexity check
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
   if (!passwordRegex.test(password)) {
     alert("Password must contain at least one letter and one number");
     return;
   }

   // Email format check
   if (!email.includes("@")) {
     alert("Email must contain @ symbol");
     return;
   }

   try {
     const response = await axios.post(
       "http://localhost:8000/api/users/register",
       {
         username,
         email,
         password,
         confirmPassword,
       }
     );

     if (response.status === 201) {
       alert("Registration successful");
       nav("/userlogin");
     } else {
       alert("Registration failed");
     }
   } catch (error) {
     console.error("Registration error:", error);

     if (error.response) {
       // The request was made and the server responded with an error status
       console.error("Server response:", error.response.data);
     }

     alert("Registration failed");
   }
 };


   
//   const handleSubmit = (e) => {
//   e.preventDefault();


//   if(username!="" && email!="" &&password!="" &&cpassword!=""){
//   const abc=formData.find((item)=>item.username===username)
  
//  if (abc) {
//    alert("Username is already taken");
//    return;
//  }
//     if(!abc){
//     if (password !== cpassword) {
//       alert("Passwords don't match");
//       return;
//     }

//     const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
//     if (!passwordRegex.test(password)) {
//       alert("Password must contain at least one capital letter and one number");
//       return;
//     }

  
//     if (!email.includes("@")) {
//       alert("Email must contain @ symbol");
//       return;
//     }
//      setFormData([...formData, { username, email, password, cpassword }]);
//   }
//   alert("successfully registered")
//   nav("/userlogin");
// }
// else{
//   alert("enter all the fields")
// }

// setUsername("")
// setEmail("")
// setPassword("")
// setCpassword("")
    
//   };

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
            onChange={(e)=>setConfirmPassword(e.target.value)}
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
