import router from "express";
import isAuth from "../middleware/isAuthenticate.js";

const privateRouter = router();

privateRouter.use(isAuth);

privateRouter.get("/private", (req,res) => {
    res.status(200);
    res.send("private page")
});

// last sekali handle page not found
// privateRouter.use((req, res) => {
//     try {
//         res.status(404).send("page not found");
//         console.log("page not found");
//     } catch (err) {
//         res.status(500).send("server error");
//     }
// });

export default privateRouter;