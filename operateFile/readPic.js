//读取图片
var http = require('http'),
    fs = require('fs');

http.createServer(function(request, response){
    // 使用二进制方式读取图片
    fs.readFile('./img/test.png', 'binary', function(err, file){
        if( err ) throw err;
        // 当前数据以image/png方式进行输出
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, 'binary');
        response.end();
    });
}).listen(3000);
console.log('server has started...');
