import React from "react";
import Filter from "./Filter";

const SearchLarge = ({ setShowFilter, showFilter, query, setQuery, difficulty, quality, instructorQuality, setQuality, setInstructorQuality, setDifficulty }) => {
   return (
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
      </div>)
}

export default SearchLarge;