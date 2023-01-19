import {createSlice} from '@reduxjs/toolkit';
/*
search:

{
    filtering: false,
    filters: 
    {
        difficulty: [0, 4],
        quality: [0, 4],
        instructorQuality: [0, 4]
    },
    onContentPage: false,
    loaded: false
}
*/

const slice = createSlice({
    name: 'search',
    initialState: {},
    reducers: {
        filtersSet: (search, action) => {
            if (action.payload.type === "quality") {
                search.filters.quality = action.payload.value;
                console.log(JSON.stringify(search.filters));
            } else if (action.payload.type === "difficulty") {
                search.filters.difficulty = action.payload.value;
            } else if (action.payload.type === "instructorQuality") {
                search.filters.instructorQuality = action.payload.value;
            } else if (action.payload.type === "disable") {
                search.filters = null;
            }
        },
        querySet: (search, action) => {
            console.log(action.payload);
            search.queryString = action.payload;
        },
        loadedSet: (search, action) => {
            search.loaded = action.payload;
        },
        showFilterSet: (search, action) => {
            // default filters 
            if (!search.filters) {
                search.filters = {
                    difficulty: [0, 4],
                    quality: [0, 4],
                    instructorQuality: [0, 4]
                };
            }
            if (action.payload) search.showFilter = false;
            else search.showFilter = !search.showFilter;
        },
        filterStringSet: (search, action) => {
            if (search.showFilter) {
                const difficulty = search.filters.difficulty;
                const quality = search.filters.quality;
                const instructorQuality = search.filters.instructorQuality;
                search.filterString =  `&difficulty=${difficulty[0]}-${difficulty[1]}&course_quality=${quality[0]}-${quality[1]}&instructor_quality=${instructorQuality[0]}-${instructorQuality[1]}`
              } else {
                search.filterString = "";
              }
        }
    }
});

export const {filtersSet, querySet, loadedSet, showFilterSet, filterStringSet} = slice.actions;
export default slice.reducer;