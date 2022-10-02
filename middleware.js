exports.authenticate = (req, res, next)=>{
    let cookie = req.cookies.authenticated;
    if (!cookie) {
        res.status(403).json({ err: "Authentication failed" })
        return   
    }
    next()
}