const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.uuid = crypto.randomUUID();
}

Book.prototype.info = function () {
  const read = this.read ? 'read' : 'not read yet';
  return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}