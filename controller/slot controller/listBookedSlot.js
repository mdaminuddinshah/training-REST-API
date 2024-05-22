import { passport } from "../../database/databaseConnection.js";

const queryDB = `
    SELECT id, date, time, customer_name, customer_email, customer_phone FROM slots
    WHERE customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL
`;

const BookedSlot = async (req,res) => {
    try{
        const BookedList = await passport.query(queryDB);
        const isBooked = BookedList.rows.length ? `Found ${BookedList.rows.length} booked slot(s)` : `${BookedList.rows.length} booked slot`
        res.status(200).json({
            message: isBooked,
            data: BookedList.rows
        })
    } catch(err){
        res.status(500).json({
            message: "error"
        })
    }
}

export default BookedSlot;