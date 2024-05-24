const express = require("express")
const mysql = require("mysql2")
const cors = require("cors");
const e = require("cors");

const app = express();
const port = 3521;

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'backenddb'
});

db.connect((err)=>{
    if(err){
        console.log("Database error Connection");
        console.log(err);
    }else{
        console.log("เชื่อม Database สำเร็จ");
    }
});

app.use(cors());
app.use(express.json());

app.get('/api/data',(req,res)=>{
    db.query("SELECT * FROM post",(err,result) =>{
        if(err){
            res.status(500).send("Error get Database")
        }
        res.status(200).json(result);
    });
});

app.post("/api/insertData",(req,res)=>{
    const {tt,tx} = req.body;
    // return res.json({ee:tt,eee:tx})
    db.query("INSERT INTO post ( title, text) VALUES (?,?)",[tt,tx],(err,results)=>{
        if(err){
            res.status(500).send("Error post Database")
        }
        res.status(200).json("succes");  
    });
    
})

app.delete("/api/deleteData",(req,res)=>{
    const {id} = req.query
    db.query("DELETE FROM post WHERE (id = ?)",[id],(err,results)=>{
        if(err){
            res.status(500).send("Delete ไม่ได้")
        }
        res.status(200).json("Delete succes");  
    });
})


// app.delete("/api/deleteData/:id",(req,res)=>{
//     const {id} = req.params
//     db.query("DELETE FROM post WHERE (id = ?)",[id],(err,results)=>{
//         if(err){
//             res.status(500).send("Delete ไม่ได้")
//         }
//         res.status(200).json("Delete succes");  
//     });
// })








app.listen(port,() => {
    console.log("เชือมที่ Port " + port);
})