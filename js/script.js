/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

/* showPAge function to display a page of 9 students from data in data.js */
// meaningful variable name in scope for data
const studentData = data;
const pageSize = 9;

const studentList = document.querySelector(".student-list");
// html to insert to page
studentList.innerHTML = "";
let contentHTML = "";
const showPage = (list, page) => {
  // if list is empty return 'no search results'
  if (list.length === 0) {
    contentHTML = `
      <div>
        <h2>No results found.</h2>
      </div>
    `;
    studentList.innerHTML = contentHTML;
  } else {
    // start and end index for students to display on page
    const startIndex = page * 9 - 9;
    const endIndex = page * 9;

    // return segment of array between start and end index
    const currentPageList = list.slice(startIndex, endIndex);

    // create HTML for each student
    currentPageList.forEach((element) => {
      contentHTML = `
      <li class="student-item cf">
        <div class="student-details">
          <img class="avatar" src="${element.picture.medium}" alt="Profile Picture">
          <h3>${element.name.first} ${element.name.last}</h3>
          <span class="email">${element.email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${element.registered.date}</span>
        </div>
      </li>
    `;

      // append each new LI to studentList on page
      studentList.innerHTML += contentHTML;
    });
  }
};

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const linkList = document.querySelector(".link-list");

const addPagination = (list) => {
  // work out how many pages needed
  const pagesNeeded = Math.ceil(list.length / 9);

  linkList.innerHTML = "";

  // insert required buttons into HTML based on list param
  for (i = 0; i < pagesNeeded; i++) {
    const button = `
      <li>
        <button type="button">${i + 1}</button>
      </li>
    `;
    linkList.innerHTML += button;
  }

  // apply active class to first button if it exists
  if (linkList.childElementCount < 1) {
    return;
  } else {
    linkList.firstElementChild.firstElementChild.classList.add("active");
  }
};

// event listener for pageiation buttons
linkList.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    // change active class to currently selected button
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    const newPageNum = e.target.innerHTML;
    // fetch new page of content with current clicked pagination number as page
    studentList.innerHTML = "";
    showPage(studentData, newPageNum);
  }
});

/*
Search Functionality
*/
// searchbar layout
const searchBarHTML = `
<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`;

// insert the searchbar into DOM
document.querySelector("h2").insertAdjacentHTML("beforeend", searchBarHTML);

// event listener on searchbar
const searchBar = document.getElementById("search");

searchBar.addEventListener("keyup", () => {
  // reset page html
  studentList.innerHTML = "";
  // normalise searchinput
  const searchText = searchBar.value.toLowerCase();

  // new array populated by search bar results
  let searchStudentArray = studentData.filter((element) => {
    return (
      element.name.first.toLowerCase().includes(searchText) ||
      element.name.last.toLowerCase().includes(searchText)
    );
  });
  addPagination(searchStudentArray);
  showPage(searchStudentArray, 1);
});

// Call functions
addPagination(studentData);
showPage(studentData, 1);
