
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer';

export const store = configureStore({reducer: reducer});

export interface IYear {
    name: string,
    semesters: ISemester[]
}

export interface ISemester {
    name: string,
    courses: ICourse[]
}

export interface ICourse {
    id: string,
    title: string,
    description: string,
    semester: string,
    num_sections: number,
    course_quality: number,
    instructor_quality: number,
    difficulty: number,
    work_required: number,
    recommendation_score: number,
    added: boolean,
    dept: string,
    number: string,
    note: string
}

export interface ICart {
    name: string,
    courses: ICourse[]
}

export interface RootState {
    entities: {
        courses: ICourse[],
        current: ICourse,
        cart: ICart,
        carts: ICart[],
        fourYears: IYear[]
    },
    search: {
        queryString: string,
        filterString: string,
        showFilter: boolean,
        filters: {
            difficulty: number[],
            quality: number[],
            instructorQuality: number[]
        },
        loaded: boolean
    }
    nav: {
        showFourYearPlan: boolean,
        showCart: boolean,
        hideSearchBar: boolean,
        onContentPage: boolean,
        onCheckoutPage: boolean
    }
  }

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch