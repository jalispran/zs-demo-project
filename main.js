const expressConfig = require('./config/expressConfig');

var user = {
    "name" : "mohit",
    "password" : "password4",
    "profession" : "teacher",
    "id": 4
 }
var app = expressConfig();

app.get('/single-user', function (req, res) {
    res.end(JSON.stringify(user));
})

app.get('/list-users', function(req, res){
    var array = [];
    for(var i = 0; i<5; i++){
        array.push(user);
    }
    res.end(JSON.stringify(array));
})