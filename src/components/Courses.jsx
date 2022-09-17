
import { Link } from 'react-router-dom';

const Courses = ({ courses }) => (
  <ul className="list-group mt-4" style={{ maxHeight: 650, overflow: 'auto' }}>
    {courses.map(({ dept, number, title, added, liked }) => (
      <Link className="text-decoration-none" to={`/${dept}/${number}`}>
        <li key={`${dept}-${number}`} className={added ? "bg-light font-weight-bolder list-group-item list-group-item-action p-4 flex-column align-items-start" : "list-group-item list-group-item-action p-4 flex-column align-items-start"}>
          <div>{liked ? '🌟 ' : ""}{added ? `✅ ${dept} ${number}: ${title}` : `${dept} ${number}: ${title}`}</div>
        </li>
      </Link>
    ))}
  </ul>
)

export default Courses;