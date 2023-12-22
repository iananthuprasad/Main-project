import React, { useContext } from 'react'
import { Mycontext } from '../Context'

const UserDetails = () => {
const{formData,setFormdata}=useContext(Mycontext)
const {username,setUsername}=useContext(Mycontext)

const user=formData.filter((item)=>item.username===username)
console.log(formData)
console.log(user)


  return (
    <div className="bodyy">
      {user.map((item) => (
        <>
          <div>
            <h4>USER NAME</h4>
            {item.username}
          </div>
          <div>
            <h4>E-MAIL</h4>
            {item.email}
          </div>
        </>
      ))}
    </div>
  );
}

export default UserDetails
