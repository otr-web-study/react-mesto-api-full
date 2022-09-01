require('dotenv').config();

const { secret = 'some-secret-key', PORT = 3000, NODE_ENV = 'develop' } = process.env;

module.exports.urlPattern = /^(http|https):\/\/(www.)?[\w-]+\.[\w]{2,5}(\/[\w-]+|\/)*/;
module.exports.secret = secret;
module.exports.PORT = PORT;
module.exports.NODE_ENV = NODE_ENV;
