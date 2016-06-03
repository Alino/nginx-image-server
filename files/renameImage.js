UPLOAD_DIR = "/var/www/nginx/images";

var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var _ = require('lodash');
var fs = require('fs');

http.createServer(function(req, res) {
    if (req.url === '/upload' && req.method === 'POST') {
        // parse a file upload
        var options = {
            uploadDir: UPLOAD_DIR
        };
        var form = new multiparty.Form(options);

        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: JSON.stringify(files)}));
            // give correct name and path to the file
            _.each(files.upload, function(file) {
                if (fields.path != null && fields.path.length > 0) {
                    file.newPath = UPLOAD_DIR + "/" + fields.path[0];
                    fs.rename(file.path, file.newPath, function (err) {
                        console.error(err);
                    });
                }
            })
        });


        return;
    }

    // show a file upload form
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="text" name="path"><br>'+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
}).listen(8091);