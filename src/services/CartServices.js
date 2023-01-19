export const cartString = (courses) => {
    var result = "";
    for (var i = 0; i < courses.length; i++) {
      result += `+${courses[i].dept}-${courses[i].number}`;
    }
    return result.substring(1);
  }