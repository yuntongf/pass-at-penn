import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Courses from './components/Courses'
import Cart from './components/Cart'
import 'bootstrap/dist/css/bootstrap.css'
import Detail from './components/Detail'
import { React, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Receipt from './components/Receipt'
import Search from './components/Search'
import Filter from './components/Filter'

function App() {
  /* certain data such as cart and noted are stored on sessionStorage 
  so they can be retrieved repeatedly from all elements */
  const q = sessionStorage.getItem('query')
  let params = [0, 0, 0]
  if (q) {
    const queries = q.split("&");
    let k = 0
    for (let i = 0; i < queries.length; i++) {
      const param = queries[i].split('=');
      if (param.length > 1) {
        params[k] = param[1];
        k++;
      }
    }
  }
  const c = sessionStorage.getItem('cart')
  const l = sessionStorage.getItem('noted')
  const [cart, setCart] = useState(c ? JSON.parse(c) : [])
  const [noted, setNoted] = useState(l ? JSON.parse(l) : [])
  const [data, setData] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState(params[0] === 0 ? [1, 4] : params[0].split('-'))
  const [quality, setQuality] = useState(params[1] === 0 ? [1, 4] : params[1].split('-'))
  const [instructorQuality, setInstructorQuality] = useState(params[2] === 0 ? [1, 4] : params[2].split('-'))
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    fetch(`/api/base/2022A/search/courses/?${q !== 'undefined' ? `search=${q}` : 'search=CIS'}`)
      .then(res => res.json())
      .then(function (courses) {
        courses = courses.filter(c => c.title)
        for (let i = 0; i < courses.length; i++) {
          const [dept, number] = courses[i].id.split('-')
          courses[i].dept = dept
          courses[i].number = number
          courses[i].added = false
          if (courses[i].prerequisites) {
            const prereqs = courses[i].prerequisites.split(', ')
            courses[i].prereqs = prereqs
          }
        }
        for (let i = 0; i < courses.length; i++) {
          const course = courses[i]
          if (course.prereqs) {
            for (let j = 0; j < course.prereqs.length; j++) {
              const [prereq] = courses.filter(c => `${c.dept} ${c.number}` === course.prereqs[j])
              if (prereq) {
                course.prereqs[j] = prereq
              }
            }
          }
          if (courses[i]) {
            for (let j = 0; j < cart.length; j++) {
              if (cart[j].dept === course.dept && cart[j].number === course.number) { courses[i].added = true }
            }
            for (let j = 0; j < noted.length; j++) {
              if (noted[j].dept === course.dept && noted[j].number === course.number) { courses[i].noted = true }
            }
            courses[i].note = "";
          }
        }
        setData(courses)
      })
  }, [])

  function handleAdd(course) {
    if (cart.length === 7) {
      toast.warning('Cannot add more than 7 courses 🦄', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      return
    }
    const courses = [...data]
    const [target] = courses.filter((c) => c.dept === course.dept && c.number === course.number)
    target.added = true

    const temp = [...cart, course]
    setCart(temp)
    sessionStorage.setItem('cart', JSON.stringify(temp))
  }

  function handleNote(course, note) {
    if (note === "") {
      toast.error('Note cannot be empty', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      return
    }
    const courses = [...data]
    const [target] = courses.filter((c) => c.dept === course.dept && c.number === course.number)
    target.noted = true
    target.note = note
    const temp = [...noted, course]
    setNoted(temp)
    setData(courses);
    sessionStorage.setItem('noted', JSON.stringify(temp))
    toast.success('Note saved!', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  function handleRemove(course) {
    const courses = [...data]
    const [target] = courses.filter((c) => c.dept === course.dept && c.number === course.number)
    target.added = false
    setData(courses)

    let temp = [...cart]
    temp = temp.filter(c => c.dept !== course.dept || c.number !== course.number)
    setCart(temp)
    sessionStorage.setItem('cart', JSON.stringify(temp))
  }

  function handleUnnote(course) {
    const courses = [...data]
    const [target] = courses.filter((c) => c.dept === course.dept && c.number === course.number)
    target.noted = false
    target.note = ""
    let temp = [...noted]
    temp = temp.filter(c => c.dept !== course.dept || c.number !== course.number)
    setNoted(temp)
    sessionStorage.setItem('noted', JSON.stringify(temp))
    toast('Note trashed', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  function handleShowCart() {
    setShowCart(!showCart)
  }

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <ToastContainer />
              <Nav handleShowCart={handleShowCart} showCart={showCart} />
              <div>
                {q == null
                  ?
                  <div>
                    <div className='mt-5 d-flex justify-content-center'>
                      <div className='col-8' style={{ position: 'absolute', top: '40%' }}>
                        <div className='d-flex'>
                          <button className='btn col-2' onClick={() => setShowFilter(!showFilter)}>{`${showFilter ? "Hide" : "Show"} Filter`}</button>
                          <input type='text' name='query' className='form-control my-3' placeholder='Search for a course' value={query} onChange={e => setQuery(e.currentTarget.value)} />
                          <a href={`/Search/${query}`}>
                            <button style={{ width: 80 }} className='m-3 btn btn-primary' onClick={() => sessionStorage.setItem('query', query)}> Search</button>
                          </a>
                        </div>
                        <div className='col-11 mt-3'>
                          <Filter showFilter={showFilter} quality={quality} difficulty={difficulty} instructorQuality={instructorQuality} setQuality={setQuality} setDifficulty={setDifficulty} setInstructorQuality={setInstructorQuality} />
                        </div>
                      </div>
                    </div>
                  </div>
                  :
                  <div>
                    <Search
                      setShowFilter={setShowFilter}
                      showFilter={showFilter}
                      query={query}
                      setQuery={setQuery}
                      difficulty={difficulty}
                      quality={quality}
                      instructorQuality={instructorQuality}
                      setQuality={setQuality}
                      setInstructorQuality={setInstructorQuality}
                      setDifficulty={setDifficulty} />
                    <div className='d-flex justify-content-center'>
                      <small className='mt-1 mb-2'>
                        {`Showing ${data.length} results for ${q}`}
                      </small>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <div className='col-6 mt-1 ms-4 me-5'>
                        <Courses courses={data} />
                      </div>
                      {showCart &&
                        <div className='col-2'
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
        < Route
          path='/Checkout/:receipt'
          element={
            < div >
              <Nav handleShowCart={handleShowCart} showCart={showCart} />
              <div className='d-flex justify-content-center'>
                <div className='col-5 mt-5'>
                  <Receipt />
                </div>
              </div>
            </div >
          }
        />
        < Route
          path='/Search/:q'
          element={
            < App />
          }
        />
        < Route
          path='/:dept/:number'
          element={
            < div >
              <ToastContainer />
              <Nav handleShowCart={handleShowCart} showCart={showCart} />
              <Search
                setShowFilter={setShowFilter}
                showFilter={showFilter}
                query={query}
                setQuery={setQuery}
                difficulty={difficulty}
                quality={quality}
                instructorQuality={instructorQuality}
                setQuality={setQuality}
                setInstructorQuality={setInstructorQuality}
                setDifficulty={setDifficulty} />
              <div className='d-flex justify-content-center'>
                <small className='mt-3'>
                  {`Showing ${data.length} results for ${q}`}
                </small>
              </div>
              <div className='' style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '0 calc(1rem + 5%)'
              }}>
                {!showCart &&
                  <div className='d-flex justify-content-around'>
                    <div className='col-5 mt-4'>
                      <Courses courses={data} />
                    </div>
                    <div className='mt-4 m-5 col-6' style={{
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      padding: '1rem',
                      borderRadius: '4px',
                      maxinumHeight: 700
                    }}>
                      <Detail data={data} handleAdd={handleAdd} handleRemove={handleRemove} handleNote={handleNote} handleUnnote={handleUnnote} />
                    </div>
                  </div>
                }
                {showCart &&
                  <div className='d-flex justify-content-around'>
                    <div className='col-3 mt-4'>
                      <Courses courses={data} />
                    </div>
                    <div className='mt-4 col-5' style={{
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      borderRadius: '4px',
                      maxinumHeight: 700
                    }}>
                      <Detail data={data} handleAdd={handleAdd} handleRemove={handleRemove} handleNote={handleNote} handleUnnote={handleUnnote} />
                    </div>
                    <div className='mt-4 m-4 col-3' style={{
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      padding: '1rem',
                      borderRadius: '4px',
                      maxinumHeight: 700
                    }}>
                      <Cart handleRemove={handleRemove} />
                    </div>
                  </div>
                }
              </div>
            </div >
          }
        />
      </Routes >
    </div >
  )
}

export default App
