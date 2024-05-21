import { passport } from "../../database/databaseConnection.js";

const queryDBNotAvailable = `
    SELECT id, date, time FROM slots
    WHERE customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL
`;
const queryDBAvailable = `
    SELECT id, date,time FROM slots
    WHERE customer_name IS NULL AND customer_email IS NULL AND customer_phone IS NULL
`;

const listSlots = async (req,res) => {
    try{
        const availableSlot = await passport.query(queryDBAvailable);
        const bookedSlot = await passport.query(queryDBNotAvailable);
        const slots = {
            available_slot: availableSlot.rows,
            booked_slot: bookedSlot.rows
        }
        res.status(200).json({
            message: "okay",
            data: slots,
            message: `Available slot have ${availableSlot.rows.length}, Booked slot have ${bookedSlot.rows.length}`
        })

    } catch(err){
        res.status(500).json({
            message: "error"
        })
    }
}

export default listSlots;