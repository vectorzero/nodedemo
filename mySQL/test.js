var mysql = require('mysql');
// 创建连接
var conn = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '123',
    database : 'test'
});

// 创建连接后不论是否成功都会调用
conn.connect(function(err){
    if(err) throw err;
    console.log('connect success!');
});

// 其他的数据库操作，位置预留

// 关闭连接时调用
conn.end(function(err){
    if(err) throw err;
    console.log('connect end');
});