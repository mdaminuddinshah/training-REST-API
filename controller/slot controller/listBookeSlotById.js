import { passport } from "../../database/databaseConnection.js"

const queryDB = `
    SELECT id, date, time, customer_name, customer_email, customer_phone FROM slots
    WHERE id = $1 AND customer_name IS NOT NULL AND customer_email IS NOT NULL AND customer_phone IS NOT NULL
`;

const listBookedById = async (req,res) => {
    try{
        const id = req.params.id;
        const data = await passport.query(queryDB, [id]);
        res.status(200).json({
            message: data.rows.length ? `Found ${data.rows.length} slot with id ${id}` : "Not found any slot",
            data: data.rows[0]
        })
    } catch(err){
        res.status(500).json({
            message: "error"
        })
    }
}

export default listBookedById;