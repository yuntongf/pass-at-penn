import { TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';
import React from 'react';
import { showCartSet } from '../../store/reducers/nav';
import { detailViewed } from '../../store/reducers/courses';
import { showFourYearPlanSet } from '../../store/reducers/nav';
import { navButtonOn, navButtonOff } from '../../styles/NavStyles';
import { Link } from "react-router-dom";
import { checkOutPageSet, frontPageReturned } from '../../store/reducers/nav';
import { querySet} from '../../store/reducers/search';
import { AppDispatch } from '../../store/configureStore';
import { RootState } from '../../store/configureStore';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const StateControl = () => {
    
    const data = useSelector((store : RootState) => store.entities.courses);
    const showCart = useSelector((store : RootState) => store.nav.showCart);
    const onContentPage = useSelector((store : RootState) => store.nav.onContentPage);
    const showFourYearPlan = useSelector((store : RootState) => store.nav.showFourYearPlan);
    const current = useSelector((store : RootState) => store.entities.current);
    const query = useSelector((store : RootState) => store.search.queryString);
    const onCheckoutPage = useSelector((store : RootState) => store.nav.onCheckoutPage);
    
    const dispatch = useDispatch();

    const toggleFourYearPlan = () => {
        dispatch(showFourYearPlanSet(!!data && query));
    }

    const toggleCart = () => {
        dispatch(showCartSet(null));
    }

    const hideDetail = () => {
        dispatch(detailViewed(null));
    }

    const handleBack = () => {
        dispatch(checkOutPageSet(false));
    }

    return (
        <div>
            {current && !onCheckoutPage && 
                <button style={navButtonOn} 
                        className="m-2 btn btn-outline-secondary" 
                        onClick={hideDetail}> 
                    Detail 
                </button>}

            {onContentPage && !onCheckoutPage && 
                <button style={showCart ? navButtonOn : navButtonOff} 
                        className="m-2 btn btn-outline-secondary" 
                        onClick={toggleCart}> 
                    Cart 
                </button>}
            
            {!onCheckoutPage && 
                <button style={showFourYearPlan ? navButtonOn : navButtonOff} 
                        className='m-2 btn btn-outline-secondary' 
                        onClick={toggleFourYearPlan}> 
                    4 Years 
                </button>}

            {onCheckoutPage &&
                <Link to='/'>
                    <button style={navButtonOn} 
                            className='m-2 btn btn-outline-secondary'
                            onClick={handleBack}> 
                        Back
                    </button>
                </Link>}
      </div>
    )
}

export default StateControl;