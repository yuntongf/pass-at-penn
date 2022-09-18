import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

const Detail = ({ data, handleAdd, handleRemove, handleNote, handleUnnote }) => {
   const { dept, number } = useParams();
   let [course] = data.filter(c => c.dept === dept && c.number === number);
   let [note, setNote] = useState("");
   note = course.note;

   function handleTrash() {
      setNote("");
      return handleUnnote(course);
   }

   return (
      <div style={{ height: 520, overflow: 'auto' }}>
         <div style={{ maxHeight: 480, overflow: 'auto' }}>
            <div className="d-flex justify-content-between">
               <h4 className="mt-1">{`${dept} ${number}`}</h4>
               <div>
                  {course.added ?
                     <btn onClick={() => handleRemove(course)} style={{ width: 110 }} className="me-2 mb-2 btn btn-danger">Remove</btn> :
                     <btn className="me-2 mb-2 btn btn-primary" style={{ width: 110 }} onClick={() => handleAdd(course)}> Add to Cart</btn>
                  }
               </div>
            </div>
            <p>{course.title}</p>
            <div className="row row-cols-2">
               <div className="col m-1">
                  {`Quality: ${course.course_quality}`}
               </div>
               <div className="col m-1">
                  {`Difficulty: ${course.difficulty}`}
               </div>
               <div className="col m-1">
                  {`Instructor Quality: ${course.instructor_quality}`}
               </div>
               <div className="col m-1">
                  {`Work Required: ${course.work_required}`}
               </div>
            </div>
            <h5 className="mt-3">Course Description:</h5>
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
         <div className="d-flex justify-content-between">
            <div className={course.noted ? "col-8 ms-1 me-1" : "col-10 ms-1 me-1"}>
               <textarea type='text' name='note' className='form-control' placeholder='Your note' value={note} onChange={e => setNote(e.currentTarget.value)} rows="1" />
            </div>
            <div>
               <btn onClick={() => handleNote(course, note)} className="me-2 btn btn-outline-warning" > ✏️ </btn>
               {course.noted && <btn onClick={() => handleTrash()} className={course.noted ? "btn btn-outline-secondary" : "btn btn-outline-warning"} > 🗑 </btn>}
            </div>
         </div>


      </div>
   )
}

export default Detail;