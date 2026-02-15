//pulls in express
const express = require('express');
//pulls in utilities for file path management and manipulation
const path = require('path');

//adds express functionality into a variable/object we can work with
const app = express();
//access the port from the .env file via the installed process class
const port = process.env.PORT || 8080;

/*
    setting the "public" folder as our "static" folder, that way we can navigate to files inside it nativly instead of having to create the endpoints/URIs manually    
    __dirname is the absolute path to the folder of the current file
    path.join allows us to combine multiple files/folders togeather
        So we can move from our current location into the public folder
*/
//app.use(express.static(path.join(__dirname, 'public')));

/*
    Format for creating an API Endpoint:
    app - get/post/etc - URI, function with Request and Response parameters
    app.[get/post/etc]('[uri]', (request, response) => {})
    EX:
        app.get('api/posts', (request, response => {
            console.log(`Accessing a part of the request ${request.someAttribute});
            response.status(200).json(someJavascriptVariable);
        })
*/

const posts = [
    {id: 1, title: "Post One"},
    {id: 2, title: "Post Two"},
    {id: 3, title: "Post Three"}
];

// Get single post
app.get('/api/posts/:id', (req, res) => {
    //Find the ID from the named variable in the URI and convert it to an INT
    const id = parseInt(req.params.id);
    const post = posts.filter((post) => post.id === id);

    console.log(id);
    console.log(post);
    // check to make sure we found the post
    if(!post || post.length === 0) {
        return res.status(404).json({msg: `A post with the id of ${id} was not found`});
    }
    
    res.status(200).json(post);
})

// Get all posts
// Includes processing a "limit" query string
app.get('/api/posts', (request, response)=> {
    /*
        accept a number of posts limit from the query string
        /api/posts?limit=2
    */
   const limit = parseInt(request.query.limit)
   
   // parse and process this limit to see if we can and should do something with it
   // we want to make sure we were given a number and that the number is positive
   if(!isNaN(limit) && limit > 0) {
        return response.status(200).json(posts.slice(0, limit));
   }
   
   response.status(200).json(posts);
})

//sets the app to listen on any given port
app.listen(port, () => console.log(`Server running on port ${port}`));
/*
    now we can run "node server.js" or "node server" in the command line
    
    after adding the "start" and "dev" scripts in package.json we can then just call "npm run dev"
        "start": "node server",
        "dev": "node --watch server"
*/