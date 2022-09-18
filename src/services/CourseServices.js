
export function prepData(courses, cart, noted) {
   courses = courses.filter(c => c.title)
        for (let i = 0; i < courses.length; i++) {
          const [dept, number] = courses[i].id.split('-')
          courses[i].dept = dept
          courses[i].number = number
          courses[i].added = false
          if (courses[i].prerequisites) {
            const prereqs = courses[i].prerequisites.split(', ')
            courses[i].prereqs = prereqs
          }
        }
        for (let i = 0; i < courses.length; i++) {
          const course = courses[i]
          if (course.prereqs) {
            for (let j = 0; j < course.prereqs.length; j++) {
              const [prereq] = courses.filter(c => `${c.dept} ${c.number}` === course.prereqs[j])
              if (prereq) {
                course.prereqs[j] = prereq
              }
            }
          }
          if (courses[i]) {
            for (let j = 0; j < cart.length; j++) {
              if (cart[j].dept === course.dept && cart[j].number === course.number) { courses[i].added = true }
            }
            for (let j = 0; j < noted.length; j++) {
              if (noted[j].dept === course.dept && noted[j].number === course.number) { courses[i].noted = true }
            }
            courses[i].note = "";
          }
        }
}
