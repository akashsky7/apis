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
    //  }else if(apiSearch === "api1" && methodSearch === "paramsget"){  
    //     res.render("search1");
     
     }else if(apiSearch === "api1" && methodSearch === "post"){
            res.render("post1");
     }else if(apiSearch === "api1" && methodSearch === "delete"){
            res.render("delete1");
     }

     //queryparameter api call
     else if(apiSearch === "qp" && methodSearch === "paramsget"){
         res.render("search1");
     }


     //for xml
     else if(apiSearch === "xml1" && methodSearch === "get"){
        // function loadDoc() {
        //     var xhttp = new XMLHttpRequest();
        //     xhttp.onreadystatechange = function() {
        //       if (!err && this.status == 200) {
        //           parser = new DOMParser();
        //           xmlDoc = parser.parseFromString(this.responseText,"text/xml");
        //         document.getElementById("demo").innerHTML =xmlDoc.getElementByTagName("CD");
        //       }
        //     };
        //     xhttp.open("GET", "C:\Users\AkashKumarGoswami\Desktop\API\Sample\cd_catalog.xml", true);
        //     xhttp.send("show.ejs");
        //   }
        res.render("show.ejs");
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


//get for api1 via query parameters
app.get('/users1', function(req, res){
    var queryname = req.query.name;
    var queryid = req.query.id;
    //console.log(query);
    var url = 'https://jsonplaceholder.typicode.com/users/'+queryid;
    request(url, function(err, response, body){
        if(!err && res.statusCode==200){
            var data = JSON.parse(body);
            var name = data.name;
            if(name === queryname){
                res.render("results", {data: data});
            }
            
           
        }
        
    });
});

app.get('/users2', function(req, res){
    var queryminid = req.query.minid;
    var querymaxid = req.query.maxid;
    var st;
  
    var i;
    //console.log(query);
    for(i=queryminid; i<querymaxid; i++){
        var url = 'https://jsonplaceholder.typicode.com/users/'+i;
        request(url, function(err, response, body){
            if(!err && res.statusCode==200){
                var data = JSON.parse(body);
                res.write(data.name);
                
               
            }
            
        });
        
    }
    
    
    
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