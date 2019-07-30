/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Global variables to store the list and list items per page
const listItems = document.querySelector('.student-list').children;
const itemsPerPage = 10;

// Loads the page and displays the first 10 items in list initially
document.addEventListener('DOMContentLoaded', () => {
   showPage(listItems, 1);
})

// Displays ten items on a page 
function showPage(list, page) {
   // A start and end point to get the items on the desired page
   let startIndex = (page * itemsPerPage) - itemsPerPage; 
   let endIndex = page * itemsPerPage;  

   // Loops over to show the ten items and hide the others
   for (let i=0; i<list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = 'block' ;
      } else {
         list[i].style.display = 'none';
      }
   }
}

// Appends and adds functionality to the pagination buttons
function appendPageLinks(list) {
   // Gets the total number of pages required for the list
   const totalPages = Math.ceil(list.length/itemsPerPage);

   // Creates a 'div' and 'ul' DOM element to be added to the html page
   let div =  document.createElement('div');
   div.classList.add('pagination');
   document.querySelector('.page').appendChild(div);
   var ul = document.createElement('ul');
   div.appendChild(ul);

   // Creates 'li' and 'a' (with href attribute) DOM element for every single page 
   for (let i=1; i<=totalPages; i++) {
      var li = document.createElement('li');
      ul.appendChild(li);
   
      var a = document.createElement('a');
      a.setAttribute("href", "#");
      li.appendChild(a);
      a.textContent = i;
      // Adds 'active' class to the first 'a' DOM element only
      ul.firstElementChild.firstElementChild.className = 'active';
   }
   var a = document.getElementsByTagName('a');
   const aTag = document.querySelectorAll('a');
   
   // Loops over the 'a' DOM element 
   for (let i=0; i<aTag.length; i++) {
      a[i].addEventListener('click', (event) => {
         // Removes the 'active' class from all of the 'a' DOM element
         for (let j=0; j<aTag.length; j++) {
            a[j].classList.remove("active");
         }
         // Adds the 'active' class to the one that was clicked
         if (event.target.tagName == 'A') {
            a[i].className = 'active';
         }
         // Calls the function to display the items on the desired page
         showPage(list, event.target.textContent);
      });
   }   
}

appendPageLinks(listItems);

// <---------------------------------- EXTRA CREDIT ----------------------------------------->
function search (list)  {
   var newList = [];

   // Adds a 'div', 'input' and 'button' on the html page
   let div =  document.createElement('div');
   div.classList.add('student-search');
   const search = document.querySelector('.cf');
   search.insertBefore(div, search.firstElementChild);

   var input = document.createElement('input');
   div.appendChild(input);
   input.placeholder = "Search for students..."
   const button = document.createElement('button');
   button.textContent = "Search"
   div.appendChild(button);

   // Searches and filters from the list everytime a key is pressed.   
   input.addEventListener('keyup', (e) => {
      for (let i=0; i<list.length; i++) {
         // Filters the matching result and displays it on the screen
         // Code taken from: https://teamtreehouse.com/workspaces/41026168 and https://www.w3schools.com/jsref/jsref_includes.asp
         if (list[i].textContent.toLowerCase().includes(e.target.value.toLowerCase()) ) {
            list[i].style.display = 'block' ;
            newList.push(list[i]);
         } else {
            list[i].style.display = 'none';
         }
      }
  
      // If there are no matched items then it displays 'No Results' on the screen
      if (newList.length == 0) {
         var h2 = document.createElement('h2');
         document.querySelector('.page').insertBefore(h2, document.querySelector('.student-list'));
         h2.innerHTML = "<h2> No Results </h2>"
      } else {
         if (document.querySelectorAll('h2')[1])  {
            document.querySelectorAll('h2')[1].style.display = "none";
         }
      }
      // Displays the pagination links (NOT WORKING)
      document.querySelector('.page').lastElementChild.style.display = 'none';
      if (newList.length > 0) {
         appendPageLinks(newList);         
      } else if (newList.length == 0) {
         appendPageLinks(list);             
      }

      // Empty the arrays so that they do not add the previous list items.
      newList = [];
   });

   // Searches and filters from the list everytime 'search' button is clicked.
   button.addEventListener('click', (e) => {
      for (let i=0; i<list.length; i++) {
         // Filters the matching result and displays it on the screen
         // Code taken from:https://teamtreehouse.com/workspaces/41026168 and https://www.w3schools.com/jsref/jsref_includes.asp
         if (input.value !== 0 &&  list[i].textContent.toLowerCase().includes(input.value.toLowerCase()) ) {
            list[i].style.display = 'block' ;
         } else {
            list[i].style.display = 'none';
         }
      }
   });
}

search(listItems);
