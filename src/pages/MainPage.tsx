
import { ToastContainer } from 'react-toastify'
import Nav from '../components/Nav'
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResultPage from './SearchResultPage';
import FourYearPlanPage from './FourYearPlanPage';
import { useSelector, useDispatch } from 'react-redux';
import { loadCourses } from '../store/reducers/courses.js';
import { RootState } from '../store/configureStore.js';

const MainPage = () => {
    // some state control variables
    const onContentPage = useSelector((store : RootState) => store.nav.onContentPage);
    const showFourYearPlan = useSelector((store : RootState) => store.nav.showFourYearPlan);
    const hideSearchBar = useSelector((store : RootState) => store.nav.hideSearchBar);
    const query = useSelector((store : RootState) => store.search.queryString);

    const dispatch = useDispatch();
    dispatch(loadCourses(null)); // initialize cart and four year plan with default value in redux store

    return (
        <>
            <ToastContainer />
            <Nav />
            {!hideSearchBar && <SearchBar />}
            {showFourYearPlan && <FourYearPlanPage />}
            {!showFourYearPlan && onContentPage && query && <SearchResultPage/>}
        </>
    )
}

export default MainPage;