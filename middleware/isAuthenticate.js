import jwt from "jsonwebtoken";
import "dotenv/config";

const isAuth = (req,res,next) => {
        
        // check is token provided
        const isToken = req.headers.authorization;
        if(!isToken){
            return res.status(404).json({
                message: "token cannot empty"
            })
        };

        // check token is valid or invalid
        const token = isToken.split(" ")[1];
        const secret = process.env.SECRET_KEY;
        jwt.verify(token, secret, (err, decoded) => {
            if(err){
                return res.status(404).json({
                    message: "invalid token"
                })
            }

            // access token 
            // kenapa req.id ? sebab dia request dari buat token kat login.js request dari situ
            req.id = decoded.id;
            req.email = decoded.email;
            next(); 
        });

          
}

export default isAuth;