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

  const sanitizedTitle = title.value.trim().replace(/ +/g, ' ');
  const sanitizedAuthor = author.value.trim().replace(/ +/g, ' ');
  if (sanitizedTitle === '' || sanitizedAuthor === '') {
    alert('Please enter valid input');
    return;
  }

  // Check if book already exists
  for (const book of myLibrary) {
    if (
      book.title.toLowerCase() === sanitizedTitle.toLowerCase() &&
      book.author.toLowerCase() === sanitizedAuthor.toLowerCase()
    ) {
      alert('Book already exists in library');
      return; // returns from function
    }
  }

  // Add book to library and display the recently added book on page
  addBookToLibrary(sanitizedTitle, sanitizedAuthor, pages.value, read.checked);  // we should use read.checked to return boolean value
  displayBook(myLibrary[myLibrary.length - 1]);

  newBookForm.reset();
  newBookDialog.close();
});

libraryNode.addEventListener('click', (e) => {
  const targetClassList = e.target.classList;

  if (targetClassList.contains('delete-button')) { // delete button clicked
    const confirmed = window.confirm('Do you want to remove this book?');

    if (confirmed) {
      const bookNode = e.target.closest('.book'); // get the book node that we want to delete
      const uuid = bookNode.dataset.uuid;
      removeBook(bookNode, uuid);
    }
  } else if (targetClassList.contains('read') || targetClassList.contains('unread')) {
    const bookNode = e.target.closest('.book');
    const uuid = bookNode.dataset.uuid;

    for (const book of myLibrary) {
      if (book.uuid === uuid) {
        book.toggleReadStatus();

        if (book.read) {
          targetClassList.replace('unread', 'read');
          e.target.textContent = 'read';
        } else {
          targetClassList.replace('read', 'unread');
          e.target.textContent = 'unread';
        }
        break;
      }
    }
  }
});

// function Book(title, author, pages, read) {
//   if (!new.target) {
//     throw Error('You must use the \'new\' operator to call the constructor');
//   }

//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   this.uuid = crypto.randomUUID();
// }

// Book.prototype.info = function () {
//   return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
// }

// Book.prototype.toggleReadStatus = function () {
//   this.read = !this.read;
// }

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uuid = crypto.randomUUID();
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  for (const book of myLibrary) {
    const bookNode = document.createElement('div');
    bookNode.classList.add('book'); // add book class to our node
    bookNode.setAttribute('data-uuid', book.uuid); // add uuid on our node

    const title = document.createElement('h2');
    title.classList.add('book-title');
    title.textContent = book.title;

    const author = document.createElement('div');
    author.classList.add('author');
    author.textContent = `by ${book.author}`;

    const pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = `${book.pages} pages`;

    const read = book.read ? 'read' : 'unread';
    const readButton = document.createElement('button');
    readButton.classList.add(read);
    readButton.textContent = read;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'delete';

    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    bookInfo.append(title, author, pages);

    const buttons = document.createElement('div');
    buttons.classList.add('book-control-buttons');
    buttons.append(readButton, deleteButton);

    bookNode.append(bookInfo, buttons);
    libraryNode.append(bookNode);
  }
}

function displayBook(book) {
  const bookNode = document.createElement('div');
  bookNode.classList.add('book'); // add book class to our node
  bookNode.setAttribute('data-uuid', book.uuid); // add uuid on our node

  const title = document.createElement('h2');
  title.classList.add('book-title');
  title.textContent = book.title;

  const author = document.createElement('div');
  author.classList.add('author');
  author.textContent = `by ${book.author}`;

  const pages = document.createElement('div');
  pages.classList.add('pages');
  pages.textContent = `${book.pages} pages`;

  const read = book.read ? 'read' : 'unread';
  const readButton = document.createElement('button');
  readButton.classList.add(read);
  readButton.textContent = read;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'delete';

  const bookInfo = document.createElement('div');
  bookInfo.classList.add('book-info');
  bookInfo.append(title, author, pages);

  const buttons = document.createElement('div');
  buttons.classList.add('book-control-buttons');
  buttons.append(readButton, deleteButton);

  bookNode.append(bookInfo, buttons);
  libraryNode.append(bookNode);
}

function removeBook(bookNode, uuid) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].uuid === uuid) {
      myLibrary.splice(i, 1); // remove book from array
      bookNode.remove(); // remove book node from DOM
      return;
    }
  }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('Dune', 'Frank Herbert', 412, true);
addBookToLibrary('Atomic Habits', 'James Clear', 320, true);
addBookToLibrary('The Pragmatic Programmer', 'Andrew Hunt', 352, false);
addBookToLibrary('Clean Code', 'Robert C. Martin', 464, true);
addBookToLibrary('Eloquent JavaScript', 'Marijn Haverbeke', 472, true);
addBookToLibrary('Kürk Mantolu Madonna', 'Sabahattin Ali', 160, false);
addBookToLibrary('Abasıyanık', 'Sait Faik', 136, true);

displayBooks();