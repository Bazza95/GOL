const fetch = require('node-fetch');

exports.sendRequest = (x,y,callback) => {
    const rootURL = 'http://localhost:8080/room/';
    let grid = x+"/"+y;
    fetch(rootURL+grid, {
        method: "GET",
    }).then(function(response){
        let contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        }
        return new TypeError("Oops, we haven't got JSON!");
    }).then(function(res){
        callback(res);
    }).catch(function(error){
        throw new Error("Something went wrong... " + error);
    });
};