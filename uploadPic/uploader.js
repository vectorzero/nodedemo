var formidable = require('formidable'),
    util = require('util'),
    fs = require('fs');

function upload(request, response){
    if( request.method.toLowerCase()=='post' ){
        var form = new formidable.IncomingForm();

        form.uploadDir = './tmp/';
        form.parse(request, function(err, fields, files) {
            var oldname = files.upload.name,
                newname = Date.now() + oldname.substr(oldname.lastIndexOf('.'));
            fs.renameSync(files.upload.path, "./img/"+newname ); // 同步上传图片
            var s = '<p><a href="/">back!</a></p><p><img src="/show?src='+newname+'" /></p>'; // 显示刚才的图片
            response.writeHead(200, {'content-type': 'text/html'});
            response.write(s);
            response.end();
        });
        return;
    }
}
exports.upload = upload;