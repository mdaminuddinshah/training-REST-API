import { passport } from "../../database/databaseConnection.js";
import bcrypt from "bcrypt";
import emailValidation from "../../utils/emailValidation.js";
import sendEmail from "../../service/email.js";

const queryRegister = `
    INSERT INTO users(
        email, 
        password
    )
    VALUES($1,$2)
`;

export const register = async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        // check email and password is provided
        if(!email || !password){
            return res.status(404).json({
                message: "email and password cannot empty"
            })
        };

        // check email is valid or not @gmail.com
        const emailValid = emailValidation(email);
        if(!emailValid){
            return res.status(404).json({
                message: "invalid email"
            })
        };
        

        // change password provided using hashing bcrypt
        const saltRounds = 10;
        const pwd = bcrypt.genSaltSync(saltRounds);
        const hashedPwd = bcrypt.hashSync(password, pwd);

        // query to database
        await passport.query(queryRegister, [email, hashedPwd]);

        // send email
        const data = {
            to: email,
            subject: "Welcome",
            text: `Hello ${email}`,
            html: `<h1>Hello ${email}</h1>`
        };
        await sendEmail(data);

        // send status success
        res.status(200).json({
            message: "register successfully"
        });

    } catch(err){
        res.status(404).json({
            message: "use different email"
        })
        console.log("use different email");
    }
}