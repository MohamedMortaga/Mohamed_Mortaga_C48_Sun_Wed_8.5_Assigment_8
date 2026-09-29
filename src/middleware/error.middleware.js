

function getStatusAndMessage(err) {
  if (err.cause?.statusCode) {
    return { statusCode: err.cause.statusCode, message: err.message };
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return { statusCode: 400, message: messages.join(", ") };
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    return { statusCode: 409, message: `${field} already exists.` };
  }

  if (err.name === "CastError") {
    return { statusCode: 400, message: `Invalid ${err.path}: "${err.value}".` };
  }

  if (err.type === "entity.parse.failed") {
    return { statusCode: 400, message: "Invalid JSON body." };
  }

  return { statusCode: 500, message: "Internal Server Error" };
}

const globalErrMiddleware = (err, req, res, next) => {
  const { statusCode, message } = getStatusAndMessage(err);

  if (statusCode >= 500) console.error(err.stack);

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === "DEV" && { stack: err.stack }),
  });
};

export default globalErrMiddleware;
