import { passport } from "../database/databaseConnection.js";

const queryDB = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`;

const createTableUser = async () => {
    try{
        await passport.query(queryDB);
        console.log("success create table user");
    } catch(err){
        console.log("failed creaet table user");
    }
}

export default createTableUser;