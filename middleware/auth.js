import jwt from "jsonwebtoken";
import 'dotenv/config'; 

export const verifyToken = (req, res, next) => {
    console.log("Headers yang diterima", req.headers);
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({message: 'Access Denied'});

    try {

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const time_iat = verified.iat;
        const time_now = Math.floor(Date.now() / 1000);

        if (time_now - time_iat >= 1) {
            throw("Token Expired.");
        }

        req.user = verified;
        console.log('Token verified', verified);
        next();
    } catch (err){
        
        res.status(400).json({message: err.message ? err.message : 'Invalid Token'});
    }

};