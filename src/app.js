const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/user.route");
const roleRouter = require("./routes/role.route");
const permissionRouter = require("./routes/permission.route");
const categoryRouter = require("./routes/category.route");
const attributeRouter = require("./routes/attribute.route");

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());


app.use("/api/v1/user", userRouter);
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/permission", permissionRouter);

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/attribute", attributeRouter);



module.exports = { app };
