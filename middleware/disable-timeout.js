export const disableTimeout = (req, res, next) => {
    req.setTimeout(0); // Disable timeout for this request
    next();
};