import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Mycontext } from "../Context";
import { Link } from "react-router-dom";
import Adminnav from "./Adminnav";

const AddProduct = () => {


    

    const { items,setItems }=useContext(Mycontext)


 const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
   const [productImage, setProductImage] = useState("");
   const [productCategory, setProductCategory] = useState("");
   const {newitems,setNewitems}=useContext(Mycontext)




  const handleAddProduct = () => {

    if(productId!="" && productDescription!="" &&productCategory!="" &&productPrice!="" && productName!="" && productImage!=""){

      const abc = items.find((item) => item.id === productId);
if(!abc){
    const newProduct = {
      id: productId,
      name: productName,
      price: parseFloat(productPrice),
      image:productImage,
      category: productCategory,
      description: productDescription,
    };

     items.unshift(newProduct);
      alert("item added");
      newitems.unshift(newProduct);
}
else{
    alert("id already taken")
}
    }
    else{
   alert("enter all the fields")
    }
  };
  console.log(productId)
function clear(){
    setProductId("");
    setProductName("");
    setProductCategory("");
    setProductImage("");
    setProductDescription("");
    setProductPrice("");
     console.log(productId);
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
