import { passport } from "../../database/databaseConnection.js";
import emailValidation from "../../utils/emailValidation.js";

const queryDBAvailable = `
    SELECT * FROM slots 
    WHERE id = $1 AND customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL
`;

const queryDBUpdateSlot = `
    UPDATE slots
    SET customer_name = $1, customer_email = $2, customer_phone = $3
    WHERE id = $4
    RETURNING id, date, time, customer_name, customer_email, customer_phone 
`;

const createPublicSlot = async (req,res) => {
    try{
        const id = req.params.id;
        const name = req.body.name;
        const email = req.body.customer_email;
        const phone = req.body.customer_phone;

        // check if name, email and phone is provided
        if(!name || !email || !phone){
            return res.status(404).json({
                message: "name, email and phone must provide"
            })
        };

        // check if email is valid
        const isEmailValid = emailValidation(email);
        if(!isEmailValid){
            return res.status(404).json({
                message: "invalid email"
            })
        };

        // check if slot is booked or not
        const availableSlot = await passport.query(queryDBAvailable, [id]);
        if(availableSlot.rows.length){
            return res.status(404).json({
                message: "Slot already booked"
            })
        };

        const updateSlot = await passport.query(queryDBUpdateSlot, [name, email, phone, id]);

        res.status(200).json({
            message: updateSlot.rows
        })

    }catch(err){
        res.status(404).json({
            message: "error"
        })
    }
}

export default createPublicSlot;