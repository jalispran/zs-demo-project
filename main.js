const expressConfig = require('./config/expressConfig');
const jwt = require('./jwt-module/jwt-module');

var user = {
    "name" : "pranjal",
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

app.get('/jwt',function(req, res){
    var name = req.param('name');
    console.log('name : ' + name);
    var token = jwt.sign({'partyName':name}, {'issuer':'jalispran',
                                'subject':'just for fun',
                                'audience':name + ' ' + name});
    res.end(token);
})