const expressWrapper = handler => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

const mongooseWrapper = function(handler) {
  return async function(next) {
    const boundHandler = handler.bind(this);
    try {
      await boundHandler();
    } catch (error) {
      console.error(error);
    }
    next();
  };
};

module.exports = { expressWrapper, mongooseWrapper };
