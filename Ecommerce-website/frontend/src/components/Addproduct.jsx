import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Mycontext } from "../Context";
import { Link } from "react-router-dom";
import Adminnav from "./Adminnav";
import axios from "axios";

const AddProduct = () => {


    

   
   const { items,setItems }=useContext(Mycontext)
   const [productId, setProductId] = useState("");
   const [productName, setProductName] = useState("");
   const [productPrice, setProductPrice] = useState("");
   const [productDescription, setProductDescription] = useState("");
   const [productImage, setProductImage] = useState("");
   const [productCategory, setProductCategory] = useState("");
   const {newitems,setNewitems}=useContext(Mycontext)




const handleAddProduct = async () => {
  try {
    if (
      productId !== "" &&
      productDescription !== "" &&
      productCategory !== "" &&
      productPrice !== "" &&
      productName !== "" &&
      productImage !== ""
    ) {
      const existingItem = items.find((item) => item.id === productId);
      if (!existingItem) {
        const newItem = {
          id:productId,
          name:productName,
          category:productCategory,
          price:productPrice,
          image:productImage,
          description:productDescription,
        };

        const response = await axios.post(
          "http://localhost:8000/api/products/",
          newItem
        );

        console.log("Item added:", response.data);

        // Update state with the new item
        setNewitems([...newitems, newItem]);
  

        // Clear the form after successful addition
        clear();
      } else {
        alert("ID already taken");
      }
    } else {
      alert("Enter all the fields");
    }
  } catch (error) {
    console.error("Error adding item:", error.message);
    // Handle the error appropriately, e.g., show an error message to the user
  }
  window.location.reload();
};

  
  


function clear(){
    setProductId("");
    setProductName("");
    setProductCategory("");
    setProductImage("");
    setProductDescription("");
    setProductPrice("");
}



  return (
    <div className="bodyy">
      <Adminnav/>
      
      <div className="container">
        <Form className="adminform">
          <h2>Add Product</h2>
          <input
            type="text"
            placeholder="Enter product id"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <span>
            Category:
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value="">select</option>
              <option value="men">men</option>
              <option value="women">women</option>
              <option value="kids">kids</option>
            </select>
          </span>

          <input
            type="text"
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter product image"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />

          <input
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <span>
            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
            <Button variant="primary" onClick={clear}>
              clear
            </Button>
          </span>
        </Form>

        <Link to="/men">Link</Link>
      </div>
    </div>
  );
};

export default AddProduct;
