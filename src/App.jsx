import './App.css';
import { Route, Routes, useParams } from "react-router-dom";
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
  /* certain data such as cart and liked are stored on sessionStorage 
  so they can be retrieved repeatedly from all elements */
  let q = sessionStorage.getItem("query");
  let c = sessionStorage.getItem("cart");
  let l = sessionStorage.getItem("liked");
  let [cart, setCart] = useState(c ? JSON.parse(c) : []);
  console.log("cart is now", cart);
  let [liked, setLiked] = useState(l ? JSON.parse(l) : []);
  let [data, setData] = useState([]);
  let [showCart, setShowCart] = useState(false);
  let [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`/api/base/2022A/search/courses/?${q !== "undefined" ? `search=${q}` : "search=CIS"}`)
      .then(res => res.json())
      .then(function (courses) {
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
          if (courses[i]) {
            for (var j = 0; j < cart.length; j++) {
              if (cart[j].dept === course.dept && cart[j].number === course.number) { courses[i].added = true }
            }
            for (var j = 0; j < liked.length; j++) {
              if (liked[j].dept === course.dept && liked[j].number === course.number) { courses[i].liked = true }
            }
          }
        }
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
    sessionStorage.setItem("cart", JSON.stringify(temp));
  }

  function handleLike(course) {
    let courses = [...data];
    let index = courses.indexOf(course);
    courses[index].liked = true;

    let temp = [...cart, course];
    setLiked(temp);
    sessionStorage.setItem("liked", JSON.stringify(temp));
  }

  function handleRemove(course) {
    let courses = [...data];
    let index = courses.indexOf(course);
    courses[index].added = false;

    let temp = [...cart];
    temp = temp.filter(c => c.dept !== course.dept || c.number !== course.number);
    setCart(temp);
    sessionStorage.setItem("cart", JSON.stringify(temp));
  }

  function handleUnlike(course) {
    let courses = [...data];
    let index = courses.indexOf(course);
    courses[index].liked = false;

    let temp = [...cart];
    temp = temp.filter(c => c.dept !== course.dept || c.number !== course.number);
    setLiked(temp);
    sessionStorage.setItem("liked", JSON.stringify(temp));
  }

  function handleShowCart() {
    setShowCart(!showCart);
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <ToastContainer />
              <Nav handleShowCart={handleShowCart} showCart={showCart} />
              <div>
                {q == null ?
                  <div className="mt-5 d-flex justify-content-center">
                    <div className='col-7 d-flex' style={{ position: 'absolute', top: '40%' }}>
                      <input type="text" name="query" className='form-control my-3' placeholder='Search for a course' value={query} onChange={e => setQuery(e.currentTarget.value)} />
                      <a href={`/Search/${query}`}>
                        <button style={{ width: 80 }} className='m-3 btn btn-primary' onClick={() => sessionStorage.setItem("query", query)}> Search</button>
                      </a>
                    </div>
                  </div>
                  :
                  <div>
                    <div className="mt-4 d-flex justify-content-center">
                      <div className='col-5 d-flex'>
                        <input type="text" name="query" className='form-control my-3' placeholder='Search for a course' value={query} onChange={e => setQuery(e.currentTarget.value)} />
                        <a href={`/Search/${query}`}>
                          <button style={{ width: 80 }} className='m-3 btn btn-primary' onClick={() => sessionStorage.setItem("query", query)}> Search</button>
                        </a>
                      </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <small className='mt-1 mb-2'>
                        {`Showing ${data.length} results for ${q}`}
                      </small>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <div className="col-6 mt-1 ms-4 me-5">
                        <Courses courses={data} />
                      </div>
                      {showCart &&
                        <div className="col-2 mt-4"
                          style={{
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            padding: '1rem',
                            marginBottom: '',
                            borderRadius: '4px',
                            maxinumHeight: 700
                          }}>
                          <Cart courses={cart} handleRemove={handleRemove} />
                        </div>}
                    </div>
                  </div>}
              </div>
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
          path="/Search/:q"
          element={
            <App />
          }
        />
        <Route
          path="/:dept/:number"
          element={
            <div>
              <ToastContainer />
              <Nav handleShowCart={handleShowCart} showCart={showCart} />
              <div className="mt-4 d-flex justify-content-center">
                <div className='col-5 d-flex'>
                  <input type="text" name="query" className='form-control my-3' placeholder='Search for a course' value={query} onChange={e => setQuery(e.currentTarget.value)} />
                  <a href={`/Search/${query}`}>
                    <button style={{ width: 80 }} className='m-3 btn btn-primary' onClick={() => sessionStorage.setItem("query", query)}> Search</button>
                  </a>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <small className='mt-3'>
                  {`Showing ${data.length} results`}
                </small>
              </div>
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
                    <div className="mt-4 m-5 col-6" style={{
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      padding: '1rem',
                      borderRadius: '4px',
                      maxinumHeight: 700
                    }}>
                      <Detail data={data} handleAdd={handleAdd} handleRemove={handleRemove} handleLike={handleLike} handleUnlike={handleUnlike} />
                    </div>
                  </div>
                }
                {showCart &&
                  <div className='d-flex justify-content-around'>
                    <div className="col-3 mt-4">
                      <Courses courses={data} />
                    </div>
                    <div className="mt-4 col-5" style={{
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      borderRadius: '4px',
                      maxinumHeight: 700
                    }}>
                      <Detail data={data} handleAdd={handleAdd} handleRemove={handleRemove} handleLike={handleLike} handleUnlike={handleUnlike} />
                    </div>
                    <div className="mt-4 m-4 col-3" style={{
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      padding: '1rem',
                      borderRadius: '4px',
                      maxinumHeight: 700
                    }}>
                      <Cart courses={cart} handleRemove={handleRemove} />
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
