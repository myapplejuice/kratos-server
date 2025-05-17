export function errorHandler(err, req, res, next) {
    console.error('Error caught:', err);

    const status = err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Internal Server Error';

    res.status(status).json({
        status: 'Error',
        message,
        error: err.message
    });
}