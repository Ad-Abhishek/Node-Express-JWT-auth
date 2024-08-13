import jwt from 'jsonwebtoken'

const jwtVerify = (req, res, next) => {
  let token = req.headers['x-auth-token'];

  if(!token) {
    return res.status(401).json({
        msg: 'Unauthorized user',
        status: 'FAILED'
    })
  }

  let secretkey = process.env.JWT_SECRET_KEY;

  let payload = jwt.verify(token, secretkey);

  if(!payload) {
    return res.status(401).json({
        msg: 'Unauthorized user',
        status: 'FAILED'
    })
  }

  req.headers['theUser'] = payload;

  next();
};

export default jwtVerify;
