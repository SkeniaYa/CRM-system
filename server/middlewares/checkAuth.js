const checkAuth = (req, res, next) => {
  if (!req.session?.passport?.user) {
    return res.sendStatus(401);
  }
  return next();
};

module.exports = checkAuth;
