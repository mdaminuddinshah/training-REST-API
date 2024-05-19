import { passport } from "../database/databaseConnection.js";

const queryDB = `
    CREATE TABLE IF NOT EXISTS slots(
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        time TIME NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`;

const createTableSlots = async () => {
    try{
        await passport.query(queryDB);
        console.log("success create table slots");
    } catch(err){
        console.log("error");
    }
};

export default createTableSlots;