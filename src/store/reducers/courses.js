
import {createSlice} from '@reduxjs/toolkit';

/*
store: 
{
    courses: [array of search results],  // array of course objects
    current: course currently being viewed // an course obejct
    cart: [courses in cart], // array of course objects
}

*/

const slice = createSlice({
    name: 'entities',
    initialState: {},
    reducers: {
        // initialize courses, cart, fourYears, carts, notes, and showCart
        loadCourses: (store, action) => {
            store.cart = store.cart || {name: "Default", courses: []};
            store.carts = store.carts || [{name: "Default", courses: []}];
            store.notes = store.notes || [];
            store.showCart = store.showCart || false;
            store.fourYears = store.fourYears || [
                {
                    name: '1st Year',
                    semesters: 
                    [
                        {
                            name: 'Fall',
                            courses:[]
                        },
                        {
                            name: 'Spring',
                            courses:[]
                        }
                    ]
                },
                {
                    name: '2nd Year',
                    semesters: 
                    [
                        {
                            name: 'Fall',
                            courses:[]
                        },
                        {
                            name: 'Spring',
                            courses:[]
                        }
                    ]
                },
                {
                    name: '3rd Year',
                    semesters: 
                    [
                        {
                            name: 'Fall',
                            courses:[]
                        },
                        {
                            name: 'Spring',
                            courses:[]
                        }
                    ]
                },
                {
                    name: '4th Year',
                    semesters: 
                    [
                        {
                            name: 'Fall',
                            courses:[]
                        },
                        {
                            name: 'Spring',
                            courses:[]
                        }
                    ]
                }
            ]

            // if current course is not in current cart we need to update its status
            if (store.current) {
                const [currentCourse] = store.cart.courses.filter(c => c.id === store.current.id);
                store.current.added = !!currentCourse;
            }

            if (action.payload) {
                var courses = [...action.payload];
                courses = courses.map(c => ({...c}));
                courses = courses.filter(c => c.title && c.course_quality) // only keep courses with title
    
                for (let i = 0; i < courses.length; i++) {
                    const [dept, number] = courses[i].id.split('-');
                    courses[i].dept = dept;
                    courses[i].number = number;
    
                    // initialize added and note variables
                    courses[i].added = false;
                    courses[i].note = "";
    
                    // note
                    const [courseNoted] = store.notes.filter(c => c.id === courses[i].id);
                    if (courseNoted) courses[i].note = courseNoted.note;
    
                    // update added courses from store.cart
                    const [courseInCart] = store.cart.courses.filter(c => c.id === courses[i].id);
                    if (courseInCart) courses[i].added = true;
                }
                courses = courses.sort((a, b) => a.number - b.number); // sort by course number
                store.courses = courses;
            }
        },
        detailViewed: (entities, action) => {
            if (!action.payload) {
                entities.current = null;
            } else {
                entities.current = action.payload;
            }
        },
        noteAdded: (store, action) => {
            const course = action.payload.course;
            const id = course.id;
            const note = action.payload.note;
            const courses = [...store.courses];
            const [target] = courses.filter(course => course.id === id);
            target.note = note;

            store.notes.push({
                id: id,
                note: note
            })

            //update current course
            store.current.note = note;

            // update carts
            for (var i = 0; i < store.carts.length; i++) {
                const cart = store.carts[i];
                const [courseNoted] = cart.courses.filter(c => c.id === course.id);
                if (courseNoted) courseNoted.note = note;
            }

            // update current cart
            const [courseNoted] = store.cart.courses.filter(c => c.id === course.id);
            if (courseNoted) courseNoted.note = note;
        },
        noteTrashed: (store, action) => {
            const course = action.payload.course;
            const id = action.payload.course.id;
            const courses = [...store.courses];
            const [target] = courses.filter(course => course.id === id);
            target.note = "";

            //update current course
            store.current.note = "";

            // update carts
            for (var i = 0; i < store.carts.length; i++) {
                const cart = store.carts[i];
                const [courseNoted] = cart.courses.filter(c => c.id === course.id);
                if (courseNoted) courseNoted.note = "";
            }

            // update current cart
            const [courseNoted] = store.cart.courses.filter(c => c.id === course.id);
            if (courseNoted) courseNoted.note = "";
        },
        courseAdded: (store, action) => {
            const courseToBeAdded = {...action.payload};
            // add course to cart
            courseToBeAdded.added = true;
            store.cart.courses.push(courseToBeAdded); 

            // update course in carts
            const [currentCart] = store.carts.filter(c => c.name === store.cart.name);
            currentCart.courses.push(courseToBeAdded)

            // update course in store.courses
            const [target] = store.courses.filter(c => c.id === courseToBeAdded.id);
            if (target) target.added = true;

            //update course in store.current
            if (store.current) store.current.added = true;
        },
        courseRemoved: (store, action) => {
            const courseToBeRemoved = {...action.payload};
            store.cart.courses = store.cart.courses.filter(c => c.id !== courseToBeRemoved.id);

            // update course in carts
            const [cartRemovedFrom] = store.carts.filter(c => c.name === store.cart.name);
            cartRemovedFrom.courses = cartRemovedFrom.courses.filter(c => c.id !== courseToBeRemoved.id);

            // update course in store.courses
            const [target] = store.courses.filter(c => c.id === courseToBeRemoved.id);
            if (target) target.added = false;

            //update course in store.current
            if (store.current) store.current.added = false;
        },
        newCartCreated: (entities, action) => {
            console.log('wawa');
            const newCart = {name: action.payload, courses:[]};
            entities.carts.push(newCart);
            entities.cart = newCart;
            console.log(JSON.stringify(entities.current));
        },
        currentCartSet: (entities, action) => {
            entities.cart = action.payload;
        },
        courseAddedToSemester: (entities, action) => {
            const [year] = entities.fourYears.filter(year => year.name === action.payload.year);
            // console.log(JSON.stringify(year));
            const [semester] = year.semesters.filter(semester => semester.name === action.payload.semester);
            // console.log(JSON.stringify(semester));
            const [courseExists] = semester.courses.filter(c => c.id === action.payload.course.id); // course already exists
            if (courseExists) return;
            else semester.courses.push(action.payload.course);
        },
        courseRemovedFromSemester: (entities, action) => {
            const [year] = entities.fourYears.filter(year => year.name === action.payload.year);
            // console.log(JSON.stringify(year));
            const [semester] = year.semesters.filter(semester => semester.name === action.payload.semester);
            // console.log(JSON.stringify(semester));
            semester.courses = semester.courses.filter(c => c.id !== action.payload.course.id);
        }
    }
})

export const {
    loadCourses, 
    noteAdded, 
    noteTrashed, 
    detailViewed, 
    courseAdded, 
    courseRemoved, 
    showCartSet, 
    newCartCreated, 
    currentCartSet, 
    courseAddedToSemester, 
    courseRemovedFromSemester} = slice.actions;
export default slice.reducer;
