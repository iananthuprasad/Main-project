import React, { useContext,useEffect } from 'react'
import axios from "axios";
import Navbar from './Navbar'
import Carousel from "react-bootstrap/Carousel";
import '../styles/shop.css'
import { Link } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import { Mycontext } from '../Context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const { items, setItems } = useContext(Mycontext);
  const {newitems,setNewitems}=useContext(Mycontext)
  const { wishlist, setWishlist } = useContext(Mycontext);
  const { id, setId } = useContext(Mycontext);
  const { cartlist, setCartlist } = useContext(Mycontext);
  const { clickedButtons, setClickedButtons,wishid,alluser,setAlluser } = useContext(Mycontext);

  
  

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
       console.log("items=",items)


        // useEffect(() => {
        //   // Axios GET request
        //   axios
        //     .get(`http://localhost:8000/api/users/wish`)
        //     .then((response) => {
        //       // Handle the successful response
        //       console.log(response.data);

        //       setAlluser(response.data);

        //       let selectedProducts = items.filter((product) =>
        //         wishid.includes(product._id)
        //       );
        //       console.log(selectedProducts);
        //       setWishlist(selectedProducts);
        //       console.log(wishlist);
        //     })
        //     .catch((error) => {
        //       // Handle the error
        //       console.error("Error fetching data:", error);
        //     });
        // }, []);

        // console.log("alluser=",alluser)



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




  const wish = (item) => {
    if (wishlist.some((data) => item == data)) {
    } else {
      setWishlist((prevWishlist) => [...prevWishlist, item]);
    }
  };
  const unlike = (id) => {
    const xyz = wishlist.filter((liked) => liked.id !== id);
    setWishlist(xyz);
  };

  const listDetails = (id) => {
    const abc = id;
    setId(abc);
  };

  const cart = (item) => {
    if (cartlist.some((data) => item == data)) {
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
    <div className="body">
      <Navbar />
      <div className="car carr">
        <Carousel interval={1500}>
          <Carousel.Item>
            <img
              className="carimg w-100"
              src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-24112023-mainbanner-z2-p7-USPA-americaneagle-upto50.jpg"
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carimg w-100"
              src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-24112023-mainbanner-z2-p5-hangup-jompers-flat50.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carimg w-100"
              src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-24112023-mainbanner-z2-p2-netplay-dnmx-under599.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="car">
        <Carousel interval={1500}>
          <Carousel.Item>
            <img
              className="carimg1 w-100"
              src="https://assets.ajio.com/cms/AJIO/WEB/Fi%20Credit%20Cards-1440x128.jpg"
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carimg1 w-100"
              src="https://assets.ajio.com/cms/AJIO/WEB/Mobikwik-1440x128%202.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carimg1 w-100"
              src="https://assets.ajio.com/cms/AJIO/WEB/Mobikwik-1440x128-without%20CTA%202.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="container">
        <h1>TRENDING NOW</h1>
      </div>
      {/*-----------------------------------------------------newitem--------------------------------------------- */}
      <div className="container">
        <div className="itemflex">
          {newitems.map((item, id) => (
            <>
              <Card className="card-size">
               
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.name}
                    className="cardimg"
                  />
                
                <Card.Body className="cardbody">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <Button onClick={() => wish(item)}>
                    <FontAwesomeIcon icon={faHeart} />
                    <span className="cart-icon">wishlist</span>
                  </Button>
                  <Button
                    onClick={() => cart(item)}
                    style={{
                      backgroundColor: clickedButtons.includes(item)
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
            </>
          ))}
        </div>
      </div>
      <div className="container">
        <h1>CATEGORIES TO BAG</h1>
      </div>
      {/*-------------------------------------------------------------------card----------------------------------------------------------------------- */}
      <div className="shopcard">
        <Card className="card1">
          <Link to="/men">
            <Card.Img
              className="shopcardimg"
              src={
                "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-27102023-showstoppingdeals-z12-under399-tshirts.jpg"
              }
            />
          </Link>
        </Card>
        <Card className="card1">
          <Link to="/men">
            <Card.Img
              className="shopcardimg"
              src={
                "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-27102023-showstoppingdeals-z12-under699-shirts.jpg"
              }
            />
          </Link>
        </Card>
        <Card className="card1">
          <Link to="/men">
            <Card.Img
              className="shopcardimg"
              variant="top"
              src={
                "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-27102023-showstoppingdeals-z12-under699-trackpants.jpg"
              }
            />
          </Link>
        </Card>
        <Card>
          <Link to="/women">
            <Card.Img
              className="shopcardimg1"
              variant="top"
              src={
                "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-WHP-271023-BESTDEALS-Z11-2-TSHIRTS.jpg"
              }
            />
          </Link>
        </Card>
        <Card>
          <Link to="/women">
            <Card.Img
              className="shopcardimg1"
              variant="top"
              src={
                "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-WHP-271023-BESTDEALS-Z11-11-KURTAS&KURTIS.jpg"
              }
            />
          </Link>
        </Card>
        <Card className="shopcard6">
          <Link to="/women">
            <Card.Img
              className="shopcardimg1"
              variant="top"
              src={
                "https://assets.ajio.com/cms/AJIO/WEB/D-1.0-WHP-271023-BESTDEALS-Z11-13-SHIRTS.jpg"
              }
            />
          </Link>
        </Card>
      </div>

      <div className="car ">
        <Carousel interval={1500}>
          <Carousel.Item>
            <img
              className="carimg1 w-100"
              src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-22092023-WalletOffer-InviteYourFriend.jpg"
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carimg1 w-100"
              src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-03102023-AllianceStripsStatic-Z1-ShopEarn2.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="carimg1 w-100"
              src="https://assets.ajio.com/cms/AJIO/WEB/2192023-PLPStrip-RelianceOne-Points-1440x128.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="container"></div>
    </div>
  );
}

export default Shop

