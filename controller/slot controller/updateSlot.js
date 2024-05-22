import { passport } from "../../database/databaseConnection.js";

const  queryDB = `
    UPDATE slots
    SET date = $1, time = $2
    WHERE id = $3 AND customer_name IS NULL AND customer_email IS NULL AND customer_phone IS NULL
    RETURNING date, time
`;

const updateSlot = async(req,res) => {
    try{
        const date = req.body.date;
        const time = req.body.time;
        const id = req.params.id;

        const DBres = await passport.query(queryDB, [date, time, id]);
        const Data = DBres.rows;

        if(!Data.length){
            return res.status(404).json({
                message: "Slot already booked, cannot update"
            })
        };

        res.status(200).json({
            message: `You have updated id ${id}`,
            data: DBres.rows
        })
    } catch(err){
        res.status(500).json({
            message: "error"
        })
    }
};

export default updateSlot;