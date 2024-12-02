const express = require("express");
const pdfRouter = require("./routers/pdfRouters");
const authRouter=require("./routers/authRoutes")
const { sequelize } = require("./models/index");
const cors =require ('cors');

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*', // Allow all origins (only for development)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Authorization', 'Content-Type','headers'], // Allowed headers
    credentials: true // Optional
}));

app.options('*', cors());

// Routes
app.use("/api/pdf", pdfRouter);
app.use("/api/auth",authRouter);

// Database Connection
sequelize.sync().then(() => {
    console.log("Database connected!");
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
