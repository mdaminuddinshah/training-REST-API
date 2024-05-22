import { passport } from "../../database/databaseConnection.js";

// DESC = DESCENDING
// ASC = ASCENDING
const queryDBSlot = `
    SELECT id, date, time FROM slots ORDER BY date, time ASC
`;

const listAllSlots = async (req,res) => {
    try{

        // explore pagination

        const query = await passport.query(queryDBSlot);
        const lists = query.rows;
        // console.log(lists);
        // console.log(query);
        const isFoundList = lists.length ? `Found ${lists.length} lists` : "not found any list"
        res.status(200).json({
            message: isFoundList,
            data: lists
        })
    } catch(err){
        res.status(404).json({
            message: "error list slots"
        })
        console.log("Error list slots")
    }
}

export default listAllSlots;