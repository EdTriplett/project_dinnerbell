const expressWrapper = handler => async (req, res, next) => {
  console.log("do we hit here in wrapper");
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
