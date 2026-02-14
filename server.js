//pulls in express
const express = require('express');
//pulls in utilities for file path management and manipulation
const path = require('path');

//adds express functionality into a variable/object we can work with
const app = express();
const port = process.env.PORT || 8080;

/*
    setting the "public" folder as our "static" folder, that way we can navigate to files inside it nativly instead of having to create the endpoints/URIs manually    
    __dirname is the absolute path to the folder of the current file
    path.join allows us to combine multiple files/folders togeather
        So we can move from our current location into the public folder
*/
//app.use(express.static(path.join(__dirname, 'public')));

//app - get/post/etc (URI, function with Request and Response parameters)


//sets the app to listen on any given port
app.listen(port, () => console.log(`Server running on port ${port}`));
/*
    now we can run "node server.js" or "node server" in the command line
    
    after adding the "start" and "dev" scripts in package.json we can then just call "npm run dev"
        "start": "node server",
        "dev": "node --watch server"
*/