const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


app.use(cors());
app.use(express.json());

//insert a todo
app.post('/todos', async (req, res) => {
    try{
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
         res.status(201).json(newTodo.rows[0]);
    } catch (err){
        res.status(500).send("server error")
        console.error(err.message);
    }
})

//get all todos
app.get('/todos', async(req,res) => {
    try{
        const newTodo = await pool.query("SELECT * FROM todo");
        res.json(newTodo.rows);
    } catch (err){
        console.error(err.message);
    }
})

//get a todo
app.get('/todos/:id',  async(req,res) => {
    try{
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo Where todo_id = $1", [id]);   // i am selecting the todo where todo_id matches the id from the params(url) 
        res.json(todo.rows[0]);                                                         // so whatever todo_id matches that id from params will be sent as a response
    } catch (err){
        console.error(err.message);  
    }   
})

//update a todo
app.put("/todos/:id", async(req, res) => {
    try {
    const {id} = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
    res.status(200).json("Todo was updated");  // this response is just a message confirming the update, response sent to frontend
    res.json(updateTodo.rows[0]);   // this line is unnecessary as the previous line already sends a response
    } catch(err){
    
        res.status(500).json({error: err.message});
    }
})

//Delete a todo
app.delete("/todos/:id", async(req, res) => {
    try{
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]) 
    res.status(200).json("Todo was deleted");  // sending a response back to the client confirming deletion
    } catch(err){
        res.status(500).json({error: err.message});
    } 
})

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () =>{
    console.log('Server is running on port 5000');  
});