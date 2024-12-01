const jwt = require("jsonwebtoken");
const { User } = require("../models/index"); // Adjust the import based on your project structure

const authMiddleware = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers.authorization;
        console.log("authHeader::",authHeader)
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized. Token missing." });
        }

        const token = authHeader.split(" ")[1]; 
        console.log("Extracted token::",token)// Extract the token

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user based on the ID from the token
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized. User not found." });
        }

        // Attach user ID to request object
        req.userId = user.id;
        console.log("Inside middleware userId::",user.id)

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};

module.exports = authMiddleware;
