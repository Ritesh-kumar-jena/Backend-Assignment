# NODE & EXPRESS - BOOK MANAGEMENT SYSTEM

Design a server-side application for a Bookstore Management System. Create an HTTP server using express and implement various API endpoints. The server should perform different operations such as displaying a welcome message, adding books, searching for books, updating book details, deleting books, and handling invalid endpoints.


## Requirements:

Create an "index.js" file that contains the server logic. Generate a "package.json" file using the appropriate command.


## Implement the following API endpoints:

- "/" Endpoint: Response: "WELCOME TO BOOKSTORE MANAGEMENT SYSTEM"

- "/books" Endpoint: Action: Retrieve the list of all books in the bookstore. Response: Display the list of books in a structured format.

- "/books/add" Endpoint: Action: Add a new book to the bookstore. Request: Include the book details (e.g., title, author, ISBN) in the request body. Have a middleware called as "validator" which checks if the request body is having all the book details, if any book detail is missing, it should send relevant response and not add the book to the books. Response: Return a success message indicating that the book has been added.

- "/books/search" Endpoint: Action: Search for books based on a given query parameter (e.g., title, author). Request: Include the search query in the request query parameters. Response: Return the list of books matching the search query.

- "/books/update/:id" Endpoint: Action: Update the details of a specific book. Request: Include the book ID in the URL parameter and the updated details in the request body. Response: Return a success message indicating that the book details have been updated.

- "/books/delete/:id" Endpoint: Action: Delete a specific book from the bookstore. Request: Include the book ID in the URL parameter. Response: Return a success message indicating that the book has been deleted.

- Handle Invalid Endpoints: Response: Display an appropriate message for invalid endpoints.


# Note

Commit regularly
Push all files to the github except the node_modules folder
Can refer official documentations like MDN, Node documentation, express documentation etc but you can't google or refer previous assignments etc