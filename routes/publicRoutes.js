import router from "express";
import {login} from "../controller/user controller/login.js";
import {register} from "../controller/user controller/register.js";
import listSlots from "../controller/user controller/readPublicSlot.js";
import createPublicSlot from "../controller/user controller/createPublicSlot.js";

const publicRouter = router();

publicRouter.get("/public", (req,res) => {
    res.status(200);
    res.send("public page")
});

publicRouter.post("/register", register);
publicRouter.get("/login", login);
publicRouter.get("/readList", listSlots);
publicRouter.post("/bookSlot/:id", createPublicSlot);



export default publicRouter;
