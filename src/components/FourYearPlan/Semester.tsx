import React from "react";
import { useDrop } from 'react-dnd';
import {useSelector, useDispatch} from 'react-redux';
import { courseAddedToSemester } from "../../store/reducers/courses";
import { semesterCourseList } from "../../styles/FourYearStyles";
import CourseInCart from "../Cart/CourseInCart";
import { IYear, ISemester, ICourse } from "../../store/configureStore";

interface SemesterProps {
    year: string,
    semester: ISemester
}

const SemesterComponent = ({year, semester} : SemesterProps) => {
    const dispatch = useDispatch();

    const handleDrop = (course : ICourse) => {
        dispatch(courseAddedToSemester({year: year, semester: semester.name, course: course}));
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'course',
        drop: (course : ICourse) => handleDrop(course),
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      }));

    return (
        <div>
            <div>
                <div className="mt-1 mb-1">
                    {semester.name}
                </div>
                <div className="card" ref={drop} style={semesterCourseList}>
                    {semester.courses.map((course : ICourse) => 
                        <CourseInCart course={course} year={year} semester={semester.name} inCoursePlan={true}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SemesterComponent;