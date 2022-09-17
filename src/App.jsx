import './App.css';
import { Route, Routes } from "react-router-dom";
import Nav from './components/Nav';
import Courses from './components/Courses';
import Cart from './components/Cart';
import "bootstrap/dist/css/bootstrap.css";
import Detail from './components/Detail';
import courses from './data/courses.json'
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let [cart, setCart] = useState([]);
  let [liked, setLiked] = useState([]);
  let [data, setData] = useState(courses);
  let [showCart, setShowCart] = useState(false);

  function handleAdd(course) {
    if (cart.length == 7) {
      toast.warning('Cannot add more than 7 courses 🦄', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    let courses = [...data];
    let index = courses.indexOf(course);
    courses[index].added = true;

    let temp = [...cart, course];
    setCart(temp);
    // toast.success(`${course.dept} ${course.number} added to cart!`, {
    //   position: "top-center",
    //   autoClose: 1500,
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  }

  function handleLike(course) {
    let courses = [...data];
    let index = courses.indexOf(course);
    courses[index].liked = true;

    let temp = [...cart, course];
    setLiked(temp);
  }

  function handleRemove(course) {
    let courses = [...data];
    let index = courses.indexOf(course);
    courses[index].added = false;

    let temp = [...cart];
    temp = temp.filter(c => c.dept != course.dept || c.number != course.number);
    setCart(temp);
  }

  function handleUnlike(course) {
    let courses = [...data];
    let index = courses.indexOf(course);
    courses[index].liked = false;

    let temp = [...cart];
    temp = temp.filter(c => c.dept != course.dept || c.number != course.number);
    setLiked(temp);
  }

  function handleShowCart() {
    setShowCart(!showCart);
  }

  return (
    <div>
      <ToastContainer />
      <Nav handleShowCart={handleShowCart} showCart={showCart} />
      <Routes>
        <Route
          path="/"
          element={
            <div className='d-flex justify-content-center'>
              <div className="col-6 mt-4 ms-4 me-5">
                <Courses />
              </div>
              {showCart &&
                <div className="mt-5 col-2"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    borderRadius: '4px',
                    maxinumHeight: 700
                  }}>
                  <Cart courses={cart} handleRemove={handleRemove} />
                </div>}

            </div>
          }
        />
        <Route
          path="/:dept/:number"
          element={
            <div className="" style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0 calc(1rem + 10%)'
            }}>
              {!showCart &&
                <div className='d-flex justify-content-around'>
                  <div className="col-5 mt-4">
                    <Courses />
                  </div>
                  <div className="mt-5 m-5" style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    borderRadius: '4px',
                    maxinumHeight: 700
                  }}>
                    <Detail data={courses} handleAdd={handleAdd} handleRemove={handleRemove} handleLike={handleLike} handleUnlike={handleUnlike} />
                  </div>
                </div>
              }
              {showCart &&
                <div className='d-flex justify-content-around'>
                  <div className="col-3 m-4">
                    <Courses />
                  </div>
                  <div className="mt-5 col-5" style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    borderRadius: '4px',
                    maxinumHeight: 700
                  }}>
                    <Detail data={courses} handleAdd={handleAdd} handleRemove={handleRemove} handleLike={handleLike} handleUnlike={handleUnlike} />
                  </div>
                  <div className="mt-5 m-4 col-3" style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    borderRadius: '4px',
                    maxinumHeight: 700
                  }}>
                    <Cart courses={cart} handleRemove={handleRemove} />
                  </div>
                </div>
              }
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
