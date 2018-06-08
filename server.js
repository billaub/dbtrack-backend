let express = require('express');
let app = express();
let port = 8000;

app.listen(port);
console.log("Dbtrack-backend up and running on port " + port.toString());