import {toast } from 'react-toastify'

export function handleRemoveHelper(course, data, cart, setData, setCart) {
   const courses = [...data]
   const [target] = courses.filter((c) => c.dept === course.dept && c.number === course.number)
   if (target) {
      target.added = false
   }
   setData(courses)

   let temp = [...cart]
   temp = temp.filter(c => c.dept !== course.dept || c.number !== course.number)
   setCart(temp)
   sessionStorage.setItem('cart', JSON.stringify(temp))
 }

export function handleAddHelper(course, data, cart, setCart) {
   if (cart.length === 7) {
     toast.warning('Cannot add more than 7 courses 🦄', {
       position: 'top-center',
       autoClose: 1500,
       hideProgressBar: true,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined
     })
     return
   }
   const courses = [...data]
   const [target] = courses.filter((c) => c.dept === course.dept && c.number === course.number)
   target.added = true

   const temp = [...cart, course]
   setCart(temp)
   sessionStorage.setItem('cart', JSON.stringify(temp))
 }