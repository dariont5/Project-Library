const myLibrary = [];
const visibleLibrary = document.querySelector('.book-display');

// book constructor function
function Book(title, author, read = false) {
    if(!(new.target)) {
        throw new error('Must use new to initial new instance');
    } else {
        this.title = title;
        this.author = author;
        this.read = read;
        this.id = crypto.randomUUID();
    }
}

// toggle read status
Book.prototype.read = function () {
    if (this.read == true) {
        this.read = false;
    } else {
        this.read = true;
    }
}

// book addition function
function addBookToLibrary(title, author, read) {
    let book = new Book(title, author, read);
    myLibrary.push(book);
}

function renderBooks() {
    visibleLibrary.innerHTML = '';

    myLibrary.forEach((book) => {
        let visibleBook = document.createElement('li');
        visibleBook.textContent = book.title;
        visibleBook.id = book.id;
        visibleLibrary.appendChild(visibleBook);
    });
}