import { useParams } from "react-router-dom";
import data from '../data/courses.json'
import { Link } from "react-router-dom";

const Receipt = () => {
   let { receipt } = useParams();
   let courses = receipt.split("+");
   for (var i = 0; i < courses.length; i++) {
      let [course] = data.filter(c => `${c.dept}${c.number}` === courses[i]);
      courses[i] = course;
   }
   return (
      <div>
         <h4>You checked out the following courses:</h4>
         <div className="list-group mt-4">
            {courses.map(c =>
               <div className="list-group-item">
                  {`${c.dept} ${c.number}: ${c.title}`}
               </div>)}
         </div>
         <Link to="/">
            <button className="btn mt-1">Back</button>
         </Link>
      </div>
   );
}

export default Receipt;