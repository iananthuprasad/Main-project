import React,{useContext, useState,useEffect} from 'react'
import '../styles/wish.css'
import { Mycontext } from "../Context";
import { Card, Button } from "react-bootstrap";
import "../styles/gender.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingBag,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import axios from 'axios'
import Getuserid from "./sessionid";



const Wish = () => {
      const {cartlist,setCartlist}=useContext(Mycontext);
      const { wishlist, setWishlist } = useContext(Mycontext);
      const { clickedButtons, setClickedButtons } = useContext(Mycontext);
      const [loading, setLoading] = useState("");
   

      const id = Getuserid();



    useEffect(()=>{
      fetchwish();
    },[]
    )


    const fetchwish=async()=>{
      try{
        const response = await axios.get(
          `http://localhost:8000/api/users/fetchwish?id=${id}`
        );
        setWishlist(response.data.products)
        console.log("wish=",response.data.products)
        console.log("wishh=", wishlist);
      }
      catch{
console.log("error")
      }
    }




      // const unlike = (id) => {
      //   const xyz = wishlist.filter((liked) => liked.id !== id);
      //   setWishlist(xyz);
      // };

       const unlike = async (productId) => {
         console.log(productId);
         try {
           setLoading(true);

           // Make a request to add the product to the wishlist
           const response = await axios.post(
             `http://localhost:8000/api/users/delwish`,
             { id: productId }, // Request payload (if needed)
             {
               withCredentials: true, // Include credentials if using cookies for authentication
             }
           );

           console.log("data=",response.data);
           // Handle the response accordingly (e.g., show a success message, update UI)
         } catch (error) {
           console.error(
             "Error adding to wishlist:"  
           );
           // Handle the error (e.g., show an error message to the user)
         } finally {
           setLoading(false);
         }
         window.location.reload();
       };



     const cart = (item) => {
       if (cartlist.some((data) => item === data)) {
       } else {
         setCartlist((prevCartlist) => [...prevCartlist, item]);

         setClickedButtons((prevClickedButtons) => {
           const isClicked = prevClickedButtons.includes(item);

           if (isClicked) {
             return prevClickedButtons.filter((item) => item !== item);
           } else {
             return [...prevClickedButtons, item];
           }
         });
       }
     };


   

      
 

  return (
    <div className="bodyy">
      <div className="wish-nav">
        <p>
          {" "}
          <Link to="/" className="link">
            <FontAwesomeIcon icon={faHome} />
            <span className="cart-icon"> Home</span>
          </Link>
        </p>
        <p>
          <Link to="/cart" className="link">
            {" "}
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="cart-icon"> Cart</span>
          </Link>
        </p>
      </div>
      <div className="container">
        {wishlist == "" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <img src="https://www.shopperswarehouse.com/assets/e_website/assets/site_image/empty_wishlist.png"></img>{" "}
          </div>
        ) : (
          <>
            <div className="itemflex">
              {wishlist.map((wish) => (
                <>
                  <Card className="card-size">
                    <Card.Img
                      variant="top"
                      src={wish.image}
                      alt={wish.name}
                      className="cardimg"
                    />
                    <Card.Body className="cardbody">
                      <Card.Title>{wish.name}</Card.Title>
                      <Card.Text>{wish.description}</Card.Text>
                      <Card.Text>Price: ${wish.price}</Card.Text>
                      <Button variant="primary" onClick={() => unlike(wish._id)}>
                        Remove
                      </Button>
                      <Button
                        style={{
                          backgroundColor: clickedButtons.includes(wish)
                            ? "black"
                            : "grey",
                        }}
                        onClick={() => cart(wish)}
                      >
                        <FontAwesomeIcon icon={faShoppingBag} />
                        <span className="cart-icon">Add to Cart</span>
                      </Button>
                    </Card.Body>
                  </Card>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Wish
