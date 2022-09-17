
import { Link } from 'react-router-dom';
import { useState } from 'react';
interface navProps {
  handleShowCart: Function;
  showCart: boolean;
}

const Nav = ({ handleShowCart, showCart }: navProps) => {
  return (
    <div className="d-flex justify-content-between" style={{
      width: '100%',
      padding: '0 1rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    }}>
      <Link to="/">
        <h2 className=" m-2">Penn Course Cart</h2>
      </Link>

      <button style={{ width: 120 }} className="m-1 btn btn-outline-secondary" onClick={() => handleShowCart()}> {`${showCart ? "Hide" : "Show"} Cart`} </button>
    </div>)
}

export default Nav;