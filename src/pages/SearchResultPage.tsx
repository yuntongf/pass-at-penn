
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import '../App.css'
import SearchResultDetail from '../components/SearchResult/SearchResultDetail'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadCourses } from '../store/reducers/courses';
import { loadedSet } from '../store/reducers/search';
import { toastWarn } from '../services/NotificationServices';
import { RootState } from '../store/configureStore'

const SearchResultPage = () => {
  const dispatch = useDispatch();
  const filterString = useSelector((store : RootState) => store.search.filterString);
  const query = useSelector((store : RootState) => store.search.queryString);
  
  async function getData() {
    fetch(`/api/base/2022C/search/courses/?type=course&search=${query + filterString}`)
    .then(res => res.json())
    .then(function (courses) {
      dispatch(loadCourses(courses));
      dispatch(loadedSet(true));
    })};

  useEffect(() => {
    if (!query) {
      toastWarn('Search field cannot be empty!');
    } else {
      dispatch(loadedSet(false));
      getData();
    }
  }, [query, filterString])

   return (<SearchResultDetail/>);
}

export default SearchResultPage;