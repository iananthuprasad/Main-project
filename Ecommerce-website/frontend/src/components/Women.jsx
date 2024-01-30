import React, { useContext, useState } from "react";

import { Mycontext } from "../Context";
import Navbar from "./Navbar";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import "../styles/gender.css";
import axios from "axios";

const Women = (props) => {
  const { items, setItems } = useContext(Mycontext);
  const { matcheditems, setMatcheditems } = useContext(Mycontext);
  const { wishlist, setWishlist } = useContext(Mycontext);
  const { cartlist, setCartlist } = useContext(Mycontext);
  const { setId } = useContext(Mycontext);
  const [loading, setLoading] = useState("");

  // const wish = (item) => {
  //   if (wishlist.some((data) => item === data)) {
  //   } else {
  //     setWishlist((prevWishlist) => [...prevWishlist, item]);
  //   }
  //   console.log(item)
  // };

  const wish = async (productId) => {
    console.log(productId);
    try {
      setLoading(true);

      // Make a request to add the product to the wishlist
      const response = await axios.post(
        `http://localhost:8000/api/users/wish`,
        { id: productId }, // Request payload (if needed)
        {
          withCredentials: true, // Include credentials if using cookies for authentication
        }
      );

      console.log(response.data);
      // Handle the response accordingly (e.g., show a success message, update UI)
    } catch (error) {
      console.error(
        "Error adding to wishlist:",
        error.response?.data || error.message
      );
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  const unlike = (id) => {
    const xyz = wishlist.filter((liked) => liked.id !== id);
    setWishlist(xyz);
  };

  const cart = (item) => {
    if (cartlist.some((data) => item === data)) {
      // If item is already in the cart, do nothing
    } else {
      setCartlist((prevCartlist) => [...prevCartlist, item]);
    }
  };

  const listDetails = (id) => {
    const abc = id;
    setId(abc);
  };

  return (
    <div className="body">
      <Navbar />

      <div className="navmar">
        <div className="container">
          {matcheditems.length > 0 && (
            <div className="itemflex">
              {matcheditems.map((matcheditem, index) => {
                if (props.category === matcheditem.category) {
                  return (
                    <React.Fragment key={matcheditem.id}>
                      <Card className="card-size">
                        <Link
                          to="/itemdetails"
                          onClick={() => listDetails(matcheditem.id)}
                        >
                          <Card.Img
                            variant="top"
                            src={matcheditem.image}
                            alt={matcheditem.name}
                            className="cardimg"
                          />
                        </Link>
                        <Card.Body className="cardbody">
                          <Card.Title>{matcheditem.name}</Card.Title>
                          <Card.Text>{matcheditem.description}</Card.Text>
                          <Card.Text>Price: ${matcheditem.price}</Card.Text>

                          <Button onClick={() => wish(matcheditem._id)}>
                            <FontAwesomeIcon icon={faHeart} />
                            <span className="cart-icon">wishlist</span>
                          </Button>

                          <Button
                            onClick={() => cart(matcheditem)}
                            style={{
                              backgroundColor: cartlist.some(
                                (data) => matcheditem === data
                              )
                                ? "black"
                                : "grey",
                            }}
                          >
                            <FontAwesomeIcon icon={faShoppingBag} />
                            <span className="cart-icon">Add to Cart</span>
                          </Button>

                          {wishlist.includes(matcheditem) && (
                            <div>
                              <p
                                className="liked"
                                onClick={() => unlike(matcheditem.id)}
                                style={{ color: "green", fontWeight: "bold" }}
                              >
                                <FontAwesomeIcon icon={faHeart} />
                              </p>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </React.Fragment>
                  );
                }
              })}
            </div>
          )}
        </div>

        <div className="car">
          <Carousel interval={3000}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-26112023-dailybannermonitised-z6-p3-Jadeblue-upto40.jpg"
                alt="First slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-26112023-dailybannermonitised-z6-p1-beinghuman-upto65.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-26112023-dailybannermonitised-z6-p2-gant-upto70.jpg"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="container">
          <div className="itemflex">
            {items.map((item) => {
              if (props.category === item.category) {
                return (
                  <React.Fragment key={item.id}>
                    <Card className="card-size">
                      <Link
                        to="/itemdetails"
                        onClick={() => listDetails(item.id)}
                      >
                        <Card.Img
                          variant="top"
                          src={item.image}
                          alt={item.name}
                          className="cardimg"
                        />
                      </Link>
                      <Card.Body className="cardbody">
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Text>Price: ${item.price}</Card.Text>
                        <Button onClick={() => wish(item._id)}>
                          <FontAwesomeIcon icon={faHeart} />
                          <span className="cart-icon">wishlist</span>
                        </Button>
                        <Button
                          onClick={() => cart(item)}
                          style={{
                            backgroundColor: cartlist.some(
                              (data) => item === data
                            )
                              ? "black"
                              : "grey",
                          }}
                        >
                          <FontAwesomeIcon icon={faShoppingBag} />
                          <span className="cart-icon">Add to Cart</span>
                        </Button>
                        <Card.Text>
                          {wishlist.includes(item) && (
                            <div>
                              <p
                                className="liked"
                                onClick={() => unlike(item.id)}
                                style={{ color: "green", fontWeight: "bold" }}
                              >
                                <FontAwesomeIcon icon={faHeart} />
                              </p>
                            </div>
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </React.Fragment>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Women;
