const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../dbcon');
const CustomError = require('../errors/customError');

const maxAge = 30 * 24 * 60 * 60;

const createToken = (creds) => {
  return jwt.sign(creds, process.env.JWT_SECRET, { expiresIn: maxAge });
};

// module scaffolding
const authControllers = {};

/////////////////////////////////////////////////////////////
// Register a user (manager/customer)
////////////////////////////////////////////////////////////
authControllers.register = (table) => {
  return async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const { name, phone, address } = req.body;

    const q = `INSERT INTO ${table} (name, phone, password, address) VALUES ( '${name}', '${phone}', '${hashedPassword}', '${address}' )`;

    db.query(q, (err) => {
      if (err) {
        next(new CustomError(err.message, 500, err.code));
      } else {
        const token = createToken({ name, phone, address });

        const cookieName = table === 'managers' ? 'manager' : 'customer';
        res.cookie(cookieName, token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        res
          .status(200)
          .json({ success: true, message: 'User successfully created' });
      }
    });
  };
};

/////////////////////////////////////////////////////////////
// Login a  user (manager/customer)
////////////////////////////////////////////////////////////
authControllers.login = (table) => {
  return (req, res, next) => {
    const { phone, password } = req.body;

    const q = `SELECT name, phone, password, address FROM ${table} WHERE phone = '${phone}'`;

    db.query(q, async (err, result) => {
      try {
        if (err) {
          next(new CustomError(err.message, 400, err.code));
        } else if (result.length < 1) {
          next(
            new CustomError(
              'Username or password is incorrect!!',
              400,
              'Bad request'
            )
          );
        } else {
          const isPassValid = await bcrypt.compare(
            password,
            result[0].password
          );

          if (isPassValid) {
            const { name, phone, address } = result[0];

            const token = createToken({ name, phone, address });
            const cookieName = table === 'managers' ? 'manager' : 'customer';
            res.cookie(cookieName, token, {
              httpOnly: true,
              maxAge: maxAge * 1000,
            });
            res.status(200).json({
              success: true,
              name,
              phone,
              address,
            });
          } else {
            next(
              new CustomError(
                'Username or password is incorrect',
                400,
                'Bad request'
              )
            );
          }
        }
      } catch (err) {
        next(err.message, 500, 'Internal server error!!');
      }
    });
  };
};

module.exports = authControllers;
