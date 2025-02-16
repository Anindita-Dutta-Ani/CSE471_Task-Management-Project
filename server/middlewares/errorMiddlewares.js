// function that runs that has access to the request and the response  = middleware. this erroremiddleware will save the user with the error message
 const routeNotFound=   (req, res, next) => {   
    const error = new Error("Route not found: ${req.originalUrl}");
    res.status(404);
    next(error);
 };

 const errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;   //200 means success
    res.status(statusCode);
    let message =error.message;

    if (error.name === "CastError" && error.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    req.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null: error.stack,
    });
 };

export {routeNotFound, errorHandler};


