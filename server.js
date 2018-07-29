const express = require('express');
const app = express();

// Would typically store this within a db or some other more complex state management package
let room = {status:"",score:0,lives:5,ords:[0,0]};

// Primitive function that gives the player a pseudo-random 2/3 chance of getting gold
const randomRoom = () => {
    room.status = (Math.floor(Math.random() * (1000000))+1) %3 === 2 ? "MONSTER" : "GOLD";
    if(room.status === "GOLD"){
        room.score += 1;
    }else {
        room.lives -= 1;
    }
    if(room.lives === 0){
        room.status = "DEAD";
    }
    return room;
};

const clearState = () => {
    room = {status:"",score:0,lives:5,ords:[0,0]};
    console.log("Data cleared.")
};

// responds when a GET request is made
app.get('/room/:x/:y', function (req, res) {
    let x = parseInt(req.params.x);
    let y = parseInt(req.params.y);
    console.log(x,y);
    // If we move east or west
    if(x !== 0){
        room.ords[0] = room.ords[0] + x;
    }else { // If we move north or south
        room.ords[1] = room.ords[1] + y;
    }
    let resp = JSON.stringify(randomRoom());
    if(room.status === "DEAD"){
        clearState();
    }
    res.type('json');
    res.status(200).send(resp);
});

// Just a root endpoint for testing
app.get('/', function (req, res) {
    res.status(200).send("There is nothing at this endpoint.");
});

app.use(function(req, res) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// Main server
let server = app.listen(8080, function() {
    console.log('Welcome to the game of life!');
});

if(!module.parent){ app.listen(port); }

module.exports = server;