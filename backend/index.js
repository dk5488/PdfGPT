const express = require("express");
const pdfRouter = require("./routers/pdfRouters");
const authRouter=require("./routers/authRoutes")
const { sequelize } = require("./models/index");

require("dotenv").config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/pdf", pdfRouter);
app.use("/api/auth",authRouter);

// Database Connection
sequelize.sync().then(() => {
    console.log("Database connected!");
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
