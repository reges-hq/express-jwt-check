const jws = require('jws');
const HttpError = require('./http-error');

module.exports = secret => (req, res, next) => {
  try {
    const authorizationData = req.headers.authorization;

    if (authorizationData === undefined) {
      return next(
        new HttpError(403, {
          success: false,
          message: 'No token provided.'
        })
      );
    }
    const jwt = authorizationData.split(' ')[1] || 'xxx.xxx.xxx';
    const verify = jws.verify(jwt, 'HS256', Buffer.from(secret, 'base64'));

    if (!verify) {
      return next(
        new HttpError(403, {
          success: false,
          message: 'Not a valid token.'
        })
      );
    }

    const { payload } = jws.decode(jwt);

    req.user = {
      account: payload.account.toLowerCase(),
      userName: payload.sub,
      userId: parseInt(payload.user),
      userRole: payload.role,
      jwt: jwt
    };
  } catch (error) {
    return next(error);
  }

  return next();
};
