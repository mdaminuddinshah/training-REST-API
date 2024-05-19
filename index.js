import express from "express";
// import { health, notExist } from "./controller/health.js";
import routerTest from "./controller/health.js";
import { databaseConnection } from "./database/databaseConnection.js";

const app = express();
const port = 1001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// database
databaseConnection();

// using router
app.use("/", routerTest);
app.use("/", routerTest);

app.listen(port);
