const addButtons = document.querySelectorAll(".add-button");
const formContainer = document.getElementById("form-container");
const tableBody = document.getElementById("table-body");
const submit = document.getElementById("submit"); // Changed from 'submitted' to 'submit'

let bookNumber = 0;
let myLibrary = [];

const book1 = {
  title: "Crime and punishment",
  author: "Fyodor Dostoyevksy",
  pages: 671, // Changed from 'page' to 'pages'
  read: "Yes",
};
const book2 = {
  title: "A brief history of time",
  author: "Stephen Hawking",
  pages: 212, // Changed from 'page' to 'pages'
  read: "No",
};

myLibrary.push(book1);
myLibrary.push(book2);

render();

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    formContainer.style.display = "block";
  });
});

function addDeleteButtons() {
  let deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    if (button.getAttribute("data-book") == bookNumber) {
      //Only add eventListeners to new books
      button.addEventListener("click", () => {
        // Removed extra 'sss' from "clicksss"
        deleteBook(button.getAttribute("data-book"));
      });
    }
  });
}

function addReadButtons() {
  let readButtons = document.querySelectorAll(".change-read");

  readButtons.forEach((button) => {
    if (button.getAttribute("data-book") == bookNumber) {
      button.addEventListener("click", () => {
        changeReadStatus(button.getAttribute("data-book"), button);
      });
    }
  });
}

function deleteBook(number) {
  let toDelete = document.querySelector(`tr[data-book="${number}"]`);
  toDelete.remove();
}

function changeReadStatus(number, button) {
  if (myLibrary[number]["read"] === "Yes") {
    myLibrary[number]["read"] = "No";
    button.innerText = "No";
    button.classList.remove("button-green");
    button.classList.add("button-red");
  } else {
    myLibrary[number]["read"] = "Yes";
    button.innerText = "Yes";
    button.classList.remove("button-red");
    button.classList.add("button-green");
  }
}

function addBookToLibrary(title, author, pages, read) {
  let book = { title: title, author: author, pages: pages, read: read }; // Changed from 'page' to 'pages'
  myLibrary.push(book);
}

function render() {
  for (let i = 0; i < myLibrary.length; i++) {
    if (i === bookNumber) {
      let row = document.createElement("tr");

      if (bookNumber % 2 !== 0) {
        //Adds color to every other row
        row.classList.add("color-row");
      }

      row.setAttribute("data-book", bookNumber);

      let titleCell = document.createElement("td");
      titleCell.append(myLibrary[i].title);
      row.append(titleCell);

      let authorCell = document.createElement("td");
      authorCell.append(myLibrary[i].author);
      row.append(authorCell);

      let pageCell = document.createElement("td");
      pageCell.append(myLibrary[i].pages); // Changed from 'page' to 'pages'
      row.append(pageCell);

      let readCell = document.createElement("td");
      let button = document.createElement("button");
      button.innerText = myLibrary[i].read;

      if (myLibrary[i].read === "Yes") {
        button.classList.add("button-green");
      } else {
        button.classList.add("button-red");
      }
      button.classList.add("change-read");
      button.setAttribute("type", "button");
      button.setAttribute("data-book", bookNumber);
      readCell.append(button);
      row.append(readCell);

      let deleteCell = document.createElement("td");
      let deleteButton = document.createElement("button");
      let icon = document.createElement("ion-icon");
      icon.setAttribute("name", "trash-outline");
      deleteButton.classList.add("delete");
      deleteButton.setAttribute("type", "button");
      deleteButton.setAttribute("data-book", bookNumber);

      deleteButton.append(icon);
      deleteCell.append(deleteButton);
      row.append(deleteCell);

      tableBody.insertBefore(row, tableBody.firstChild);

      addDeleteButtons(); // Changed from 'addDeletedButtons' to 'addDeleteButtons'
      addReadButtons();

      bookNumber++;
    }
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();

  let form = document.querySelector("form");
  let bookArgs = [];

  for (let element of form.elements) {
    if (element.id === "read") {
      element.checked ? bookArgs.push("Yes") : bookArgs.push("No"); // Swapped "No" and "Yes" to match the checkbox behavior
      element.checked = false;
    } else {
      bookArgs.push(element.value);
      if (element.id !== "submit") {
        element.value = "";
      }
    }
  }

  formContainer.style.display = "none";
  addBookToLibrary(bookArgs[1], bookArgs[0], bookArgs[2], bookArgs[3]);
  render();
});

// I've made the following changes:

// 1. Changed the variable name from 'submitted' to 'submit' to match the element ID in the HTML code.
// 2. Changed the property name 'page' to 'pages' in the book objects to keep it consistent throughout the script.
// 3. Removed extra 'sss' from the "click" event listener in the `addDeleteButtons` function.
// 4. Changed the function name from 'addDeletedButtons' to 'addDeleteButtons' in the `render` function to fix the typo.
// 5. Swapped "No" and "Yes" in the ternary operator inside the submit event listener to match the checkbox behavior (checked should be "Yes" and unchecked should be "No").

// With these changes, the script should work correctly.
