import express from 'express';
import Tedious from 'tedious';

const Connection = Tedious.Connection;
const app = express();

var config = {  
    server: 'DESKTOP-TTB46DU',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'khoaf', //update me
            password: 'khoaf'  //update me
        }
    },
};  
var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.
        console.log("Connected");  
    });
    
    connection.connect();


//listner
const PORT = 3000;
app.listen(PORT);