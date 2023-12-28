const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const cors = require('cors');

const app = express();
const http_port = 3000;
const https_port = 443;

app.use(express.json());
app.use(cors({
	origin:''
}));

const {API_VERSION} = require('./config/constants')
//Route Variable
const route_api_main = require(`./src/router`);
app.use(`/api/${API_VERSION}/`,route_api_main);

//SSL
const options = {
	// ca: fs.readFileSync('./SSL/rootCA.key'),
	// key: fs.readFileSync('./SSL/private.key'),
	// cert: fs.readFileSync('./SSL/private.crt')
};

app.get('/', (req, res) => {

	res.send('Hello ICT API!');
});

app.use((err,req,res,next) => {
	console.log(err);
	res.status(404).send("Not Found");
})

app.get('/test',(req,res) => {
	console.log("test");
	console.log(req.protocol);
	res.send("test");
})

http.createServer(app).listen(http_port, ()=>{
	console.log('HTTP Listening Start...')
	console.log(`API SERVER VERSION ${API_VERSION}`)
	
})
https.createServer(options,app).listen(https_port, ()=>{
	console.log('HTTPS Listening Start...\n')
	console.log(`API SERVER VERSION ${API_VERSION}`)
})