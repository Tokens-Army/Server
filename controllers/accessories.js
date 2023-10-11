const { pool } = require("../models/db");

// Here is the function that the admin can add the accessories from:
const createNewAccessories = (req, res) => {
  const { name, description, img, price } = req.body;
  const array = [name, description, img, price];
  const query = `INSERT INTO accessories (name,description,img,price) VALUES ($1,$2,$3,$4) RETURNING *`;
  pool
    .query(query, array)
    .then((results) => {
      res.status(201).json({
        success: true,
        message: "Accessory added successfully",
        result: results.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error kindly try again",
        error: err,
      });
    });
};

const getAllAccessories = (req, res) => {
  pool
    .query(`SELECT * FROM accessories WHERE is_deleted=0`)
    .then((results) => {
      if (results.rows.length !== 0) {
        setTimeout(() => {
          return res.status(200).json({
            success: true,
            message: "Here is all the accessories",
            result: results.rows,
          });
        }, 3000);
      } else {
        res.status(404).json({
          success: false,
          message: "There is no accessories for this result",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error kindly try again",
        error: err,
      });
    });
};

//Here you can delete the article soft delete so you dont delete it from the data base and keep it if you want to get it back again
const deleteAccessoryById = (req, res) => {
  const { id } = req.params;
  const array = [id];
  const query = `UPDATE accessories
    SET is_deleted=1
    WHERE id=$1 RETURNING *`;
  pool
    .query(query, array)
    .then((results) => {
      res.status(200).json({
        success: true,
        message: `Accessory with id = ${id} is deleted`,
        accessories: results.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error kindly try again`,
        error: err,
      });
    });
};
// successeded

//Here you can update the article informations :

const updateAccessoryById = (req, res) => {
  const { product, description, img, price } = req.body;
  const { id } = req.params;
  const array = [product, description, img, price, id];
  const query = `UPDATE accessories
    SET name=COALESCE($1,name),description=COALESCE($2,description),img=COALESCE($3,img),price=COALESCE($4,price)
    WHERE id=$5 RETURNING *`;
  pool
    .query(query, array)
    .then((results) => {
      res.status(200).json({
        success: true,
        message: `Accessory with id = ${id} has been updated`,
        accessories: results.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error kindly try again`,
        error: err,
      });
    });
};

module.exports = {
  createNewAccessories,
  getAllAccessories,
  deleteAccessoryById,
  updateAccessoryById,
};
