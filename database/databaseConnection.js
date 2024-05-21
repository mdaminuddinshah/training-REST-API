import pg from "pg";
import "dotenv/config";
import createTableUser from "../model/users.js";
import createTableSlots from "../model/slots.js";
import updateTableSlots from "../model/updateSlot.js";

const { Pool } = pg;

export const passport = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

export const databaseConnection = async () => {
    try{
        await passport.query("SELECT NOW()");
        console.log("DB connected");

        createTableUser();
        createTableSlots();
        updateTableSlots();
    } catch(err){
        console.log("DB error");
    }
};
