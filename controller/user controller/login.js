import { passport } from "../../database/databaseConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";


const queryUser = `
    SELECT * FROM users WHERE email = $1
`;

export const login = async (req,res) => {
    try{
        // email and password is provided
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password){
            return res.status(404).json({
                message: "email and password cannot empty"
            })
        };

        // check email registered/exist or not
        const acc = await passport.query(queryUser, [email]);
        const accExist = acc.rows[0];

        if(!accExist){
            return res.status(404).json({
                message: "email not exist"
            })
        };

        // check password from user using bcrypt with DB hashed pwd
        const pwd = bcrypt.compareSync(password, accExist.password);

        if(!pwd){
            return res.status(404).json({
                message: "password wrong"
            })
        }

        // when login, automatically create token
        const data = {
            email: accExist.email,
            id: accExist.id
        };

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(data, secretKey);

        // login successfully response
        res.status(200).json({
            message: "login successfully",
            token: token
        });

    } catch(err){
        res.status(404).json({
            message: "user not register"
        })
    }
};