var express = require("express");
var bodyParser = require("body-parser");

var app = express();
// config for your database

var config = {
        user: 'xxxxxx',
        password: 'xxxxxxxxx',
        server: 'wsxxxxxho', 
        database: 'EmployeeDB' 
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.port || 3000;
var router = express.Router();

app.use("/api/employee", router);
var sql = require("mssql");

sql.connect(config, function(err) {
    if (err) console.log(err);
});

router.get("/", function (req, res, next) {
        var request = new sql.Request();
        // query to the database and get records
        request.query("select * from  employeemaster", function(err, result, fields){
            if (err) console.log(err);
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result
            }));
        });
});

app.listen(port, function (){
    console.log("Express server running on port %d", port);
});