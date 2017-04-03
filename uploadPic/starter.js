function start(request, response){
	var html = '<html>\
        <head>\
        <meta charset=UTF-8" />\
        </head>\
        <body>\
        <form action="/upload" method="post" enctype="multipart/form-data">\
        <p>file : <input type="file" name="upload" multiple="multiple" /></p>\
        <p><input type="submit" value="submit" name="submit" /></p>\
        </form>\
        </body>\
        </html>';

	response.writeHead(200, {"Content-Type":"text/html"});
	response.write( html );
	response.end();
}
exports.start = start;