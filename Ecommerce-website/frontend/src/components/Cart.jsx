import React, { useContext, useState, useEffect } from "react";
import { Mycontext } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHome, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap'
import axios from "axios";
import Getuserid from "./sessionid";



const Cart = () => {
  const { cartlist, setCartlist } = useContext(Mycontext);
  const {username,setUsername}=useContext(Mycontext)
  const [quantities, setQuantities] = useState(() => {
    // Initialize quantities from localStorage or default to an empty object
    const storedQuantities = localStorage.getItem("cartQuantities");
    return storedQuantities ? JSON.parse(storedQuantities) : {};
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState("");
   
  

 const idd = Getuserid();





 useEffect(() => {
   fetchCart();
 }, []);

 const fetchCart = async () => {
   try {
     const response = await axios.get(
       `http://localhost:8000/api/users/fetchcart?id=${idd}`
     );
     setCartlist(response.data.products);
     console.log("cart=", response.data.products);
     console.log("a=", response.data.a);
     console.log("cartlist=", cartlist);
   } catch {
     console.log("error");
   }
 };








  // const handleQuantityChange = (itemId, newQuantity) => {
  //   setQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [itemId]: newQuantity,
  //   }));
  // };


  const handleQuantityChange = (itemId, newQuantity) => {

    console.log(itemId,newQuantity)
    // Assuming you have a server endpoint to handle quantity updates
    const serverEndpoint = "http://localhost:8000/api/users/cart";

    // Make an Axios request to update the quantity on the server
    axios
      .put(serverEndpoint, {
        id:idd,
        productId: itemId,
        quantity: newQuantity,
      })
      .then((response) => {
        // Handle the server response if needed
        console.log("Server response:", response.data);

        // Update the local state with the new quantity
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [itemId]: newQuantity,
        }));
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error updating quantity on the server:", error);
      });
      
  };



        const removeCartitem = async (productId) => {
          console.log(productId);
          try {
            setLoading(true);

            // Make a request to add the product to the wishlist
            const response = await axios.post(
              `http://localhost:8000/api/users/delcart`,
              { id: productId }, // Request payload (if needed)
              {
                withCredentials: true, // Include credentials if using cookies for authentication
              }
            );

            console.log("data=", response.data);
            // Handle the response accordingly (e.g., show a success message, update UI)
          } catch (error) {
            console.error("Error adding to cart:");
            // Handle the error (e.g., show an error message to the user)
          } finally {
            setLoading(false);
          }
          window.location.reload()

        };




 


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
                          Value={quantities[item._id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              item._id,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </td>
                      


                      <td>{(quantities[item._id] || 1) * item.price}</td>
                      <td onClick={() => removeCartitem(item._id)}>
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
