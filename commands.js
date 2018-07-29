#!/usr/bin/env node

const comm = require('commander');
const {sendRequest} = require('./action');

// Sets how to get version info
comm
    .version('0.0.1', '-v, --version');

// Main command orchestrator
comm
    .command('move')
    .alias('m')
    .allowUnknownOption(false)
    .description('Move the player')
    .option('-n, --north', 'Move north')
    .option('-e, --east', 'Move east')
    .option('-s, --south', 'Move south')
    .option('-w, --west', 'Move west')
    .action(function (dir, opt) {
        if(dir.north){
            console.log("Moved north");
            sendRequest(0,1,(x) => output(x));
        }else if(dir.east){
            console.log("Moved east");
            sendRequest(1,0,(x) => output(x));
        }else if(dir.south){
            console.log("Moved south");
            sendRequest(0,-1,(x) => output(x));
        }else if(dir.west){
            console.log("Moved west");
            sendRequest(-1,0,(x) => output(x));
        }else {
            console.log("Please select an option...");
            comm.help();
        }
    });

// In the case the command doesn't exist
comm.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', comm.args.join(' '));
    process.exit(1);
});

comm.parse(process.argv);

// If no command line args are passed
const NO_COMMAND_SPECIFIED = comm.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
    comm.help();
}

// Outputs response to user
const output = (res) => {
    let outcome = "";
    let pos = " You are at "+res.ords[0]+","+res.ords[1]+".";
    if(res.status === "DEAD"){
        outcome = "You were just attacked by a monster... and DIED. You scored "+res.score+" points."+
            " Run a command to play again!";
    }else if(res.status === "MONSTER"){
        outcome = "You were just attacked by a monster! You have "+res.lives+" lives left."+pos;
    }else{
        outcome = "You just found GOLD! You have "+res.score+" points."+pos;
    }
    console.log(outcome);
};
