import Detail from "./Detail";
import Courses from "./Courses";
import Cart from "./Cart";
import React from "react";
import { useParams } from "react-router-dom";

const SearchResultDetail = ({ queryString, data, showCart, handleRemove, handleAdd, handleNote, handleUnnote }) => {
   const { dept, number } = useParams();
   let [course] = data.filter((c) => c.dept === dept && c.number === number)
   if (!course) data = JSON.parse(sessionStorage.getItem("cart"))
   return (
      <div>
         <div className='d-flex justify-content-center'>
            <small className='mt-3'>
               {`Showing ${data.length} results for ${queryString}`}
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
      </div>
   );
}

export default SearchResultDetail;