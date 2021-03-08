const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const router = require('./routes/route');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, Access-Control-Allow-Methods, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
// });
app.use('/', router);

const server = http.createServer(app);
server.listen(port);