import {toast } from 'react-toastify'

export function handleNoteHelper(course, note, data, setNoted, noted, setData) {
   if (note === "") {
     toast.error('Note cannot be empty', {
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
   target.noted = true
   target.note = note
   const temp = [...noted, course]
   setNoted(temp)
   setData(courses);
   sessionStorage.setItem('noted', JSON.stringify(temp))
   toast.success('Note saved!', {
     position: 'top-center',
     autoClose: 1500,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined
   })
 }

 export function handleUnnoteHelper(course, data, noted, setNoted) {
   const courses = [...data]
   const [target] = courses.filter((c) => c.dept === course.dept && c.number === course.number)
   target.noted = false
   target.note = ""
   let temp = [...noted]
   temp = temp.filter(c => c.dept !== course.dept || c.number !== course.number)
   setNoted(temp)
   sessionStorage.setItem('noted', JSON.stringify(temp))
   toast('Note trashed', {
     position: 'top-center',
     autoClose: 1500,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined
   })
 }