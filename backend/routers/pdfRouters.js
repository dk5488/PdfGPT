const express = require("express");
const multer = require("multer");
const { uploadPdf, askQuestion,getLatestPdfs } = require("../controllers/pdfControllers");
const authMiddleware=require("../middleware/authMiddleware")
const router = express.Router();
const upload = multer(); // Multer for handling file uploads in memory

router.post("/upload",authMiddleware, upload.single("file"), uploadPdf);
router.post("/ask",authMiddleware, askQuestion);
router.get("/latest",authMiddleware,getLatestPdfs);
module.exports = router;
