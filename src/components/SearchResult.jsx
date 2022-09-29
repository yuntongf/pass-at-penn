import Cart from "./Cart";
import Courses from "./Courses";
import React from "react";

const SearchResult = ({ queryString, data, showCart, handleRemove }) => {
   data = data.filter((c) => c.title !== "")
   console.log(data)
   return (
      <div>
         <div className='d-flex justify-content-center'>
            <small className='mt-1 mb-2'>
               {`Showing ${data.length} results for ${queryString}`}
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
                  <Cart handleRemove={handleRemove} />
               </div>}
         </div>
      </div>
   );
}

export default SearchResult;