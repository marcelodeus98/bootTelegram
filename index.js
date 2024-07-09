const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let PORT = 3000;

// Use body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 
app.get('/', (req, res) => {
    res.send('Welcome');
});

// Connect server
app.listen(PORT, (err) => {
    if(err){
        console.log('Error, is not loading server...');
    }
    else {
        console.log(`Server is runing, in port ${PORT}...`);
    }
});