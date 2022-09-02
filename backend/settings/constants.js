require('dotenv').config();

const { JWT_SECRET = 'some-secret-key', PORT = 3000, NODE_ENV = 'develop' } = process.env;

module.exports.urlPattern = /^(http|https):\/\/(www.)?[\w-]+\.[\w]{2,5}(\/[\w-]+|\/)*/;
module.exports.secret = JWT_SECRET;
module.exports.PORT = PORT;
module.exports.NODE_ENV = NODE_ENV;
