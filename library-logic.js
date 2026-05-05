const myLibrary = [];
const libraryNode = document.querySelector('.library');

// New Book dialog related nodes
const newBookDialog = document.querySelector('#new-book-dialog');
const newBookForm = document.querySelector('#new-book-form');
const title = document.querySelector('#book_title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');


newBookForm.addEventListener('submit', (e) => {
  const btnValue = e.submitter.value;
  if (btnValue === 'cancel') { // if clicked cancel button
    newBookForm.reset(); // clear form
    return;
  }
  e.preventDefault(); // We don't want to submit this form since we don't have a server

  const trimmedTitle = title.value.trim();
  const trimmedAuthor = author.value.trim();
  if (trimmedTitle === '' || trimmedAuthor === '') {
    alert('Please enter valid input');
    return;
  }

  // Check if book already exists
  for (const book of myLibrary) {
    if (
      book.title.toLowerCase() === trimmedTitle.toLowerCase() &&
      book.author.toLowerCase() === trimmedAuthor.toLowerCase()
    ) {
      alert('Book already exists in library');
      return; // returns from for loop not function
    }
  }

  // Add book to library and display the recently added book on page
  addBookToLibrary(trimmedTitle, trimmedAuthor, pages.value, read.checked);  // we should use read.checked to return boolean value
  displayBook(myLibrary[myLibrary.length - 1]);

  newBookForm.reset();
  newBookDialog.close();
});


function Book(title, author, pages, read) {
  // TODO: Prevent use of constructor without new keyword
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.uuid = crypto.randomUUID();
}

Book.prototype.info = function () {
  const read = this.read ? 'read' : 'unread';
  return `<h2 class="book-title">${this.title}</h2>
         <div class="author">by ${this.author}</div>
         <div class="pages">${this.pages} pages</div>
         <button class=${read}>${read}</button>`;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  for (const book of myLibrary) {
    const bookNode = document.createElement('div');
    bookNode.classList.add('book'); // add book class to our node

    bookNode.innerHTML = book.info();
    libraryNode.appendChild(bookNode);
  }
}

function displayBook(book) {
  const bookNode = document.createElement('div');
  bookNode.classList.add('book'); // add book class to our node

  bookNode.innerHTML = book.info();
  libraryNode.appendChild(bookNode);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);
addBookToLibrary("The Pragmatic Programmer", "Andrew Hunt", 352, false);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);
addBookToLibrary("Eloquent JavaScript", "Marijn Haverbeke", 472, true);
addBookToLibrary("Kürk Mantolu Madonna", "Sabahattin Ali", 160, true);
addBookToLibrary("Tutunamayanlar", "Oguz Atay", 724, false);

displayBooks();