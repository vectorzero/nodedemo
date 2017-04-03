var fs = require('fs'),
    url = require('url');

function show(request, response){
    var query = url.parse(request.url, true).query,
        imgurl = query.src;

    // 读取图片并进行输出
    // 这里读取链接中的src参数，指定读取哪张图片  /show?src=1484234660592.png
    fs.readFile('./img/'+imgurl, "binary", function(err, file){
        if(err) throw err;
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    })
}
exports.show = show;