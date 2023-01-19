import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { filterStringSet, querySet } from "../../store/reducers/search";
import { showFourYearPlanSet, onContentPageSet } from "../../store/reducers/nav";
import { RootState } from "../../store/configureStore";

const Bar = () => {
    const [query, setQuery] = useState(""); // local state variable
    const queryInStore = useSelector((store : RootState) => store.search.queryString); // global state variable in store
    const showFourYearPlan = useSelector((store : RootState) => store.nav.showFourYearPlan);

    /* initialize local search query variable 
      with global search query variable */
    useEffect(() => {
        setQuery(queryInStore);
    }, [queryInStore])

    const searchBarPlaceholder = 'Search for a course';

    const dispatch = useDispatch();
    const handleSearch = (query: string) => {
        if (query) {
            dispatch(querySet(query));
            dispatch(onContentPageSet(true));
            dispatch(filterStringSet(null));
            if (showFourYearPlan) dispatch(showFourYearPlanSet(queryInStore));
        }
     }

    return (
        <>
            <input type='text' name='query' className='form-control my-3' placeholder={searchBarPlaceholder} value={query} onChange={e => setQuery(e.currentTarget.value)} />
            <button style={{ width: 80 }} className='m-3 btn btn-primary' onClick={() => handleSearch(query)}> 
                Search
            </button>
        </>
    )
}

export default Bar;