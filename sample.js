var express = require('express');
var app = express();
var request = require('request');
const port = 3000
app.set("view engine", "ejs");

var apiSearch;
var methodSearch;



//landing page
app.get('/main', function(req,res){
    res.render("main");
});

//selecting apis
app.get('/select', function(req,res,next){
    apiSearch = req.query.api;
    methodSearch = req.query.method;

    //first API call
     if(apiSearch === "api1" && methodSearch === "get"){  
            res.render("search");
     }else if(apiSearch === "api1" && methodSearch === "post"){
            res.render("post1");
     }else if(apiSearch === "api1" && methodSearch === "delete"){
            res.render("delete1");
     }
    //Second API Call
    else if(apiSearch === "api2" && methodSearch === "get"){  
        res.render("search2");
    }else if(apiSearch === "api2" && methodSearch === "post"){
        res.render("post2");
    }else if(apiSearch === "api2" && methodSearch === "delete"){
        res.render("delete2");
    
    
}});


//get for api1
app.get('/users', function(req, res){
    var query = req.query.id;
    //console.log(query);
    var url = 'https://jsonplaceholder.typicode.com/users/'+query;
    //var url = 'https://jsonplaceholder.typicode.com/users';
   request(url, function(err, response, body){
       if(!err && res.statusCode==200){
           var data = JSON.parse(body);
           res.render("results", {data: data});
          
       }
       
   });
});


//get for api2
app.get('/employee', function(req, res){
    var query = req.query.id;
    //console.log(query);
    var url = 'http://dummy.restapiexample.com/api/v1/employees/'+query;
    //var url = 'https://jsonplaceholder.typicode.com/users';
   request(url, function(err, response, body){
       if(!err && res.statusCode==200){
           var data = JSON.parse(body);
           res.render("results2", {data: data});
          
       }
       
   });
});



//delete for api1
app.delete('/users/:id', function(req, res){
    var id = req.query.id;
    var url = 'https://jsonplaceholder.typicode.com/users/'+id;
    request(url, function(err, response, body){
        if(!err && res.statusCode==204){
            var data = JSON.parse(body);
            delete data[id];
            console.log( data );
            res.end( JSON.stringify(data));
           
        }
       
    });
 });



//delete for api2
app.delete('/delete/:id', function(req, res){
    var id = req.query.id;
    var url = 'https://reqres.in/api/users/'+id;
    request(url, function(err, response, body){
        if(!err && res.statusCode==204){
            var data = JSON.parse(body);
            delete data[id];
            console.log( data );
            res.end( JSON.stringify(data));
           
        }
       
    });
 });


//post for api1 is present in post1.ejs file itself

    
//post for api2 is present in post2.ejs file itself








app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))