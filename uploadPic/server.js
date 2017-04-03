var http = require('http'),
    url = require('url'),
    starter = require('./starter'),
    shower = require('./shower'),
    uploader = require('./uploader');

http.createServer(function(request, response){
    var pathname = url.parse(request.url).pathname;
    var routeurl = {
        '/' : starter.start,
        '/upload' : uploader.upload,
        '/show' : shower.show // 添加
    }

    if( typeof routeurl[pathname]=== 'function' ){
        routeurl[pathname](request, response);
    }else{
        console.log('404 not found!');
        response.end();
    }
}).listen(3000);
console.log('server has started...');