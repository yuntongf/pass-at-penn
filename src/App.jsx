import './App.css';
import { Route, Routes } from "react-router-dom";
import Nav from './components/Nav';
import Courses from './components/Courses';
import Cart from './components/Cart';
import "bootstrap/dist/css/bootstrap.css";
import Detail from './components/Detail';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Receipt from './components/Receipt';
import { getCourse } from './services/CourseServices';




function App() {
  let [cart, setCart] = useState([]);
  let [liked, setLiked] = useState([]);
  let [data, setData] = useState([]);
  let [showCart, setShowCart] = useState(false);
  let [query, setQuery] = useState("");


  useEffect(() => {
    fetch('/api/base/2022A/search/courses/?search=CIS')
      .then(res => res.json())
      .then(function (courses) {
        console.log("number of results", courses.length);
        courses = courses.filter(c => c.title);
        for (var i = 0; i < courses.length; i++) {
          const [dept, number] = courses[i].id.split("-");
          courses[i].dept = dept;
          courses[i].number = number;
          courses[i].added = false;
          if (courses[i].prerequisites) {
            const prereqs = courses[i].prerequisites.split(", ");
            courses[i].prereqs = prereqs;
          }

        }

        for (var i = 0; i < courses.length; i++) {
          let course = courses[i];
          if (course.prereqs) {
            for (var j = 0; j < course.prereqs.length; j++) {
              let [prereq] = courses.filter(c => `${c.dept} ${c.number}` === course.prereqs[j]);
              if (prereq) {
                course.prereqs[j] = prereq;
              }
            }
          }
        }

        console.log(courses);
        setData(courses);
      });
  }, []);

  function handleAdd(course) {
    if (cart.length === 7) {
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
    temp = temp.filter(c => c.dept !== course.dept || c.number !== course.number);
    setCart(temp);
  }

  function handleUnlike(course) {
    let courses = [...data];
    let index = courses.indexOf(course);
    courses[index].liked = false;

    let temp = [...cart];
    temp = temp.filter(c => c.dept !== course.dept || c.number !== course.number);
    setLiked(temp);
  }

  function handleShowCart() {
    setShowCart(!showCart);
  }

  return (
    <div>
      <ToastContainer />
      <Nav handleShowCart={handleShowCart} showCart={showCart} />
      <div className="mt-5 d-flex justify-content-center">
        <div className='col-5 d-flex'>
          <input type="text" name="query" className='form-control my-3' placeholder='Search for a course' value={query} onChange={e => setQuery(e.currentTarget.value)} />
          <a href={`/Search/${query}`}>
            <button style={{ width: 80 }} className='m-3 btn btn-primary'> Search</button>
          </a>
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className='d-flex justify-content-center'>
              <div className="col-6 mt-4 ms-4 me-5">
                <Courses courses={data} />
              </div>
              {showCart &&
                <div className="col-2 mt-3"
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
          path="/Checkout/:receipt"
          element={
            <div className='d-flex justify-content-center'>
              <div className='col-5 mt-3'>
                <Receipt />
              </div>
            </div>
          }
        />
        <Route
          path="/:dept/:number"
          element={
            <div className="" style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0 calc(1rem + 5%)'
            }}>
              {!showCart &&
                <div className='d-flex justify-content-around'>
                  <div className="col-5 mt-4">
                    <Courses courses={data} />
                  </div>
                  <div className="mt-5 m-5" style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    borderRadius: '4px',
                    maxinumHeight: 700
                  }}>
                    <Detail data={data} handleAdd={handleAdd} handleRemove={handleRemove} handleLike={handleLike} handleUnlike={handleUnlike} />
                  </div>
                </div>
              }
              {showCart &&
                <div className='d-flex justify-content-around'>
                  <div className="col-3 m-4">
                    <Courses courses={data} />
                  </div>
                  <div className="mt-5 col-5" style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    borderRadius: '4px',
                    maxinumHeight: 700
                  }}>
                    <Detail data={data} handleAdd={handleAdd} handleRemove={handleRemove} handleLike={handleLike} handleUnlike={handleUnlike} />
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
