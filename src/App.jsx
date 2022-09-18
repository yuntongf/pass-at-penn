import Nav from './components/Nav.jsx'
import Search from './components/Search'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { React, useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import SearchLarge from './components/SearchLarge';
import SearchResult from './components/SearchResult.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import SearchResultDetail from './components/SearchResultDetail.jsx'
import { handleNoteHelper, handleUnnoteHelper } from './services/NoteServices'
import { handleRemoveHelper, handleAddHelper } from './services/CartServices'
import { prepData } from './services/CourseServices';
import { getFilterFromQuery } from './services/QueryServices';

function App() {
  /* certain data such as cart and noted are stored on sessionStorage 
  so they can be retrieved repeatedly from all child elements */
  const queryString = sessionStorage.getItem('query')
  let filter = [0, 0, 0]
  filter = getFilterFromQuery(queryString, filter);

  const cartString = sessionStorage.getItem('cart')
  const notedString = sessionStorage.getItem('noted')
  const [cart, setCart] = useState(cartString ? JSON.parse(cartString) : [])
  const [noted, setNoted] = useState(notedString ? JSON.parse(notedString) : [])
  const [data, setData] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState(filter[0] === 0 ? [1, 4] : filter[0].split('-'))
  const [quality, setQuality] = useState(filter[1] === 0 ? [1, 4] : filter[1].split('-'))
  const [instructorQuality, setInstructorQuality] = useState(filter[2] === 0 ? [1, 4] : filter[2].split('-'))
  const [showFilter, setShowFilter] = useState(false)


  useEffect(() => {
    fetch(`/api/base/2022A/search/courses/?${queryString !== 'undefined' ? `search=${queryString}` : 'search=CIS'}`)
      .then(res => res.json())
      .then(function (courses) {
        prepData(courses, cart, noted)
        setData(courses)
      })
  }, [])

  function handleAdd(course) {
    handleAddHelper(course, data, cart, setCart);
  }

  function handleNote(course, note) {
    handleNoteHelper(course, note, data, setNoted, noted, setData)
  }

  function handleRemove(course) {
    handleRemoveHelper(course, data, cart, setData, setCart)
  }

  function handleUnnote(course) {
    handleUnnoteHelper(course, data, noted, setNoted)
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
              <Nav handleShowCart={handleShowCart} showCart={showCart} queryString={queryString} />
              <div>
                {queryString === "null"
                  ?
                  <SearchLarge
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
                    <SearchResult queryString={queryString} data={data} showCart={showCart} handleRemove={handleRemove} />
                  </div>}
              </div>
            </div>
          }
        />
        < Route
          path='/Checkout/:receipt'
          element={
            <CheckoutPage handleShowCart={handleShowCart} />
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
              <SearchResultDetail queryString={queryString} data={data} showCart={showCart} handleRemove={handleRemove} handleAdd={handleAdd} handleUnnote={handleUnnote} handleNote={handleNote} />
            </div >
          }
        />
      </Routes >
    </div >
  )
}

export default App
