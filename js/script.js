document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
        alert("Buku berhasil ditambahkan");
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data telah Disimpan");
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});

const searchBook = document.forms["searchBook"].querySelector("input");
searchBook.addEventListener("keyup", function() {
    const keySearch = document.querySelector("#searchBookTitle").value.toLowerCase();
    const books = document.querySelectorAll(".book_item");
    Array.from(books).forEach(function(book){
        const title = book.querySelector("h3").textContent.toLowerCase();
        if(title.indexOf(keySearch) != -1) {
            book.style.display = "";
        } else {
            book.style.display = "none";
        }
    })
})

const searchButton = document.getElementById("searchSubmit");
searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    const keySearch = document.querySelector("#searchBookTitle").value.toLowerCase();
    const books = document.querySelectorAll(".book_item");
    Array.from(books).forEach(function(book){
        const title = book.querySelector("h3").textContent.toLowerCase();
        if(title.indexOf(keySearch) != -1) {
            book.style.display = "";
        } else {
            book.style.display = "none";
        }
    })
})