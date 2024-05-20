import express from "express";
import { databaseConnection } from "./database/databaseConnection.js";
import publicRouter from "./routes/publicRoutes.js";
import privateRouter from "./routes/privateRoutes.js";
import "dotenv/config";

const app = express();
const port = 1002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
databaseConnection();

// using router
app.use("/", publicRouter);
app.use("/", privateRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
