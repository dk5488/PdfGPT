const s3 = require("../config/s3Config");
const { Pdf } = require("../models");
const axios = require("axios");


exports.uploadPdf = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: "No file uploaded!" });

        // Print the PDF buffer to console
        //console.log("Uploaded PDF File Buffer:", file.buffer);

        const s3Params = {
            Bucket: process.env.AWS_BUCKET_NAME, // Ensure this is set in your .env file
            Key: file.originalname,
            Body: file.buffer,
        };

        // Upload file to S3
        const uploadResult = await s3.upload(s3Params).promise();

        // Save metadata in PostgreSQL
        const pdf = await Pdf.create({
            userId: req.userId, // Hardcoded userId (you can replace this with dynamic data from req.body or auth middleware)
            filename: file.originalname,
            s3Url: uploadResult.Location,
        });

        // Respond with the uploaded PDF file and metadata
        res.json({
            message: "File uploaded successfully!",
            pdfDetails: pdf,
            //uploadedPdf: file.buffer.toString("base64"), // Encodes buffer to base64 for client-side printing
        });
    } catch (error) {
        console.error("Error during PDF upload:", error);
        res.status(500).json({ error: "Error uploading file!" });
    }
};

exports.askQuestion = async (req, res) => {
    try {
        const { pdfId, question } = req.body.body || req.body;
        
        console.log("Extracted pdfId:", pdfId);
        console.log("Extracted question:", question);

        const pdf = await Pdf.findByPk(pdfId);
        if (!pdf) return res.status(404).json({ error: "PDF not found!" });

        const response = await axios.post(process.env.FASTAPI_URL, {
            url: pdf.s3Url,
            question,
        });
        console.log('answer::',response.data.answer)

        res.json({ answer: response.data.answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing question!" });
    }
};


exports.getLatestPdfs = async (req, res) => {
    try {
        const { userId } = req; 

        // Fetch the latest 50 PDFs for the user
        const pdfs = await Pdf.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]], // Order by most recent
            limit: 50, // Limit to 50 PDFs
        });
        

        res.json({ pdfs });
    } catch (error) {
        console.error("Error fetching PDFs:", error);
        res.status(500).json({ error: "Error fetching PDFs!" });
    }
};