import http from "./HttpServices";

export function getCourse(code) {
   // fetch('/api/base/2022A/courses/CIS-120/')
	// .then(res => res.json())
	// .then(console.log);
   return http.get(`/api/base/2019C/courses/${code}/`);
}
