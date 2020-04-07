const express = require("express"); // import express
const router = express.Router(); // new instance of Router
const Data = require("./db.js");

// | POST | /api/posts | Creates a post using the information sent inside the `request body`.
// When the client makes a `POST` request to `/api/posts`:

// - If the request body is missing the `title` or `contents` property:
//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

// - If the information about the _post_ is valid:
//   - save the new _post_ the the database.
//   - return HTTP status code `201` (Created).
//   - return the newly created _post_.

// - If there's an error while saving the _post_:
//   - cancel the request.
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.

router.post("/", (req, res) => {
    console.log("POST request on /");

    if(req.body.title && req.body.contents){
        console.log("Title and contents are included!"); 
        console.log(Data.insert(req.body)); 

    } else {

        res.status(400).json({ errorMessage: "Please provide title and contents for the post." }); 

    }
})

// | POST | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`.  
// When the client makes a `POST` request to `/api/posts/:id/comments`:

// - If the _post_ with the specified `id` is not found:
//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If the request body is missing the `text` property:
//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide text for the comment." }`.

// - If the information about the _comment_ is valid:
//   - save the new _comment_ the the database.
//   - return HTTP status code `201` (Created).
//   - return the newly created _comment_.

// - If there's an error while saving the _comment_:
//   - cancel the request.
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON object: `{ error: "There was an error while saving the comment to the database" }`.





// | GET | /api/posts | Returns an array of all the post objects contained in the database.
// When the client makes a `GET` request to `/api/posts`:

// - If there's an error in retrieving the _posts_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The posts information could not be retrieved." }`.




// | GET | /api/posts/:id | Returns the post object with the specified id.
// When the client makes a `GET` request to `/api/posts/:id`:

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If there's an error in retrieving the _post_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The post information could not be retrieved." }`.



// | GET | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.
// When the client makes a `GET` request to `/api/posts/:id/comments`:

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If there's an error in retrieving the _comments_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The comments information could not be retrieved." }`.




// | DELETE | /api/posts/:id | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement.
// When the client makes a `DELETE` request to `/api/posts/:id`:

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If there's an error in removing the _post_ from the database:
//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The post could not be removed" }`.




// | PUT | /api/posts/:id | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.
// When the client makes a `PUT` request to `/api/posts/:id`:

// - If the _post_ with the specified `id` is not found:

//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If the request body is missing the `title` or `contents` property:

//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

// - If there's an error when updating the _post_:

//   - cancel the request.
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ error: "The post information could not be modified." }`.

// - If the post is found and the new information is valid:

//   - update the post document in the database using the new information sent in the `request body`.
//   - return HTTP status code `200` (OK).
//   - return the newly updated _post_.







// ## Stretch Problems

// To work on the stretch problems you'll need to enable the `cors` middleware. Follow these steps:

// - add the `cors` npm module: `npm i cors`.
// - add `server.use(cors())` after `server.use(express.json())`.

// Create a new React application and connect it to your server:

// - Use `create-react-app` to create an application inside the root folder, name it `client`.
// - From the React application connect to the `/api/posts` endpoint in the API and show the list of posts.
// - Style the list of posts however you see fit.

module.exports = router; 