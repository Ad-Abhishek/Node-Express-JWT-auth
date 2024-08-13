import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Users from '../schema/UserSchema.js';
import catchErrors from '../util/errorUtil.js';

const registerUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    let userObj = await Users.findOne({ email });

    if (userObj) {
      res.status(401).json({
        msg: 'User already exists',
      });
    }

    const isAdmin = false;

    const salt = await bcrypt.genSalt(10);

    const hashPassword = bcrypt.hashSync(password, salt);
    console.log(hashPassword);

    let newUser = {
      username: username,
      email: email,
      password: hashPassword,
      isAdmin: isAdmin,
    };

    let user = await new Users(newUser).save();

    if (user) {
      return res.status(201).json({
        msg: 'User Registration Success!',
        data: user,
        status: 'SUCCESS',
      });
    }
  } catch (error) {
    return catchErrors(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let userObj = await Users.findOne({ email });

    if (!userObj) {
      return res.status(404).json({
        msg: 'User Not Found',
        status: 'FAILED',
      });
    }

    let passwordCheck = await bcrypt.compare(password, userObj.password);

    if (!passwordCheck) {
      res.status(401).json({
        msg: 'Invalid Password',
        status: 'FAILED',
        data: null,
      });
    }

    let payload = {
      id: userObj._id,
      email: userObj.email,
    };

    let secretkey = process.env.JWT_SECRET_KEY;

    let { username, _id, createdAt, isAdmin } = userObj;

    if (payload && secretkey) {
      let token = jwt.sign(payload, secretkey);

      return res.status(200).json({
        msg: 'Login success',
        token: token,
        data: { email, username, _id, createdAt, isAdmin },
      });
    }
  } catch (error) {
    return catchErrors(error, res);
  }
};

const getData = async (req, res) => {
  try {
    let { id } = req.headers['theUser'];

    let user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({
        msg: 'check',
      });
    }

    res.status(200).json({
      msg: 'SUCCESS',
      data: user,
    });
  } catch (err) {
    return catchErrors(err, res);
  }
};

export default {
  registerUser,
  loginUser,
  getData,
};
