
import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";



const Adminnav = () => {
  const [menu, setMenu] = useState("shop");
 

 const nav=useNavigate()

 
// const add=()=>{
//  setMenu("add")
// nav("/addpro");

// }
function add(){
  setMenu("add")
  nav('/addpro')
}

  return (
    <div>
      <div className="wish-nav">
        <p
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/adminpanel" className="link">
            <span className="cart-icon">
              Home
              {menu === "shop" ? <hr className="hr" /> : <></>}
            </span>
          </Link>
        </p>
       
       
        <p
          onClick={()=>add()}
        >
         
            <span className="cart-icon">
              Add Products
              {menu === "add" ? <hr className="hr" /> : <></>}
            </span>
        
        </p>


        
        <p
          onClick={() => {
            setMenu("edit");
          }}
        >
          <Link to="/editpro" className="link">
            <span className="cart-icon">
              Edit Products
              {menu === "edit" ? <hr className="hr" /> : <></>}
            </span>
          </Link>
        </p>

        <p
          onClick={() => {
            setMenu("edituser");
          }}
        >
          <Link to="/edituser" className="link">
            <span className="cart-icon">
              Manange Users
              {menu === "edituser" ? <hr className="hr" /> : <></>}
            </span>
          </Link>
        </p>
        <p>
          <Link to="/admin" className="link">
            <span className="cart-icon"> Logout</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Adminnav;
