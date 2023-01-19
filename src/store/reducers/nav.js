import {createSlice} from '@reduxjs/toolkit';

/*
nav: 
{
    showFourYearPlan: false,
    showCart: false,
    hideSearchBar: false,
    onContentPage: false  // true if on fourYearPlan page or on searchResult page; false otherwise
    
}
some notes on navigation:
    front page contains: navbar, searchbar
    contentpage has two types:
        fourYearPlan page which shows Cart, Detail, and fourYearPlan
        searchResult page which shows list of Courses, Detail, and Cart
*/

const slice = createSlice({
    name: 'nav',
    initialState: {},
    reducers: {
        showFourYearPlanSet: (nav, action) => {
            nav.showFourYearPlan = !nav.showFourYearPlan;
            /* if we are on fourYearPlan page, we automatically
              show cart and hide search bar */
            if (nav.showFourYearPlan) {
                nav.showCart = true;
                nav.onContentPage = true;
                nav.hideSearchBar = true;
            } else {
                nav.hideSearchBar = false;
            }
            console.log(action.payload);
            /* if !!data is false, then no data has been loaded 
                and we should not return to content page */
            if (!action.payload) { 
                nav.onContentPage = false;
            }
        },
        searchBarSet: (nav, action) => {
            nav.hideSearchBar = !nav.hideSearchBar;
        },
        showCartSet: (nav, action) => {
            nav.showCart = !nav.showCart;
        },
        onContentPageSet: (nav, action) => {
            nav.onContentPage = action.payload;
        },
        showFourYearPlanReset: (nav, action) => {
            nav.showFourYearPlan = false;
            nav.hideSearchBar = false;
        },
        frontPageReturned: (nav, action) => {
            nav.onContentPage = false;
            nav.showFourYearPlan = false;
            nav.hideSearchBar = false;
        },
        checkOutPageSet: (nav, action) => {
            nav.onCheckoutPage = action.payload;
        }
    }
    
})

export const {
    showFourYearPlanSet, 
    onContentPageSet, 
    showCartSet, 
    showFourYearPlanReset, 
    searchBarSet, 
    checkOutPageSet,
    frontPageReturned} = slice.actions;
export default slice.reducer;
