//pulls in express
import express from 'express'
//pulls in utilities for file path management and manipulation
import path from 'path';
//pull in our posts routes file - the ".js" is required for local files
import posts from './routes/posts.js';
//pull in the generic/global logger function
import logger from './middleware/logger.js';
//pull in generic/global error handler
import errorHandler from './middleware/error.js';
//access the port from the .env file via the installed process class
const port = process.env.PORT || 8080;
//adds express functionality into a variable/object we can work with
const app = express();

// body parser middleware, that way we can accept and process raw JSON in request bodies
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//logger middleware
app.use(logger);

/*
    setting the "public" folder as our "static" folder, that way we can navigate to files inside it nativly instead of having to create the endpoints/URIs manually    
    __dirname is the absolute path to the folder of the current file
    path.join allows us to combine multiple files/folders togeather
        So we can move from our current location into the public folder
*/
//app.use(express.static(path.join(__dirname, 'public')));

/*
    ROUTES
    - Format: [expressObject].use([apiRoutePrefix], [routePathFileOrClassVariable])
    - Appends an API Route prefix, to all the routes defined in the "route file"
        - ex: app.use('/api/posts', posts) - prepends "/api/post" to all routes in the posts file
        - meaning that in the "posts" file, we only need to define a relative URI from "/api/posts"
*/
app.use('/api/posts', posts);

// a generic error handling for accessing routes that don't exist
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

//generic error handler (must come after routes, for some reason. "Conflicts")
app.use(errorHandler);

//sets the app to listen on any given port
app.listen(port, () => console.log(`Server running on port ${port}`));
/*
    now we can run "node server.js" or "node server" in the command line
    
    after adding the "start" and "dev" scripts in package.json we can then just call "npm run dev"
        "start": "node server",
        "dev": "node --watch server"
*/