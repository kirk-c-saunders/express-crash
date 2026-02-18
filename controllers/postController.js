let posts = [
    {id: 1, title: "Post One"},
    {id: 2, title: "Post Two"},
    {id: 3, title: "Post Three"}
];

/*
    Generic logger function that outputs something like: "GET https://localhost:8080/api/posts" to the console
    Then resumes with the specific route/method
    Added into any route as a named object inbetween the path and the callback function
    EX: router.get('/', logger, (req, res) => {...[the stuff in the route body]...})

    const logger = (req, res, next) => {
        console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
        next();
    }

    however we are only going to add this here if we only want it applied to individual routes
    global stuff is handled differently
*/

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

export const getPost = (req, res, next) => {
    //Find the ID from the named variable in the URI and convert it to an INT
    const id = parseInt(req.params.id);
    const post = posts.filter((post) => post.id === id);

    console.log(id);
    console.log(post);
    // check to make sure we found the post
    if(!post || post.length === 0) {
        const error = new Error(`A post with the id of ${id} was not found`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json(post);
};

export const getPosts = (request, response, next) => {
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
};

export const createPost = (request, response, next) => {
    if(!request.body){
        const error = new Error("Bad request. Body is missing");
        error.status = 400;
        return next(error);
    }
    
    const newPost = {
        id: posts.length + 1,
        title: request.body.title
    };

    if(!newPost.title) {
        // use return, if the setting of the respons object is supposed to stop further processing in the function
        const error = new Error("Please include a title");
        error.status = 400;
        return next(error);
    }

    posts.push(newPost);
    response.status(201).json(posts);
};

export const updatePosts = (req, res, next) => {
    if(!req.body){
        const error = new Error("Bad request. Body is missing");
        error.status = 400;
        return next(error);
    }

    if(!req.params.id){
        const error = new Error("Bad request. Id is missing");
        error.status = 400;
        return next(error);
    }
    
    try {
        const id = parseInt(req.params.id);
        const post = posts.find((post) => post.id === id);

        if (!post) {
            const error = new Error(`A post with the id of ${id} was not found`);
            error.status = 404;
            return next(error);
        }

        post.title = req.body.title;
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const deletePosts = (req, res, next) => {
    if(!req.params.id) {
        const error = new Error(`Bad request. Id is missing`);
        error.status = 400;
        return next(error);
    }
    
    try {
        const id = parseInt(req.params.id);
        const post = posts.find((post) => post.id === id);

        if (!post) {
            const error = new Error(`A post with the id of ${id} was not found`);
            error.status = 404;
            return next(error);
        }

        posts = posts.filter((post) => post.id !== id);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error.message);
    }
};