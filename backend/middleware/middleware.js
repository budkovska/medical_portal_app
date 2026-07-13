exports.protect = (req, res, next) => {
    const userId = req.headers['user-id'];
    if (!userId) {
        return res.status(401).json({ 
            message: "Доступ заборонено. Будь ласка, увійдіть у систему." 
        });
    }
    req.authenticatedUserId = userId;
    next();
};