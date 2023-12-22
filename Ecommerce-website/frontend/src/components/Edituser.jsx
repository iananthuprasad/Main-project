import React,{useContext,useState} from 'react'
import {Mycontext} from '../Context'
import { Link } from 'react-router-dom';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Adminnav from './Adminnav';

const Edituser = () => {
     const [search, setSearch] = useState("");
       const [matcheditem, setMatcheditems] = useState([]);
       const [value, setValue] = useState(null);

     const { formData, setFormData } = useContext(Mycontext);


      const update = (id) => {
        const updatedItems = formData.filter((item) => item.username !== id);
        setFormData(updatedItems);
      };

       function searchitem() {
         const matched = formData.filter((item) => item.username === search);
         setMatcheditems(matched);
         if(matched==""){
            alert("enter the correct username")
         }
         else{
         setValue(-1)
         }
         console.log(matcheditem)
       }
       function back() {
         setValue(null);
       }
  return (
    <div className="bodyy">
   <Adminnav/>
      <div className="container">
        <input
          type="text"
          placeholder="enter the product id"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button onClick={searchitem}>search</button>
        {value != null ? <button onClick={back}>back</button> : <div></div>}

        {value == -1 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">USERNAME</th>
                <th scope="col">E-MAIL</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {matcheditem.map((item) => (
                <tr key={item.id} className="tr">
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <button onClick={() => update(item.username)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">USERNAME</th>
                <th scope="col">E-MAIL</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((item) => (
                <tr key={item.id} className="tr">
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <button onClick={() => update(item.username)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Link to="/register">register</Link>
      </div>
    </div>
  );
}

export default Edituser
