import React, { useContext, useState } from "react";
import { Mycontext } from "../Context";
import Navbar from '../components/Navbar'

const Itemdetails = () => {
const { cartlist, setCartlist } = useContext(Mycontext);
  const { items, setItems } = useContext(Mycontext);
  const {id ,setId}=useContext(Mycontext)
 
 const cart = (item) => {
   
   if (cartlist.some((data) => item === data)) {
   } else {
     setCartlist((prevCartlist) => [...prevCartlist, item]);

     alert("item added to cart")
   }
 };
  return (
    <div className="bodyy">
      <Navbar />
      {items.map((item) => {
        if (item.id === id) {
          return (
            <div className="itemdetails-nav">
              <div className="flex1">
                <div className="flex11">
                  <div>
                    {" "}
                    <img src={item.image} width="110" height="120"></img>
                  </div>
                  <div>
                    <img src={item.image} width="110" height="120"></img>
                  </div>
                  <div>
                    <img src={item.image} width="110" height="120"></img>
                  </div>
                  <div>
                    <img src={item.image} width="110" height="120"></img>
                  </div>
                </div>
              </div>
              <div className="flex2">
                <img src={item.image} width="400" height="530"></img>
              </div>
              <div className="flex3">
                <form className="flex31">
                  <div>
                    <h1>{item.name}</h1>
                  </div>
                  <div>
                    <h3>${item.price}</h3>
                  </div>
                  <div>
                    <h4>{item.description}</h4>
                  </div>

                  <div>
                    <div>
                      <h6>Select Size</h6>
                    </div>
                    <span className="size">
                      <p> S</p>
                      <p>M</p>
                      <p>L</p>
                      <p>XL</p>
                      <p>XXL</p>
                    </span>
                  </div>
                  
                    <p className="itemadd" onClick={() => cart(item)}>
                      {" "}
                      ADD TO CART
                    </p>
                  
                  <div className="size">
                    {" "}
                    category:<h5>{item.category}</h5>
                  </div>
                </form>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
export default Itemdetails;
