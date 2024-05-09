// Middleware to calculate execution time of API requests
const executionTimeMiddleware = (req, res, next) => {
  const start = Date.now();

  res.executionTime = () => {
    const end = Date.now();
    return end - start;
  };

  next();
};

module.exports = executionTimeMiddleware;
