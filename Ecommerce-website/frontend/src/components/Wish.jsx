import React,{useContext, useState} from 'react'
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

const Wish = () => {
      const{cartlist,setCartlist}=useContext(Mycontext);
      const { wishlist, setWishlist } = useContext(Mycontext);
       const { clickedButtons, setClickedButtons } = useContext(Mycontext);

      const unlike = (id) => {
        const xyz = wishlist.filter((liked) => liked.id !== id);
        setWishlist(xyz);
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


      
 console.log("wish=",cartlist);

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
                      <Button variant="primary" onClick={() => unlike(wish.id)}>
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
