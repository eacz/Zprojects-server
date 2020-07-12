const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({ message: 'missing token' });
    }

    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
