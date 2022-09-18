import React from "react";
import Filter from "./Filter";
const Search = ({ setShowFilter, showFilter, query, setQuery, difficulty, quality, instructorQuality, setQuality, setInstructorQuality, setDifficulty }) => {
   return (
      <div>
         <div className='mt-4 d-flex justify-content-center'>
            <div className='col-6 d-flex'>
               <button className='btn col-2' onClick={() => setShowFilter(!showFilter)}>{`${showFilter ? "Hide" : "Show"} Filter`}</button>
               <input type='text' name='query' className='form-control my-3' placeholder='Search for a course' value={query} onChange={e => setQuery(e.currentTarget.value)} />
               <a href={`/Search/${query}&difficulty=${difficulty[0]}-${difficulty[1]}&course_quality=${quality[0]}-${quality[1]}&instructor_quality=${instructorQuality[0]}-${instructorQuality[1]}`}>
                  <button style={{ width: 80 }} className='m-3 btn btn-primary' onClick={() => sessionStorage.setItem('query', `${query}&difficulty=${difficulty[0]}-${difficulty[1]}&course_quality=${quality[0]}-${quality[1]}&instructor_quality=${instructorQuality[0]}-${instructorQuality[1]}`)}> Search</button>
               </a>
            </div>
         </div>
         <div className="d-flex justify-content-center">
            <div className="col-7">
               <Filter showFilter={showFilter} quality={quality} difficulty={difficulty} instructorQuality={instructorQuality} setQuality={setQuality} setDifficulty={setDifficulty} setInstructorQuality={setInstructorQuality} />
            </div>
         </div>
      </div>
   );
}

export default Search;