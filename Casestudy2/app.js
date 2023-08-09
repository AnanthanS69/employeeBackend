// Task1: initiate app and run server at 3000
const express=require('express');
const app=new express();

app.listen(3000,()=>{
    console.log(`server started`)
});
const path=require('path');

// Task2: create mongoDB connection 

const mongoose = require('mongoose');

require("dotenv").config();                                                   
const ConnectionString = process.env.CONNECTION_STRING; 

mongoose.connect("mongodb+srv://ananthanstvm:employee@cluster0.wk4kewx.mongodb.net/")
.then(()=>{
    console.log(`Connection to Database established`);
})
.catch((error)=>{
    console.log(`Error in connecting to database ${error.message}`)
})


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
//TODO: get data from db  using api '/api/employeelist'

app.get('/employeelist', async (req, res) => {
    try {

        let data = await employeeData.find({})
        res.json({data:data, status: 200}).status(200)

    } catch (error) {
        console.log(error)
        res.send('error')
    }
})




//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/employeelist/:id', async (req, res) => {
    try {


        let id = req.params.id
        let data = await employeeData.findById(id)
        res.json({data:data, status: 200}).status(200)

    } catch (error) {
        console.log(error)
        res.send('error')
    }
})





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.get('/api/employeelist', async (req, res) => {
    try {
      const employees = await Employee.find(); // Exclude _id and __v fields
  
      const formattedEmployees = employees.map(employee => ({
        name: employee.name,
        location: employee.location,
        position: employee.position,
        salary: employee.salary,
      }));
      res.json(formattedEmployees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete("/delete/:id",async (req,res)=>{
    try {
        let id = req.params.id;
        console.log(id);
        let data = await employeeData.findByIdAndRemove(id);
        res.json({data:data,status:200}).status(201);
    } catch (error) {
        res.status(400).json({ message: "DELETE request CANNOT be completed" });       
    }
})




//TODO: Update  a employee data from db by using api '/api/employeelist'

app.put('/update/:ind',(req,res)=>{
    for (var i = 0; i < dataset.length; i++) {
        if (dataset[i].Name === ' ') {
          dataset[i][' '] = " ";
          break;
        }
      }
      res.send(dataset);
})
//Request body format:{name:'',location:'',position:'',salary:''}


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



