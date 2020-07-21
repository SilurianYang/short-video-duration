const logs = require('logs-dir');

module.exports={
    /**
     * 截取个个小视频点击分享连接后的视频请求地址
     * @param {String} text  个个小视频点击分享连接后的文本
     */
    parseHttptUrl:function(text){
        if(text==null){
            return {code:205,errorMsg:'参数错误，请重新传递'}
        }
        logs.write('address',text);
        const reg=/https?[^\s+]+/g;
        let parseHttptUrl= text.match(reg);
        if(parseHttptUrl==null){
            return {code:204,errorMsg:'提取text中的请求url失败，换个分享连接试试吧'}
        }
        return {code:200,getUrl:parseHttptUrl[0].trim()}
    },
}