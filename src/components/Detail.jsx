import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Detail = ({ data, handleAdd, handleRemove, handleLike, handleUnlike }) => {
   const { dept, number } = useParams();
   let [course] = data.filter(c => c.dept === dept && c.number === number);
   return (
      <div className="col-12">
         <div className="d-flex justify-content-between">
            <h4 className="mt-1">{`${dept} ${number}`}</h4>
            <div>
               {course.added ?
                  <btn onClick={() => handleRemove(course)} style={{ width: 110 }} className="me-2 mb-2 btn btn-danger">Remove</btn> :
                  <btn className="me-2 mb-2 btn btn-primary" style={{ width: 110 }} onClick={() => handleAdd(course)}> Add to Cart</btn>
               }
               <btn onClick={() => course.liked ? handleUnlike(course) : handleLike(course)} className={course.liked ? "mb-2 btn btn-outline-warning" : "mb-2 btn btn-outline-secondary"} > ★ </btn>
            </div>
         </div>
         <p>{course.title}</p>
         <h5>Course Description:</h5>
         <p>{course.description}</p>
         <div>
            {course.prereqs &&
               <h5>Pre-requisites:</h5>}

            {course.prereqs &&
               <div>
                  <div className="row row-cols-4">
                     {course.prereqs.map(
                        prereq =>
                           prereq.dept ?
                              <div className="card me-3 p-3 col-5">
                                 <Link className="text-decoration-none" to={`/${prereq.dept}/${prereq.number}`}>
                                    <h4>{`${prereq.dept} ${prereq.number}`}</h4>
                                    <div className="mb-2">{prereq.title}</div>
                                 </Link>
                                 {prereq.added ?
                                    <btn onClick={() => handleRemove(prereq)} className="btn btn-danger">Remove</btn> :
                                    <btn className="btn btn-primary" onClick={() => handleAdd(prereq)}> Add to Cart</btn>
                                 }
                              </div>
                              :
                              <div className="row row-cols-4 col-12">
                                 <div className="col-5 card me-3 p-3">
                                    {prereq}
                                 </div>
                              </div>

                     )}
                  </div>
               </div>}
         </div>


      </div>
   )
}

export default Detail;