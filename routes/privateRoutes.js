import router from "express";
import isAuth from "../middleware/isAuthenticate.js";
import createSlots from "../controller/slot controller/createSlot.js";
import listAllSlots from "../controller/slot controller/listSlot.js";
import DeleteSlot from "../controller/slot controller/deleteSlot.js";

const privateRouter = router();

privateRouter.use(isAuth);

privateRouter.get("/private", (req,res) => {
    res.status(200);
    res.send("private page")
});

privateRouter.post("/create", createSlots);
privateRouter.get("/read", listAllSlots);
privateRouter.delete("/delete/:id", DeleteSlot);

export default privateRouter;