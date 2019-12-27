/**
 * Created by dongxiaohong on 2016/10/29.
 */
var express = require('express');
var http = require("http");
var fs = require("fs");
var path = require("path");
var app = express();
// var buffer = new buffer(0);
// var personfile = path.resolve("person.txt");
// var prizefile = path.resolve("prize.txt");
// var winnersfile = path.resolve("winners.txt");
// console.log(personfile +'\n'+ prizefile +'\n'+ winnersfile);
http.createServer(function (require, response) {
    var pathname = _dirname + url.parse(require.url).pathname;
    if(path.extname(pathname) == "") {
        pathname += "/";
    }
    if(pathname.charAt(pathname.length - 1) == "/") {
        pathname += "index.html"
    }
    fs.exists(pathname, function (exists) {
        if(exists) {
            switch(path.extname(pathname)){
                case ".html":
                    response.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case ".js":
                    response.writeHead(200, {"Content-Type": "text/javascript"});
                    break;
                case ".css":
                    response.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case ".gif":
                    response.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case ".jpg":
                    response.writeHead(200, {"Content-Type": "image/jpg"});
                    break;
                case ".png":
                    response.writeHead(200, {"Content-Type": "image/png"});
                    break;
                default:
                    response.writeHead(200, {"Content-Type": "application/octet-stream"});
            }
            fs.readFile(pathname, {encoding:'utf-8'}, function (error, data) {
                if(error) throw error;
                response.end(data)
            })
        }else {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.end("<h1>404</h1>");
        }
    })
}).listen(8080, "127.0.0.1");
console.log("Server running at http://127.0.0.1:8080/");
