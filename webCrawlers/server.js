var request = require('request'),
    cheerio = require('cheerio');

request('https://cnodejs.org/?_t='+Date.now(), function(err, response, body){
    if( !err && response.statusCode == 200 ){
        var $ = cheerio.load(body);

        var data = [];
        $('#topic_list .cell').each(function(){
            var $this = $(this);

            // 使用trim去掉数据两端的空格
            data.push({
                title : trim($this.find('.topic_title').text()),
                url : trim($this.find('.topic_title').attr('href')),
                author : trim($this.find('.user_avatar img').attr('title')),
                reply : trim($this.find('.count_of_replies').text()),
                visits : trim($this.find('.count_of_visits').text())
            })
        });
        // console.log( JSON.stringify(data, ' ', 4) );
        console.log(data);
    }
});

// 删除字符串左右两端的空格
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}