const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing. Access denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err.message);
        res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
    }
};

const isAdmin = (req, res, next) => {
    
    if (req.user?.role === 'admin') {
        console.log(user.email);
        
        next();

    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

module.exports = {
    authenticate,
    isAdmin,
};
