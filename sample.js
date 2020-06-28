var express = require('express');
var app = express();
var request = require('request');
const port = 3000
app.set("view engine", "ejs");



app.get('/search', function(req, res){
    res.render("search");
});


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


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))