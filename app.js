const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const NodeCouchDb = require("node-couchdb");

const couch = new NodeCouchDb({
    auth:{
        user:'admin',
        password: 'admin'
    }
});

const dbname = "users";
const viewURL = "_design/view/_view/all";

couch.listDatabases().then(function(dbs){
    console.log(dbs);
})

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use( express.static( "assets" ) );

app.get('/dashboard_police',function(req,res){
    couch.get(dbname,viewURL).then(function(data,headers,status){
        console.log(data.data.rows);
        res.render('dashboard_police',{
            users:data.data.rows,
        })
    },function(err){
        res.send(err);
    })
});

app.get('/dashboard_bank',function(req,res){
    couch.get(dbname,viewURL).then(function(data,headers,status){
        console.log(data.data.rows);
        res.render('dashboard_bank',{
            users:data.data.rows,
        })
    },function(err){
        res.send(err);
    })
});

app.get('/dashboard_user',function(req,res){
    couch.get(dbname,viewURL).then(function(data,headers,status){
        console.log(data.data.rows);
        res.render('dashboard_user',{
            users:data.data.rows,
        })
    },function(err){
        res.send(err);
    })
});

app.get('/dashboard_hospital',function(req,res){
    couch.get(dbname,viewURL).then(function(data,headers,status){
        console.log(data.data.rows);
        res.render('dashboard_hospital',{
            users:data.data.rows,
        })
    },function(err){
        res.send(err);
    })
});

app.get('/login',function(req,res){
    couch.get(dbname,viewURL).then(function(data,headers,status){
        console.log(data.data.rows);
        res.render('login',{
            users:data.data.rows,
        })
    },function(err){
        res.send(err);
    })
});

app.listen(3000, function(){
    console.log("server started on port 3000");
});