const { pool } = require("../models/db");

// this function creates a new service
const createNewService = (req, res) => {
  const { name, description, img, price } = req.body;
  pool
    .query(
      `INSERT INTO services (name, description, img, price) values ($1, $2, $3, $4) RETURNING *;`,
      [name, description, img, price]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Service created successfully",
        service: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

// this function views all the services
const getAllServices = (req, res) => {
  pool
    .query(`SELECT * FROM services WHERE is_deleted = 0;`)
    .then((result) => {
      setTimeout(() => {
        res.status(200).json({
          success: true,
          message: "All the services",
          services: result.rows,
        });
      }, 3000);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

// this function updates a service by it's id
const updateServiceById = (req, res) => {
  const { id } = req.params;
  const { name, description, img, price } = req.body;
  const query = `UPDATE services SET name = COALESCE($1,name), description = COALESCE($2, description), img = COALESCE($3, img), price = COALESCE($4, price) WHERE id=$5 AND is_deleted = 0  RETURNING *;`;
  const data = [
    name || null,
    description || null,
    img || null,
    price || null,
    id,
  ];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `Service with id: ${id} is updated successfully`,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating article");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

const deleteServiceById = (req, res) => {
  const { id } = req.params;
  pool
    .query(`UPDATE services SET is_deleted = 1 WHERE id = $1`, [id])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Service with id: ${id} is deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

module.exports = {
  createNewService,
  getAllServices,
  updateServiceById,
  deleteServiceById,
};
