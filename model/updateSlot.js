import { passport } from "../database/databaseConnection.js";

const querySlotDB = `
ALTER TABLE slots 
ALTER COLUMN customer_name DROP NOT NULL,
ALTER COLUMN customer_email DROP NOT NULL,
ALTER COLUMN customer_phone DROP NOT NULL
`;

const updateTableSlots = async () => {
    try{
        await passport.query(querySlotDB);
        console.log("update table slots");
    } catch(err){
        console.log("error update table slots");
    }
};

export default updateTableSlots;
