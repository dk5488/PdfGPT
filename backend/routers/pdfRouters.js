const express = require("express");
const multer = require("multer");
const { uploadPdf, askQuestion } = require("../controllers/pdfControllers");
const authMiddleware=require("../middleware/authMiddleware")
const router = express.Router();
const upload = multer(); // Multer for handling file uploads in memory

router.post("/upload",authMiddleware, upload.single("file"), uploadPdf);
router.post("/ask",authMiddleware, askQuestion);

module.exports = router;
