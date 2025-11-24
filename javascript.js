let myLibrary = [];
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
Book.prototype.readToggle = function () {
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

// render all books in library
function renderBooks() {
    visibleLibrary.innerHTML = '';

    myLibrary.forEach((book) => {
        // create book element
        let visibleBook = document.createElement('li');
        visibleBook.classList.add('book');
        visibleBook.textContent = `${book.title} by ${book.author}`;
        visibleBook.id = book.id;

        if (book.read == true) {
            visibleBook.classList.add('read');
        } else if (book.read == false) {
            visibleBook.classList.remove('read');
        }

        // create read toggle button
        let readToggle = document.createElement('button');
        readToggle.textContent = 'Read'
        readToggle.classList.add('bottom-up')
        readToggle.addEventListener('click', () => {
            book.readToggle();
            if (book.read == true) {
                visibleBook.classList.add('read');
            } else if (book.read == false) {
                visibleBook.classList.remove('read');
            }
        })
        visibleBook.appendChild(readToggle);
        // create delete button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('bottom-bottom');
        deleteButton.addEventListener('click', () => {
            myLibrary = myLibrary.filter((currentBook) => currentBook.id != book.id)
            renderBooks();
        })
        visibleBook.appendChild(deleteButton);

        visibleLibrary.appendChild(visibleBook);
    });
}

// add books button opens dialog form
const newBookButton = document.querySelector('#new-book');
const newBookDialog = document.querySelector('dialog');
newBookButton.addEventListener('click', () => {
    newBookDialog.showModal();
    newBookDialog.focus();
});

// submit button adds book
const cancelBook = document.querySelector('#cancel');
const submitBook = document.querySelector('#submit-button');
const newBookForm = document.querySelector('form');
submitBook.addEventListener('click', (e) => {
    e.preventDefault(); // needed for some reason
    const data = new FormData(newBookForm);
    addBookToLibrary(data.get('title'), data.get('author'), data.get('read'));
    renderBooks()
    newBookDialog.close();
    newBookForm.reset();
})

