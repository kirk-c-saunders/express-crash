// pulls in Express
import express from 'express';
//gets methods from route specific controller
import {getPost, getPosts, createPost, updatePosts, deletePosts} from '../controllers/postController.js';

// gives us the "Router"
const router = express.Router();

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
router.get('/:id', getPost );

// Get all posts
// Includes processing a "limit" query string
router.get('/', getPosts );

//create new post
router.post('/', createPost );

// update post
router.put('/:id', updatePosts )

// delete post
router.delete('/:id', deletePosts )

// we have to export this so it can be used in other places
export default router;