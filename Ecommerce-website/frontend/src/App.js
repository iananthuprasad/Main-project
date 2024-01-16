import React, { Component, useState,useEffect } from 'react';
import axios from "axios"
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Shop from './components/Shop';
import {Mycontext} from './Context'
import Men from './components/Men';
import Navbar from './components/Navbar';
import Women from './components/Women';
import Kids from './components/KIds';
import Wish from './components/Wish';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Itemdetails from './components/Itemdetails';
import Register from './components/Register';
import Userlogin from './components/Userlogin';
import Admin from './components/Admin';
import Addproduct from './components/Addproduct';
import Editproducts from './components/Editproducts';
import Edituser from './components/Edituser';
import { newproducts } from './dataset/new';
import UserDetails from './components/UserDetails';
import Adminlogin from './components/Adminlogin';

const App = () => {


  const [items, setItems] = useState([]);

   const [newitems,setNewitems]=useState(newproducts)
   const [search, setSearch] = useState("");
 
   const[matcheditems,setMatcheditems]=useState([])

  const [wishlist,setWishlist]=useState([])
  const [cartlist,setCartlist]=useState([])
  const [clickedButtons, setClickedButtons] = useState([]);
  const [id,setId]=useState("")
   const [formData, setFormData] = useState([])
   const[username,setUsername]=useState([])
    const [userToken, setUserToken] = useState(null);
     const [password, setPassword] = useState("");
     

   
       useEffect(() => {
         // Axios GET request
         axios
           .get(`http://localhost:8000/api/products`)
           .then((response) => {
             // Handle the successful response
             setItems(response.data);
           })
           .catch((error) => {
             // Handle the error
             console.error("Error fetching data:", error);
           });
       }, []);

       
  
  return (
    <div>
      <BrowserRouter>
        <Mycontext.Provider
          value={{
            items,
            setItems,
            search,
            setSearch,
            matcheditems,
            setMatcheditems,
            wishlist,
            setWishlist,
            cartlist,
            setCartlist,
            clickedButtons,
            setClickedButtons,
            id,
            setId,
            formData,
            setFormData,
            newitems,
            setNewitems,
            username,
            setUsername,
            userToken,
            setUserToken,
            password,
            setPassword
          }}
        >
          <Routes>
            <Route path="/" element={<Shop />}></Route>
            <Route path="/navbar" element={<Navbar />}></Route>

            <Route path="/men" element={<Men category="men" />}></Route>
            <Route path="/women" element={<Women category="women" />}></Route>
            <Route path="/kids" element={<Kids category="kids" />}></Route>

            <Route path="/wish" element={<Wish />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/itemdetails" element={<Itemdetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userlogin" element={<Userlogin />} />
            <Route path="/adminpanel" element={<Admin />} />
            <Route path="/addpro" element={<Addproduct />} />
            <Route path="/editpro" element={<Editproducts />} />
            <Route path="/edituser" element={<Edituser />} />
            <Route path="/userdetails" element={<UserDetails />} />
            <Route path="/admin" element={<Adminlogin />} />
          </Routes>
        </Mycontext.Provider>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App
