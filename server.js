const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const usersRouter = require("./routes/users");
const servicesRouter = require("./routes/services");
const accessoriesRouter = require("./routes/accessories");
const rolesRouter = require("./routes/roles");
const ordersRouter = require("./routes/orders");
require("./models/db");
require("./models/mongoDB");

app.use("/users", usersRouter);
app.use("/services", servicesRouter);
app.use("/accessories", accessoriesRouter);
app.use("/roles", rolesRouter);
app.use("/orders", ordersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});
