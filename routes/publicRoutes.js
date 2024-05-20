import router from "express";
import {login} from "../controller/user controller/login.js";
import {register} from "../controller/user controller/register.js";

const publicRouter = router();

publicRouter.get("/public", (req,res) => {
    res.status(200);
    res.send("public page")
});

publicRouter.post("/register", register);
publicRouter.get("/login", login);



export default publicRouter;
