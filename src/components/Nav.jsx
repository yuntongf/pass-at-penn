

import React from 'react';

const Nav = ({ handleShowCart, showCart }) => {
  let queryString;
  let onMainSearchPage;
  /* if query is null, we are on the main search page, in which case we don't show the cart button*/
  try {
    queryString = JSON.parse(sessionStorage.getItem('query'));
    onMainSearchPage = queryString != null
  } catch {
    queryString = "";
  }
  return (
    <div className="d-flex justify-content-between" style={{
      width: '100%',
      padding: '0 1rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    }}>
      <a href="/">
        <label onClick={() => sessionStorage.setItem('query', null)}>
          <h2 className=" m-2">Penn Course Cart</h2>
        </label>
      </a>
      {onMainSearchPage &&
        <button style={{ width: 120 }} className="m-1 btn btn-outline-secondary" onClick={() => handleShowCart()}> {`${showCart ? "Hide" : "Show"} Cart`} </button>}
    </div>)
}

export default Nav;