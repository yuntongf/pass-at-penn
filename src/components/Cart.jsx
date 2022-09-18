import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import React from "react";

const cartString = (courses) => {
  var result = "";
  for (var i = 0; i < courses.length; i++) {
    result += result == "" ? `${courses[i].dept}${courses[i].number}` : `+${courses[i].dept}${courses[i].number}`;
  }
  return result;
}
const Cart = ({ handleRemove }) => {
  let courses = JSON.parse(sessionStorage.getItem('cart'))
  if (!courses) courses = []
  return (
    <div style={{ maxHeight: 500, overflow: 'auto' }}>
      <div className="d-flex justify-content-between">
        <h4 className="mt-1">Course Cart</h4>
        {courses.length > 0 ?
          <Link to={`/Checkout/${cartString(courses)}`}>
            <button className="ms-2 btn btn-light" >Checkout</button>
          </Link>
          : <button className="ms-2 btn btn-light" onClick={() =>
            toast.warning('Need to check out at least one course', {
              position: 'top-center',
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })}>Checkout</button>}

      </div>
      {courses.length == 0 ?
        <p>Your cart is currently empty!</p> :
        <div>
          {courses.map((course) => (
            <div className="card mb-2" key={`${course.dept}-${course.number}`}>
              <Link className="text-decoration-none" to={`/${course.dept}/${course.number}`}>
                <li className="list-group-item">
                  <div className="mt-3 ms-3 me-3 mb-2">{`${course.dept} ${course.number}: ${course.title}`}</div>
                </li>
              </Link>
              {course.note !== "" &&
                <div className=" ms-3">{course.note}</div>}
              <button onClick={() => handleRemove(course)} className="m-3 btn btn-danger">Remove</button>
            </div>
          ))}
        </div>}
    </div>)
}

export default Cart;
