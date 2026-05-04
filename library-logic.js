const myLibrary = [];
const libraryNode = document.querySelector('.library');

function Book(title, author, pages, read) {
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