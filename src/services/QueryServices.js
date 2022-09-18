export function getFilterFromQuery(query, filters) {
   if (query) {
      const queries = query.split("&");
      let k = 0
      for (let i = 0; i < queries.length; i++) {
        const filter = queries[i].split('=');
        if (filter.length > 1) {
          filters[k] = filter[1];
          k++;
        }
      }
   }
   return filters;
}