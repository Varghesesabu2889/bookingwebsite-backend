import jwt from 'jsonwebtoken'
const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You are not authorized"
        });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
        req.user = user; // Set the user object in the request
        next(); // Call the next middleware or route handler
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "You're not authenticated"
            });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "You're not authorized"
            });
        }
    });
};


