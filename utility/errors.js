// Utility for error handling
const errorHandler = (err, type) => {
  let msg = 'Something went wrong';
  let status = 500;

  if (type === 'item') {
    // Item errors
    if (err.message.includes('failed for value')) {
      msg = `Item doesn't exist`;
      status = 404;
    }
  } else if (type === 'user') {
    // User errors
    if (err.message.includes('valid email')) {
      msg = err.errors.email.message;
      status = 400;
    } else if (err.message.includes('duplicate key')) {
      msg = 'User already exists';
      status = 400;
    }
  }

  return { msg, status };
};

module.exports = errorHandler;
