// pulls in Express
import express from 'express';

// gives us the "Router"
const router = express.Router();

const posts = [
    {id: 1, title: "Post One"},
    {id: 2, title: "Post Two"},
    {id: 3, title: "Post Three"}
];

/*
    Format for creating an API Endpoint:
    routerObject - get/post/etc - URI, function with Request and Response parameters
    [routerObject].[get/post/etc]('[uri]', (request, response) => {})
    EX:
        router.get('api/posts', (request, response => {
            console.log(`Accessing a part of the request ${request.someAttribute});
            response.status(200).json(someJavascriptVariable);
        })
*/

// Get single post
router.get('/:id', (req, res) => {
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
});

// Get all posts
// Includes processing a "limit" query string
router.get('/', (request, response)=> {
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
});

//create new post
router.post('/', (request, response) => {
    const newPost = {
        id: posts.length + 1,
        title: request.body.title
    };

    if(!newPost.title) {
        // use return, if the setting of the respons object is supposed to stop further processing in the function
        return response.status(400).json({msg: 'Please include a title'});
    }

    posts.push(newPost);
    response.status(201).json(posts);
});

// update post
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post){
        return res
           .status(404)
           .json({msg: `A post with the id of ${id} was not found`});
    }

    post.title = req.body.title;
    res.status(200).json(posts);
})

// we have to export this so it can be used in other places
export default router;