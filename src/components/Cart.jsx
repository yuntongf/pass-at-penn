import { Link } from "react-router-dom";

const Cart = ({ courses, handleRemove }) => (
  <div style={{ maxHeight: 700, overflow: 'auto' }}>
    <h4>Course Cart</h4>
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
