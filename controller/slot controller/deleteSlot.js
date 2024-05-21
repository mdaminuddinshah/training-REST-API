import { passport } from "../../database/databaseConnection.js";

const queryDelete = `
    DELETE FROM slots WHERE id = $1
`;

const DeleteSlot = async (req,res) => {
    try{
        const id = req.params.id;

        // check if id not exist
        const data = await passport.query(queryDelete, [id]);
        // rowCount utk check jumlah query row
        const ids = data.rowCount;  
        console.log(ids);

        const message = ids ? `data with id ${id} is deleted` : `id ${id} not found`;
        res.status(200).json({
            message: message
        })
    } catch(err){
        res.status(404).json({
            message: "error"
        })
    }
};

export default DeleteSlot;