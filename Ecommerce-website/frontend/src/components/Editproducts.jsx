import React, { useContext, useState, useEffect } from "react";
import { Mycontext } from "../Context";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Adminnav from "./Adminnav";

const Editproducts = () => {
  const { items, setItems } = useContext(Mycontext);
  const [value, setValue] = useState(null);
   const [value1, setValue1] = useState(null);

  const [newname, setNewname] = useState("");
  const [newprice, setNewprice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [search,setSearch]=useState("")
  const [matcheditem,setMatcheditems]=useState([])
  // Store initial values
  const [initialValues, setInitialValues] = useState({});

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

  const removeProduct = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };
   const removeMatchedProduct = (id) => {
     const updatedItems = items.filter((item) => item.id !== id);
     setMatcheditems(updatedItems);
   };

  const valueset = (id) => {
    setValue(id);

    // Reset values to initial values when a new item is selected
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      setNewname(selectedItem.name);
      setNewprice(selectedItem.price);
      setNewCategory(selectedItem.category);
      setNewDescription(selectedItem.description);
    }
  };

  const update = (id) => {
    // Check if any of the values have changed
    const valuesChanged =
      newname !== initialValues.name ||
      newprice !== initialValues.price ||
      newCategory !== initialValues.category ||
      newDescription !== initialValues.description;

    if (valuesChanged) {
      // Perform update logic only if values have changed
      const updatedData = items.map((item) =>
        item.id === id
          ? {
              ...item,
              name: newname,
              price: newprice,
              category: newCategory,
              description: newDescription,
            }
          : item
      );
      setItems(updatedData);
    }

    // Reset values after updating
    setNewname("");
    setNewprice("");
    setNewCategory("");
    setNewDescription("");

    setValue(null);
  };


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
                            onChange={(e) => setNewname(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            defaultValue={item.price}
                            onChange={(e) => setNewprice(e.target.value)}
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
                          <button onClick={() => update(item.id)}>
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
                          <FontAwesomeIcon icon={faTrash} />
                        </td>
                        <td onClick={() => removeMatchedProduct(item.id)}>
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
                              onChange={(e) => setNewname(e.target.value)}
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              defaultValue={item.price}
                              onChange={(e) => setNewprice(e.target.value)}
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
                            <button onClick={() => update(item.id)}>
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
                            <FontAwesomeIcon icon={faTrash} />
                          </td>
                          <td onClick={() => removeProduct(item.id)}>
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
