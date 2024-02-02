import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/nav.css";
import { Link, useNavigate } from "react-router-dom";
import {
  faCartShopping,
  faHeart,
  faSignOutAlt,
  faSearch,
  faUser,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Mycontext } from "../Context";
import Getuserid from "./sessionid";

const Navbar = () => {
  const{items,setItems}=useContext(Mycontext)
  const {search,setSearch}=useContext(Mycontext)
  const{matcheditems,setMatcheditems}=useContext(Mycontext)
 const {username,setUsername}=useContext(Mycontext)
 const { cartlist, setCartlist } = useContext(Mycontext);
  const [menu, setMenu] = useState("shop");

 const nav=useNavigate();
 const sessionid=Getuserid


  


 function handleInputChange(e) {
    const inputText = e.target.value;
    setSearch(inputText);  
 }
 function searchitem(){
       const matched = items.filter((item) =>
       item.description.toLowerCase().includes(search.toLowerCase()) ||
       item.name.toLowerCase().includes(search.toLowerCase()));
       setMatcheditems(matched)      
 }
 const profile=()=>{
  if(username==''){
  alert("plese login to show userdetails")
  }
  else{
    nav("/userdetails")
  }
 }


  return (
    <div className="body">
      <section id="navbar">
        <div className="nav-container">
          <div>
            <img
              src="https://t3.ftcdn.net/jpg/05/16/27/60/240_F_516276029_aMcP4HU81RVrYX8f5qCAOCCuOiCsu5UF.jpg "
              className="logo"
            ></img>
          </div>
          <div className="nav">
            <ul className="nav1">
              <li
                onClick={() => {
                  setMenu("shop");
                }}
              >
                <Link to="/">
                  shop {menu === "shop" ? <hr className="hr" /> : <></>}
                </Link>
              </li>
              <li
                onClick={() => {
                  setMenu("men");
                }}
              >
                <Link to="/men">
                  Men {menu === "men" ? <hr className="hr" /> : <></>}
                </Link>
              </li>
              <li
                onClick={() => {
                  setMenu("women");
                }}
              >
                <Link to="/women">
                  Women {menu === "women" ? <hr className="hr" /> : <></>}
                </Link>
              </li>
              <li
                onClick={() => {
                  setMenu("kids");
                }}
              >
                <Link to="/kids">
                  Kids{menu === "kids" ? <hr className="hr" /> : <></>}
                </Link>
              </li>
            </ul>
          </div>
          <div className="search">
            <input
              type="text"
              onChange={handleInputChange}
              placeholder="search items here"
            />
            <button onClick={searchitem}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div>
            <ul className="nav2">
              <li>
                <Link to="/wish">
                  <FontAwesomeIcon icon={faHeart} />
                  <span className="shop-nav-icon">wishlist</span>
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className="shop-nav-icon">{cartlist.length} cart</span>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FontAwesomeIcon icon={faSignInAlt} />
                  <span className="shop-nav-icon">
                    {sessionid() == null ? <>Login</> : <>Logout</>}
                  </span>
                </Link>
              </li>
              <li onClick={profile}>
                <FontAwesomeIcon icon={faUser} />
                <span className="shop-nav-icon"></span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/*--------------------------------------------items----------------------------------------------------------- */}
    </div>
  );
};

export default Navbar;
