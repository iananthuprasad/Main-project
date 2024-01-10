import React, { useContext, useState, useEffect } from "react";
import { Mycontext } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHome, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap'

const Cart = () => {
  const { cartlist, setCartlist } = useContext(Mycontext);
  const {username,setUsername}=useContext(Mycontext)
  const [quantities, setQuantities] = useState(() => {
    // Initialize quantities from localStorage or default to an empty object
    const storedQuantities = localStorage.getItem("cartQuantities");
    return storedQuantities ? JSON.parse(storedQuantities) : {};
  });
  const [totalAmount, setTotalAmount] = useState(0);

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  const removeCartitem = (id) => {
    const updatedCart = cartlist.filter((item) => item.id !== id);
    setCartlist(updatedCart);
  };

  useEffect(() => {
    // Store quantities in localStorage whenever it changes
    localStorage.setItem("cartQuantities", JSON.stringify(quantities));

    // Recalculate total amount whenever cartlist or quantities changes
    let total = 0;
    cartlist.forEach((item) => {
      const quantity = quantities[item.id] || 1;
      total += item.price * quantity;
    });
    setTotalAmount(total);
  }, [cartlist, quantities]);


  const buy=()=>{
    if(username==""){
      alert("please login to continue")
    }
    else{

    }
  }
  
  return (
    <div className="bodyy">
      <div className="wish-nav">
        <p>
          <Link to="/" className="link">
            <FontAwesomeIcon icon={faHome} />
            <span className="cart-icon"> Home</span>
          </Link>
        </p>
        <p>
          <Link to="/wish" className="link">
            <FontAwesomeIcon icon={faHeart} />
            <span className="cart-icon"> Wishlist</span>
          </Link>
        </p>
      </div>
      <div className="container">
        {cartlist == "" ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
            {" "}
            <img src="https://hsnbazar.com/images/empty-cart.png"></img>{" "}
          </div>
        ) : (
          <>
            <div className="table">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">PRODUCTS</th>
                    <th scope="col">TITLE</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col"> </th>
                  </tr>
                </thead>
                <tbody>
                  {cartlist.map((item) => (
                    <tr key={item.id} className="tr">
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ maxWidth: "80px", maxHeight: "80px" }}
                        />
                      </td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>
                        <input
                          className="qinput"
                          type="number"
                          value={quantities[item.id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </td>
                      <td>{(quantities[item.id] || 1) * item.price}</td>
                      <td onClick={() => removeCartitem(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="amountBox">
              <p className="amountBox1">
                <h4>Total Amount:</h4>
                <span>
                  <h4>${totalAmount}</h4>
                </span>
              </p>
            </div>
            <div onClick={buy} className="buy">
              <Button>BUY NOW</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
