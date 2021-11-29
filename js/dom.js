const UNCOMPLETED_BOOK_READ = "incompleteBookshelfList";
const COMPLETED_BOOK_READ = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook() {
    const uncompletedBookRead = document.getElementById(UNCOMPLETED_BOOK_READ);
    const completedBookRead = document.getElementById(COMPLETED_BOOK_READ);
    const inputBook = document.getElementById("inputBookTitle").value;
    const inputAuthor = document.getElementById("inputBookAuthor").value;
    const inputYear = document.getElementById("inputBookYear").value;
    const checkBox = document.getElementById("inputBookIsComplete").checked;
    if(checkBox) {
        let newBook = createBook(inputBook,inputAuthor,inputYear,true);
        let bookObject = composeBookObject(inputBook,inputAuthor,inputYear,true); 
        completedBookRead.append(newBook);
        newBook[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
    } else {
        let newBook = createBook(inputBook,inputAuthor,inputYear,false);
        let bookObject = composeBookObject(inputBook,inputAuthor,inputYear,false);   
        uncompletedBookRead.append(newBook);
        newBook[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
    }

    updateDataToStorage();
    return addBook;
}

function createBook(book, author, year, isCompleted) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = book;

    const authorName = document.createElement("p");
    authorName.innerHTML = `Penulis: <span id="author"> ` + author + `</span>`;

    const publicationYear = document.createElement("p");
    publicationYear.innerHTML = `Tahun: <span id="year"> ` + year + `</span>`;

    const container = document.createElement("div");
    container.classList.add("action")
    container.append(bookTitle, authorName, publicationYear);

    if(isCompleted){
        container.append(
            createUncompleteButton(),
            createDeleteButton()
        );
    } else {
        container.append(
            createCompleteButton(),
            createDeleteButton()
        );
    }
    const article = document.createElement("article");
    article.classList.add("book_item");
    article.append(container);
    
    return article;
}

function createButton(buttonTypeClass, buttonText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createUncompleteButton() {
    return createButton("green", "Belum Selesai dibaca", function (event) {
        undoFromCompleted(event.target.parentElement.parentElement);
    });
}

function createCompleteButton() {
    return createButton("green", "Selesai dibaca", function (event) {
        addToCompleted(event.target.parentElement.parentElement);
    });
}

function createDeleteButton() {
    return createButton("red", "Hapus buku", function (event) {
        removeToCompleted(event.target.parentElement.parentElement);
    });
}

function addToCompleted(completed) {
    const bookTitle = completed.querySelector("h3").innerText;
    const authorName = completed.querySelector("#author").innerText;
    const publicationYear = completed.querySelector("#year").innerText;

    const newBook = createBook(bookTitle,authorName,publicationYear,true);
    
    const book = findBook(completed[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    const completedBookRead = document.getElementById(COMPLETED_BOOK_READ);
    completedBookRead.append(newBook);
    completed.remove();
    
    updateDataToStorage();
    alert(bookTitle + " telah selesai dibaca");
}

function undoFromCompleted(completed){
    const uncompletedBookRead = document.getElementById(UNCOMPLETED_BOOK_READ);
    const bookTitle = completed.querySelector("h3").innerText;
    const authorName = completed.querySelector("#author").innerText;
    const publicationYear = completed.querySelector("#year").innerText;

    const newBook = createBook(bookTitle,authorName,publicationYear,false);
    
    const book = findBook(completed[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    uncompletedBookRead.append(newBook);
    completed.remove();
    
    updateDataToStorage();
    alert(bookTitle + " belum selesai dibaca");
}

function removeToCompleted(uncompleted) {
    const bookPosition = findBookIndex(uncompleted[BOOK_ITEMID]);
    const bookTitle = uncompleted.querySelector("h3").innerText;
    let agreement = confirm(bookTitle + " akan dihapus");
    if (agreement == true) {
        books.splice(bookPosition, 1);
        uncompleted.remove();
        updateDataToStorage();
    }
}