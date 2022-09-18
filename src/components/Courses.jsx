
import { Link } from 'react-router-dom';
import React
  from 'react';
const Courses = ({ courses }) => {
  courses = courses.sort((a, b) => a.number - b.number);
  return (
    <ul className="list-group" style={{ maxHeight: 520, overflow: 'auto' }}>
      {courses.map(({ dept, number, title, added, noted }) => (
        <Link className="text-decoration-none" to={`/${dept}/${number}`} key={`${dept}-${number}`}>
          <li key={`${dept}-${number}`} className={added ? "bg-light font-weight-bolder list-group-item list-group-item-action p-4 flex-column align-items-start" : "list-group-item list-group-item-action p-4 flex-column align-items-start"}>
            <div>{noted ? '✏️ ' : ""}{added ? `✅ ${dept} ${number}: ${title}` : `${dept} ${number}: ${title}`}</div>
          </li>
        </Link>
      ))}
    </ul>)
}

export default Courses;