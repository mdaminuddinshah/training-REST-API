import { passport } from "../../database/databaseConnection.js";

const querySlotDB = `
    INSERT INTO slots(date, time)
    VALUES($1,$2) RETURNING *
`;

const queryDB = `
    SELECT * FROM slots WHERE date = $1 AND time = $2
`;

const createSlots = async (req,res) => {
    try{
        const date = req.body.date;
        const time = req.body.time;

        // check if date or time not provided
        if(!date || !time){
            return res.status(404).json({
                message: "date and time must provided"
            })
        };

        // check is date and time is exist
        const isDateTimeExist = await passport.query(queryDB, [date, time]);
        const isExist = isDateTimeExist.rows.length;
        if(isExist){
            return res.status(404).json({
                message: "slot already exist"
            })
        };

        const admins = await passport.query(querySlotDB, [date,time]);
        const acc = admins.rows[0];

        res.status(200).json({
            message: "slots created",
            acc: acc
        })

    } catch(err){
        console.log("failed create slots")
    }
};

export default createSlots;