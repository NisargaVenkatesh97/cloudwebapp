let express = require('express')

let app=express();
const nocache = require("nocache");
let databaseStatus = 503;

const {Pool} = require("pg");

const databaseConnection = async () =>{
    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "cloudusers",
        password: "postgres",
        port: 5432

    })

    pool.on("error",function(err, client){
        console.log("database not found",err)

    })

    try {
        const client = await pool.connect();
        console.log('Database connection successful');
        databaseStatus = 200;
        client.release();
    } catch (err) {
        console.error('Database connection failed:', err);
        databaseStatus = 503;
    }
}

app.get("/healthz",async function(req,res){
    await databaseConnection();
    if(req.body){
        res.sendStatus=405;
    }
    else{
        res.sendStatus(databaseStatus);
    }
    
})

app.put("/healthz",function(req,res){
    res.sendStatus(405);
})

app.post("/healthz",function(req,res){
    res.sendStatus(405);
})

app.patch("/healthz",function(req,res){
    res.sendStatus(405);
})

app.delete("/healthz",function(req,res){
    res.sendStatus(405);
})


let server= app.listen(8080, function(){
    console.log("the app is running on the port 8080")

})
