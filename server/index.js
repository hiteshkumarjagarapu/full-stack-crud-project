const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const cors=require('cors')
app.use(cors({
  origin: 'http://localhost:5173'
}));


app.use(express.json())
//const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'info.db');

const dbPath= path.join(__dirname, "info.db");

let db=null;

const initializeDBAndServer = async () => {
    try {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
      app.listen(8080, () => {
        console.log("Server Running at...8080");
      });
    } catch (e) {
      console.log(`DB Error: ${e.message}`);
      process.exit(1);
    }
  };
  
initializeDBAndServer();



//GET ALL THE USERS IN STUDENT TABLE
app.get("/", async (req, res) => {
  try {
      const getQuery = `SELECT * FROM student;`;
      const getResponse = await db.all(getQuery);
      res.send(getResponse);
  } catch (error) {
      res.send(`Error: ${error.message}`);
  }
});


//GET SINGLE USER BASED ON ID IN STUDENT TABLE
app.get('/getUser/:id', async(req, res) => {
  try{
    const {id} = req.params;
  const query = `SELECT * FROM student WHERE id = ?`;  
  const resu=await db.get(query,id);
  res.send(resu);

  }catch(e){
    res.send(e);
  
  }
});



//CREATE OR ADD AN USER TO STUDENT TABLE
app.post('/createUser', async (req, res) => {
  try {
    const {name,email}=req.body;
    const postQuery = `INSERT INTO student (name, email) VALUES (?, ?)`;
    const result=await db.run(postQuery,[name,email]);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});


//UPDATE THE EXISTING USER 
app.put('/updateUser/:id',async(req,res)=>{
  try{
    const {id}=req.params
    const{name,email}=req.body;
    const putQuery=`UPDATE student SET name=?, email=? WHERE id=?;`;
    const result=await db.run(putQuery,[name,email,id]);
    res.send.json(result);

  }catch(e){
    res.send(e)
  }
})

//DELETE THE USER IN TABLE
app.delete('/deleteUser/:id',async(req,res)=>{
  try{
    const{id}=req.params;
    
    const dltQuery=`DELETE FROM student WHERE id=?;`;
    const result=await db.run(dltQuery,[id])
    res.send.json(result);
  }catch(e){
    res.send(e)
  }
})