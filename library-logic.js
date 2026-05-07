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

libraryNode.addEventListener('click', (e) => {
  targetClassList = e.target.classList;

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

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.uuid = crypto.randomUUID();
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
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

    bookNode.append(title, author, pages, readButton, deleteButton);
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

  bookNode.append(title, author, pages, readButton, deleteButton);
  libraryNode.append(bookNode);
}

function removeBook(bookNode, uuid) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].uuid === uuid) {
      myLibrary.splice(i, 1); // remove book from array
      bookNode.remove(); // remove book node from DOM
      // TODO: when we found the book to be removed, don't continue to search for it. Break out of loop.
    }
  }
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