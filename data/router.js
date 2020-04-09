const express = require("express"); // import express
const router = express.Router(); // new instance of Router

const Data = require("./db.js");

router.get("/", (req, res) => {
    Data
    .find()
    .then(response => {
        console.log(response); 
        res.status(201).json({ response });
    })
    .catch(error => {
        console.log(error); 
        res.status(500).json({ error: "The posts information could not be retrieved."})
    })
}); 

router.get("/:id", (req, res) => {
    console.log("GET request to /api/posts/:id", req.params.id)
    Data
    .findById(req.params.id)
    .then(response => {
        if(response.length > 0){
            console.log("Posts found!", response); 
            res.status(201).json({response}); 
        } else {
            console.log("No posts!"); 
            res.status(404).json({ message: "The post with the specified ID does not exist." }); 
        }
        
    })
    .catch(error => {
        console.log(error); 
        res.status(500).json({ error: "The post information could not be retrieved." }); 
    })
}); 

router.get("/:id/comments", (req, res) => {
    Data
    .findById(req.params.id)
    .then(response => {
        if(response.length){
            console.log("Post found!", response); 
            Data
            .findCommentById(req.params.id)
            .then(response => {
                if(response.length){
                    console.log("Comment found!", response); 
                    res.status(201).json({ response }); 
                } else {
                    console.log("No comments found!"); 
                    res.status(404).json({ message: "No comments found!" }); 
                }
            })
            .catch(error => {
                console.log("Error retrieving comment! ", error); 
                res.status(500).json({ error: "The comments information could not be retrieved." })
            })
        } else {
            console.log("Post not found!");
            res.status(404).json({ message: "The post with the specified ID does not exist."}) 
        }
        })
    .catch(error => {
        console.log("Error in finding post!", error); 
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
}); 

router.post("/", (req, res) => {
    console.log("New POST request on /!", req.body);

    if(req.body.title && req.body.contents){
        console.log("Title and contents are included!"); 
        Data
        .insert(req.body)
        .then(response => {
            console.log(response); 
            res.status(201).json(response); 
        })
        .catch(error=>{
            console.log(error); 
            res.status(500).json({ error: "There was an error while saving the post to the database", });
        })      
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." }); 
        }
})

router.post("/:id/comments", (req, res) => {

    const comment = { text: '', post_id: '' } ; 
    comment.text = req.body.text; 

    if(!req.body.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment."})
    } else {
    Data
    .findById(req.params.id)
    .then(response => {
        if(response){
            console.log("Post found!: ", response); 
            console.log(req.params.id); 
            comment.post_id = req.params.id; 
            console.log("This is the comment: ", comment); 
            Data
            .insertComment(comment)
            .then(response => {
                console.log("Posted comment!", response)
                res.status(201).json({ response }); 
            })
            .catch(error => {
                console.log("Error in posting comment!", error)
                res.status(500).json({ error: "There was an error while saving the comment to the database." })
            })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
        })
    .catch(error => {
        console.log("Error in finding Post! ", error);
    })
    }
});

router.delete("/:id", (req, res) => {

    let post = {};

    Data
    .findById(req.params.id)
    .then(message => {
        if(message.length){
            console.log("Post found!", message); 
            post = message;
            Data
            .remove(req.params.id)
            .then(response => {
                console.log("Post deleted!", response, post); 
                res.status(201).json({ message: `${response} record successfully deleted` }); 
            })
            .catch(error => {
                console.log("Post not deleted! Error:", error)
                res.status(500).json({ error: "The post could not be removed." }); 
            })
        } else {
            console.log("Post not found!");
            res.status(404).json({ message: "The post with the specified ID does not exist."}) 
        }
        })
    .catch(error => {
        console.log("Error in finding post!", error); 
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.put("/:id", (req, res) => {
    
    if(req.body.title && req.body.contents){
        Data
        .findById(req.params.id)
        .then(post => {
            if(post.length){
                console.log("Post found!: ", post); 
                Data
                .update(req.params.id, req.body)
                .then(response => {
                    console.log("Post updated!", response); 
                    res.status(200).json({ message: `${response} record successfully updated!` }); 
                })
                .catch(error => {
                    console.log("Post not deleted! Error:", error)
                    res.status(500).json({ error: "The post information could not be modified." }); 
                })
            } else {
                console.log("Post not found!");
                res.status(404).json({ message: "The post with the specified ID does not exist."}) 
            }
            })
        .catch(error => {
            console.log("Error in finding post!", error); 
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
    } else { 
        console.log("Did not provide title and contents!"); 
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    
    

})

module.exports = router; 