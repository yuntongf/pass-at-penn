import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {courseRemoved, currentCartSet, detailViewed, newCartCreated, courseRemovedFromSemester} from '../../store/reducers/courses';
import { useDrag } from 'react-dnd';
import { ICourse, RootState } from "../../store/configureStore";
import { toastSuccess } from "../../services/NotificationServices";
import { cartRemoveButton, draggable, fourYearPlanRemoveButton } from "../../styles/CartStyles";

interface CourseInCartProps {
    course: ICourse,
    inCoursePlan: boolean,
    year?: string,
    semester?: string
}

const CourseInCart = ({course, inCoursePlan, year, semester} : CourseInCartProps) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: 'course',
        item: course,
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      }), [course]);

    const dispatch = useDispatch();

    const handleDetail = (course : ICourse) => {
        dispatch(detailViewed(course));
      }

      const handleRemoveFromPlan = (course : ICourse) => {
        dispatch(courseRemovedFromSemester({course: course, year: year, semester: semester}));
      }
    
      const handleRemove = (course : ICourse) => {
        dispatch(courseRemoved(course));
        toastSuccess('Course removed from cart!');
      }

    return (
        <div>
            <div className="d-flex justify-content-between" key={`${course.dept}-${course.number}`}>
                <div ref={drag}
                    style={draggable}>
                    <Link className="text-decoration-none" onClick={() => handleDetail(course)} to="">
                        <li className="list-group-item">
                        <div className="mt-1 ms-2">{`${course.dept} ${course.number}`}</div>
                        </li>
                    </Link>
                    {!inCoursePlan && course.note !== "" &&
                        <small className="ms-2">{course.note}</small>}
                </div>
                {!inCoursePlan && <button onClick={() => handleRemove(course)} style={cartRemoveButton} className="m-2 btn btn-sm btn-danger">Remove</button>}
                {!!inCoursePlan && <button className="btn btn-sm btn-outline" style={fourYearPlanRemoveButton} onClick={() => handleRemoveFromPlan(course)}> x </button>}
            </div>
        </div>
    )
}

export default CourseInCart;