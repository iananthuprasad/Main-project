import React, { useContext, useState, useEffect } from "react";
import { Mycontext } from "../Context";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Adminnav from "./Adminnav";
import axios from 'axios';

const Editproducts = () => {
  const { items, setItems } = useContext(Mycontext);

  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);


  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [search,setSearch]=useState("")
  const [matcheditem,setMatcheditems]=useState([])
  // Store initial values
  const [initialValues, setInitialValues] = useState({});




  const removeProduct = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/products/${itemId}`
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };


    const removeMatchedProduct = async (itemId) => {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/products/${itemId}`
        );
        console.log(response.data);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    };



    useEffect(() => {
      // Save initial values when a new item is selected
      if (value !== null) {
        const selectedItem = items.find((item) => item.id === value);
        if (selectedItem) {
          setInitialValues({
            name: selectedItem.name,
            price: selectedItem.price,
            category: selectedItem.category,
            description: selectedItem.description,
          });
        }
      }
    }, [value, items]);



  const valueset = (id) => {
    setValue(id);

    // Reset values to initial values when a new item is selected
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      setNewName(selectedItem.name);
      setNewPrice(selectedItem.price);
      setNewCategory(selectedItem.category);
      setNewDescription(selectedItem.description);
    }
  };



function update(id) {
  // Implement logic to update user information
  const updatedUserData = {
    name: newName,
    category: newCategory,
    price: newPrice,
    description: newDescription,
  };

  console.log(updatedUserData);

  // Send a request to update user data
  axios
    .put(`http://localhost:8000/api/products/${id}`, updatedUserData)
    .then((response) => {
      console.log("User updated successfully:", response);
      // Add any additional logic after a successful update
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
    setValue(null);
    window.location.reload()
}





 










   function searchitem() {
     const matched = items.filter(
       (item) =>
         item.id===search  
     );
     setMatcheditems(matched);
      if (matched == "") {
        alert("enter the correct product ID");
      }
      else{
     setValue1(-1)
      }
   }
  

   function back(){
    setValue1(null)
   }
  return (
    <div className="bodyy">

      <Adminnav/>
      
      <div className="container">
        <div>
          <input
            type="number"
            placeholder="enter the product id"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button onClick={searchitem}>search</button>
          {value1 != null ? <button onClick={back}>back</button> : <div></div>}
        </div>
        <Link to="/men">men</Link>

        {value1 != null ? (
          <>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">DESCRIPTION</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {matcheditem.map((item) => (
                  <tr key={item.id} className="tr">
                    <td>{item.id}</td>
                    {value === item.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            defaultValue={item.name}
                            onChange={(e) => setNewName(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            defaultValue={item.price}
                            onChange={(e) => setNewPrice(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            defaultValue={item.category}
                            onChange={(e) => setNewCategory(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            defaultValue={item.description}
                            onChange={(e) => setNewDescription(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <button onClick={() => update(item._id)}>
                            update
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>
                        <td onClick={() => valueset(item.id)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </td>
                        <td onClick={() => removeMatchedProduct(item._id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="table">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">CATEGORY</th>
                    <th scope="col">DESCRIPTION</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="tr">
                      <td>{item.id}</td>
                      {value === item.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              defaultValue={item.name}
                              onChange={(e) => setNewName(e.target.value)}
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              defaultValue={item.price}
                              onChange={(e) => setNewPrice(e.target.value)}
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              defaultValue={item.category}
                              onChange={(e) => setNewCategory(e.target.value)}
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              defaultValue={item.description}
                              onChange={(e) =>
                                setNewDescription(e.target.value)
                              }
                            ></input>
                          </td>
                          <td>
                            <button onClick={() => update(item._id)}>
                              update
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.category}</td>
                          <td>{item.description}</td>
                          <td onClick={() => valueset(item.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </td>
                          <td onClick={() => removeProduct(item._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Editproducts;
