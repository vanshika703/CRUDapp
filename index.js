const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))

var mysqlConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'EmployeeDB'
    multipleStatements : true
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('db connection success');
    else
        console.log('db connection error' + JSON.stringify(err, undefined, 2));
});

//get all emplyees
app.get('/employees',(req,res)=>{
   
    mysqlConnection.query('SELECT * FROM employee',(err, rows, fields)=>{
        if(!err)
                res.send(rows);
         else
            console.log(err);
    })
});

//get an employee
app.get('/employees/:id',(req,res)=>{
   
    mysqlConnection.query('SELECT * FROM employee WHERE EMpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
                res.send(rows);
         else
            console.log(err);
    })
});



//Delete an employee
app.delete('/employees/:id',(req,res)=>{
   
    mysqlConnection.query('DELETE FROM employee WHERE EMpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
                res.send(rows);
         else
            console.log(err);
    })
});

//Insert an employee
app.post('/employees',(req,res)=>{
   
    let emp = req.body;
    var sql = "SET @EmpID = ?,SET @name = ?,SET @EmpCode = ?,SET @salary = ?; \
    CALL employee(@EmpID,@name,@EmpCode,@salary);";
        mysqlConnection.query(sql,[emp.EmpID, emp.name, emp.EmpCode, emp.salary],(err, rows, fields)=>{
        if(!err)
                rows.forEach(element =>{
                    if(element.constructor == Array)
                    res.send('Inserted eMPLOYEE ID : '+element[0].EmpId);
                })
         else
            console.log(err);
    })
});

//Insert an employee
app.put('/employees',(req,res)=>{
   
    let emp = req.body;
    var sql = "SET @EmpID = ?,SET @name = ?,SET @EmpCode = ?,SET @salary = ?; \
    CALL employee(@EmpID,@name,@EmpCode,@salary);";
        mysqlConnection.query(sql,[emp.EmpID, emp.name, emp.EmpCode, emp.salary],(err, rows, fields)=>{
        if(!err)
                res.send('Updated Successfully');
         else
            console.log(err);
    })
});

 app.listen(3000, ()=>console.log('Express running at port 3000'));


