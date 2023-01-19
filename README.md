# Penn Course Cart https://www.penncoursecart.com/

## Main features
User will be directed to the main search page if it is their first time visiting the website. On the main search page, user can type in any keywords in the search bar, and adjust the slider to filter by difficulty, course quality, and instructor quality. 

After they press the search button, a search query is sent to the backend of penncourseplan, and the returned search result will be displayed as a list group. Click on any of the courses, the user will be provided with more detailed information about the course. They can choose to add the course to cart. They are also provided with the choice to take notes on a course. Notes for a course can be edited and deleted. The notes will show up in the cart to help user compare the notes they took for all courses in the cart.

Once a course is added to the cart or some notes have been written down for that course, emojis will show next to the course title in the course list group (✅ for in cart and ✏️ for note taken). This helps the user to easily see which course they have added to the cart or have taken notes for from the list of search result.

On the top right is the show/hide cart button, which displays courses in the cart on show. Users are allowed to remove courses from the cart by clicking 'remove' or see course detail by clicking on the title of the course.

## Design thinking
Since cart content should stay unchanged with the page is refreshed or a new search query is made, I chose to store cart information in sessionStorage. This enables accessing of cart content from all pages. In addition, cart is going to be accessed frequently but since the cart can only have at most 7 courses, it is likely not going to be modified on a frequent basis. Hence, storing cart content on sessionStorage provides becomes a good design choice because it provides global accessability despite inability to expand and to be constantly modified.

App.js is where I declared and initiated most of my state management variables. I pass down the necessary ones to the children pages and modify them using methods from files in the services folder. 

## Potential improvements
1. Implement user registration and authentication
2. Allow filtering by course availability
3. Display requirements fulfilled by the course on the course detail page
4. Allow user to rank courses in the cart based on preference
5. Add unit or integration tests



##
Redux
redux design

even after the user starts a new search, the notes and cart content persists
