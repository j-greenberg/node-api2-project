// Index.js Server file

// Initialize server settings

const express = require("express"); // import express
const server = express(); // new instance of express
const port = 4000; // designate port number for server
server.use(express.json()); // to format JSON correctly

server.listen(port, ()=> {
    console.log(`Server is now live listening on port ${port}`); // tell server to listen
})

const hubsRouter = require("./data/router.js"); // import router file 
server.use("/api/posts", hubsRouter); // assign router to path 