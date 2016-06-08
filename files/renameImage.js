const UPLOAD_DIR = "/var/www/nginx/images";
// const UPLOAD_DIR = "/Users/alino/Meteor/kukni.to/.docker/nginx-image-server/files";
const PORT = 8091;


var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    var html = '<html><body><form method="post" action="http://localhost:'+PORT+'">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
    // var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

app.post('/upload', function(req, res) {
    // console.log(req);
    console.dir(req.body);

    // save the file
    const base64Data = req.body.file.replace(/^data:image\/(png|gif|jpeg);base64,/,'');
    const filePath = req.body.path;
    const fileName = req.body.filename;
    const fileDir = path.join(UPLOAD_DIR, filePath);
    const fullPath = path.join(UPLOAD_DIR, filePath, fileName);
    mkdirp(fileDir, function (err) {
        if (err) console.error(err);
        else {
            console.log('created dirs for path: ', fileDir);
            fs.writeFile(fullPath, new Buffer(base64Data, 'base64'), function (err) {
                if (err) console.error(err);
                else {
                    console.log('written image to path: ', fullPath);
                }
            });
        }
    });


    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
});

app.listen(PORT);
console.log('Listening at http://localhost:' + PORT);