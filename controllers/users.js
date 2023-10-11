const { pool } = require("../models/db");
const messageModel = require("../models/messagesSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = {};

users.register = async (req, res) => {
  const { firstName, lastName, email, password, role_id } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (firstName, lastName,  email, password, role_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
  const data = [
    firstName,
    lastName,
    email.toLowerCase(),
    encryptedPassword,
    role_id,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err,
      });
    });
};

users.login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].id,
              role: result.rows[0].role_id,
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            console.log(response);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Valid login credentials`,
                userId: result.rows[0].id,
                roleId: result.rows[0].role_id,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "The email doesn’t exist",
        err,
      });
    });
};

users.getAllAdminAccounts = (req, res) => {
  pool
    .query(`SELECT * from users WHERE role_id=2 AND is_deleted=0`)
    .then((result) => {
      res.status(200).json({
        success: true,
        admins: result.rows,
        message: "Here are all the admins",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error check again",
        error: err.message,
      });
    });
};

users.getAllUsersAccounts = (req, res) => {
  pool
    .query(`SELECT * from users WHERE role_id=1 AND is_deleted=0`)
    .then((result) => {
      res.status(200).json({
        success: true,
        users: result.rows,
        message: "Here are all the users",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error check again",
        error: err.message,
      });
    });
};

users.deleteAdminAccountById = (req, res) => {
  const { id } = req.params;
  const array = [id];
  const query = `UPDATE users
  SET is_deleted=1
  WHERE id=$1`;
  pool
    .query(query, array)
    .then((result) => {
      res.status(200).json({
        success: true,
        admins: result.rows,
        message: "Admin deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error check again",
        error: err.message,
      });
    });
};

users.sendMessage = (req, res) => {
  const { message, to } = req.body;
  const { userId } = req.params;
  const newMessage = new messageModel({ from: userId, message, to });
  newMessage
    .save()
    .then((message) => {
      res.status(201).json({
        success: true,
        message: message,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error check again",
        error: err.message,
      });
    });
};

users.getAllMessages = (req, res) => {
  const { userId } = req.params;
  messageModel
    .find({ $or: [{ from: userId }, { to: userId }] })
    .then((messages) => {
      res.status(201).json({
        success: true,
        allMessages: messages,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error check again",
        error: err.message,
      });
    });
};

users.getAllAdminMessages = (req, res) => {
  const { adminId, userId } = req.params;
  messageModel
    .find({ from: adminId }, { to: userId })
    .then((messages) => {
      res.status(201).json({
        success: true,
        allMessages: messages,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error check again",
        error: err.message,
      });
    });
};

module.exports = users;
