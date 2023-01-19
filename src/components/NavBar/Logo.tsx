import { Link } from "react-router-dom";
import { checkOutPageSet, frontPageReturned } from '../../store/reducers/nav';
import { querySet} from '../../store/reducers/search';
import { detailViewed } from '../../store/reducers/courses';
import { useDispatch} from 'react-redux';

const Logo = () => {
    const dispatch = useDispatch();
    const logo = "Pass@Penn";

    const returnToFrontPage = () => {
        dispatch(frontPageReturned(null));
        dispatch(querySet("")); // reset query in store when returning to the main page
        dispatch(detailViewed(null)); // reset current course to null
        dispatch(checkOutPageSet(false));
    }

    return (
        <Link to="/">
            <label onClick={returnToFrontPage}>
                <h2 className="m-2"> 
                    {logo} 
                </h2>
            </label>
        </Link>
    )
}

export default Logo;