import router from "express";

const routerTest = router();

routerTest.get("/hello", (req,res) => {
    try{
        res.send("hello");
        res.status(200);
        console.log("success");
    } catch(err){
        res.send("error");
        res.status(404);
        console.log("failed")
    }
});

routerTest.get("/admin", (req,res) => {
    try{
        res.status(200);
        res.send("ADMIN");
        console.log("ADMIN LOGIN SUCCESS");
    } catch(err){
        res.status(404);
        res.send("ERROR LOGIN");
        console.log("ERROR LOGIN");
    }
});

routerTest.use((req,res) => {
    try{
        res.send("page not found");
        res.status(404);
        console.log("page not found");
    } catch(err){
        res.send("server error");
        res.status(500);
    }
})

export default routerTest;

