const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized User" });
        }

        // Remove "Bearer "
        token = token.split(" ")[1];

        // Verify token
        const user = jwt.verify(token, SECRET_KEY);

        // Attach user id to request
        req.userId = user.id;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized User" });
    }
};

module.exports = auth;
