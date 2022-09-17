import { Link } from "react-router-dom";

const cartString = (courses) => {
  var result = "";
  for (var i = 0; i < courses.length; i++) {
    result += result == "" ? `${courses[i].dept}${courses[i].number}` : `+${courses[i].dept}${courses[i].number}`;
  }
  return result;
}
const Cart = ({ courses, handleRemove }) => (
  <div style={{ maxHeight: 700, overflow: 'auto' }}>
    <div className="d-flex justify-content-between">
      <h4 className="mt-1">Course Cart</h4>
      <Link to={`/Checkout/${cartString(courses)}`}>
        <button className="ms-2 btn btn-light" >Checkout</button>
      </Link>
    </div>
    {courses.length == 0 ?
      <p>Your cart is currently empty!</p> :
      <div>
        {courses.map((course) => (
          <div className="card mt-3">
            <Link className="text-decoration-none" to={`/${course.dept}/${course.number}`}>
              <li key={`${course.dept}-${course.number}`} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className=" m-1 p-3">{`${course.dept} ${course.number}: ${course.title}`}</div>
              </li>
            </Link>
            <btn onClick={() => handleRemove(course)} className="m-2 btn btn-danger">Remove</btn>
          </div>
        ))}
      </div>}
  </div>
)

export default Cart;
