import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { currentCartCoursesList, currentCartCoursesWrapper } from "../../styles/CartStyles";
import CourseInCart from "./CourseInCart";
import { ICourse, RootState } from "../../store/configureStore";

const CurrentCartContent = () => {
    // initialize current cart and courses in cart with data in store
    const cart = useSelector((store : RootState) => store.entities.cart);
    var courses = cart.courses;

    const emptyCartMessage = "Your cart is currently empty!";
    const clickToViewDetailPrompt = "Click on course title to view detail!"
    return (
        <>
            <div className="mt-1" style={currentCartCoursesWrapper}>
                {courses.length == 0 
                ? <p>{emptyCartMessage}</p> 
                : <div style={currentCartCoursesList}>
                    <p style={{fontSize: 13}}>{clickToViewDetailPrompt}</p>
                    {courses.map((course: ICourse) => (
                        <CourseInCart course={course} inCoursePlan={false}/>
                    ))}
                  </div>}
            </div>
        </>
    )
}

export default CurrentCartContent;