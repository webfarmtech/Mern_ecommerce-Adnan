import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Malformed token, authorization denied",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user ID to request
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Token is not valid" });
  }
};

export default authUser;
