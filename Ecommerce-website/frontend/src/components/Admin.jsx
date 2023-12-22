import React from 'react'
import{Link} from 'react-router-dom'
import Adminnav from './Adminnav';

const Admin = () => {
  return (
    <div className="bodyy">
      <Adminnav />
      <div>
        <h1>ADMIN PANEL</h1>
      </div>

      <Link to="/">shop</Link>
    </div>
  );
}

export default Admin
