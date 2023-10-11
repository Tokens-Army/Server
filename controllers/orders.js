const { pool } = require("../models/db");

// this function creates an order by id
const createOrderById = (req, res) => {
  const { id } = req.params;
  const { userId } = req.token;
  pool
    .query(
      `INSERT INTO orders (user_id, service_id, order_status) values ($1, $2, $3) RETURNING *;`,
      [userId, id, "pending"]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Service added successfully`,
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

// this function fetches all orders with the services and accessories attached to them
const getMyOrders = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { userId } = req.token;
    const orders = await pool.query(
      `select O.user_id,S.name AS service_name , S.img AS service_img, S.price AS service_price, O.order_status,O.location ,O.scheduled_time from orders O inner join services S on O.service_id = S.id  where O.user_id = $1 and O.is_deleted=0 and o.id=$2;`,
      [userId, order_id]
    );
    const accessories = await pool.query(
      `select A.name As accessory_name, A.img As accessory_img , A.price As accessory_price,A.id As accessory_id from accessories A inner join order_accessories OA on A.id=OA.accessories_id inner join orders O on OA.order_id=O.id where O.user_id=$1 and O.id=$2 AND OA.is_deleted = 0;`,
      [userId, order_id]
    );
    const employee = await pool.query(
      `select name, phoneNum, img from employees inner join orders on orders.employee_id = employees.id where orders.id = $1`,
      [order_id]
    );
    if (!orders.rows.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All your orders",
      order: orders.rows[0],
      accessories: accessories.rows,
      employee: employee.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

// this function adds an accessory to order
const addAccessoryToOrder = async (req, res) => {
  try {
    const { order_id, accessory_id } = req.params;
    const values = [order_id, accessory_id];
    const query =
      "INSERT INTO order_accessories (order_id, accessories_id) values ($1, $2) RETURNING *;";
    const result = await pool.query(query, values);
    res.status(201).json({
      success: true,
      message: `accessory added successfully to the order`,
      result: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const updateOrderTime = (req, res) => {
  const { id } = req.params;
  const { scheduled_time } = req.body;
  pool
    .query(
      `UPDATE orders SET scheduled_time = COALESCE($1,scheduled_time) WHERE id = $2 RETURNING *`,
      [scheduled_time, id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Order with id ${id} is updated successfully`,
        order: result.rows,
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

const deleteOrderById = (req, res) => {
  const { orderId } = req.params;

  const query = `UPDATE orders SET is_deleted = 1 WHERE orders.id = $1`;

  pool
    .query(query, [orderId])
    .then(() => {
      res.status(201).json({
        success: true,
        message: "Order removed successfully",
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

const addLocationToOrder = (req, res) => {
  const { order_id } = req.params;
  const { location } = req.body;
  pool
    .query(
      `UPDATE orders SET location = COALESCE($1,location) WHERE id = $2 RETURNING *`,
      [location, order_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Order with id ${order_id} is updated successfully`,
        order: result.rows,
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

const getAllOrders = (req, res) => {
  pool
    .query(`SELECT * FROM orders ORDER BY id DESC LIMIT 20`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the orders",
        orders: result.rows,
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

const getAllEmployees = async (req, res) => {
  try {
    const allOrders = await pool.query(
      `Select * from orders where  is_deleted=0 and order_status='pending' ;Select * from employees Where availability= 'Available'`
    );
    res.status(200).json({
      success: true,
      message: "All your orders and employees",
      orders: allOrders[0].rows,
      employees: allOrders[1].rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

const addEmployeeToOrder = (req, res) => {
  const { id, employee_id } = req.params;

  const array = [employee_id, "accepted", id];
  const func = `update orders set employee_id=$1, order_status=$2 where id=$3 returning *`;
  pool
    .query(func, array)
    .then((results) => {
      res.status(203).json({
        success: true,
        message: "Employee added",
        results: results.rows,
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

const countPendingOrders = (req, res) => {
  pool
    .query(
      `SELECT id from orders where order_status='pending';SELECT id from orders where order_status='accepted';
      SELECT id from users where is_deleted=0 and role_id=1`
    )
    .then((results) => {
      console.log(results);
      res.status(200).json({
        success: true,
        pendingOrders: results[0].rows,
        acceptedOrders: results[1].rows,
        usersAcouts: results[2].rows,
        message: "Here are all your pending orders",
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

const addTotalPrice = (req,res)=>{
    const {total_price}=req.body
    const {order_id}=req.params
    const array = [total_price,order_id]
    pool.query(`UPDATE orders SET total_price=$1 where id=$2`,array)
    .then((results)=>{
      res.status(201).json({
        succes:true,
        message:"order price added successfuly",
        results : results.rows
      })
    })
    .catch((err)=>{
      res.status(500).json({
        success:false,
        message:"Server Error kindly try again later",
        error:err
      })
    })
}

const getLast5Orders = (req,res)=>{
  pool.query(`SELECT * FROM orders ORDER BY id DESC LIMIT 5;`)
  .then((results)=>{
    res.status(200).json({
      success: true,
      message:"Here are the last 5 orders",
      orders : results.rows
    })
  })
  .catch((err)=>{
    res.status(500).json({
      success:false,
      message:"Server Error kindly try again later",
      error:err
    })
  })
}

const getOrderDetailsById = (req,res)=>{
  const {id}=req.params
  const array = [id]
  const query = ` select U.firstName,U.lastName,O.id, O.created_at,O.employee_id, O.user_id,S.name AS service_name , S.img AS service_img, S.price AS service_price, O.order_status,O.location ,O.scheduled_time,A.name As accessory_name, A.img As accessory_img , A.price As accessory_price,A.id As accessory_id from orders O inner join services S on O.service_id = S.id inner join order_accessories OA on OA.order_id=O.id inner join accessories A on OA.accessories_id=A.id inner join users U on O.user_id = U.id where O.id=$1`
  pool.query(query,array)
  .then((results)=>{
    res.status(200).json({
      success:true,
      message:"Here is the details of this order",
      Details:results.rows
    })
  })
  .catch((err)=>{
    res.status(500).json({
      success:false,
      message:"Server Error , Kindly try again later",
      error : err
    })
  })
}
module.exports = {
  createOrderById,
  getMyOrders,
  addAccessoryToOrder,
  updateOrderTime,
  deleteOrderById,
  addLocationToOrder,
  getAllOrders,
  getAllEmployees,
  addEmployeeToOrder,
  countPendingOrders,
  addTotalPrice,
  getOrderDetailsById,
  getLast5Orders
};
