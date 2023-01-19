import React from "react";
import {courseAdded, courseRemoved} from '../../store/reducers/courses';
import { useDispatch, useSelector } from 'react-redux'
import { toastSuccess } from "../../services/NotificationServices";
import { addRemoveButton } from "../../styles/DetailStyles";
import { RootState } from "../../store/configureStore";

const DetailHeader = () => {
   const dispatch = useDispatch();
   const course = useSelector((store : RootState) => store.entities.current);
   
   const handleAdd = () => {
      dispatch(courseAdded(course));
      toastSuccess('Course added to cart!');
   }

   const handleRemove = () => {
      dispatch(courseRemoved(course));
      toastSuccess('Course removed from cart!');
    }

    return (
        <>
            <div className="d-flex justify-content-between">
               <h4 className="mt-1">
                  {`${course.dept} ${course.number}`}
               </h4>
               <div className="d-flex">
                  {course.added ?
                     <button  className="me-2 mb-2 btn btn-outline-danger" 
                           style={addRemoveButton} 
                           onClick={() => handleRemove()} >
                        Remove
                     </button> :
                     <button  className="me-2 mb-2 btn btn-primary" 
                           style={addRemoveButton} 
                           onClick={() => handleAdd()}> 
                        Add to Cart
                     </button>
                  }
               </div>
            </div>
            <p>{course.title}</p>
        </>
    );
}

export default DetailHeader;