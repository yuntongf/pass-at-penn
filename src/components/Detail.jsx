import { useParams } from "react-router-dom";

const findParams = (data, dept, number) => {
   let result = data.filter(c => c.dept === dept && c.number == number);
   return [result[0].title, result[0].description, result[0].prereqs];
}

const Detail = ({ data, handleAdd, handleRemove, handleLike, handleUnlike }) => {
   const { dept, number } = useParams();
   let [course] = data.filter(c => c.dept === dept && c.number == number);
   return (
      <div>
         {course.liked ?
            <div className="d-flex justify-content-between">
               <h4>{`${dept} ${number}`}</h4>
               <btn onClick={() => handleUnlike(course)} className=" btn btn-outline-warning"> ★ </btn>
            </div> :
            <div className="d-flex justify-content-between">
               <h4>{`${dept} ${number}`}</h4>
               <btn className="btn btn-outline-secondary" onClick={() => handleLike(course)}> ☆ </btn>
            </div>
         }
         <p>{findParams(data, dept, number)[0]}</p>
         <h5>Course Description:</h5>
         <p>{findParams(data, dept, number)[1]}</p>
         <div>
            {findParams(data, dept, number)[2] &&
               <h5>Pre-requisites:</h5>}

            {findParams(data, dept, number)[2] && <div>
               {findParams(data, dept, number)[2].map(
                  prereq =>
                     <div>
                        {prereq}
                     </div>
               )}
            </div>}
         </div>
         {course.added ?
            <btn onClick={() => handleRemove(course)} className="m-2 btn btn-danger">Remove</btn> :
            <btn className="btn btn-primary" onClick={() => handleAdd(course)}> Add to Cart</btn>
         }

      </div>
   )
}

export default Detail;