/*
    creates a generic logger function we can apply to everything in the app
    then intended to be imported into the server.js file
*/
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

export default logger;