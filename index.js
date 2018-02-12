const jws = require('jws');
const CustomError = require('./custom-error');

module.exports = secret => (req, res, next) => {
  try {
    const authorizationData = req.headers.authorization;

    if (authorizationData === undefined) {
      return next(new CustomError('No token provided.'));
    }

    const jwt = authorizationData.split(' ')[1] || 'xxx.xxx.xxx';
    const verify = jws.verify(jwt, 'HS256', Buffer.from(secret, 'base64'));

    if (!verify) {
      return next(new CustomError('Not a valid token.'));
    }

    const { payload } = jws.decode(jwt);

    req.user = payload;

    return next();
  } catch (error) {
    return next(error);
  }
};
