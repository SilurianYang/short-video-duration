const logs = require('logs-dir');
const http = require('superagent');
const url = require('url');

const platformToogle={
    'v.kuaishou.com':{  //快手
        callFun:function({text}){
            return new Promise(resolve=>{
                const reg=/(?<="playUrl"[\s]*:[\s]*")[^,]+(?=",)/i;
                let playUrl = text.match(reg);
                if (playUrl == null) {
                    return resolve(false);           
                }
                playUrl=playUrl[0].replace(/\\u002F/g,'/');
                return resolve(playUrl)
            })
        },
        userAgent:`Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11`
    },
    'v.douyin.com':{
        callFun:function({redirects}){
            return new Promise(resolve=>{
                const item_ids=url.parse(redirects[0]).pathname.replace(/^\/|\/$/g, '').split('/')[2];
                http.get(`https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${item_ids}&dytk=`).set({
                    'User-Agent': this.userAgent,
                }).then(res=>{
                    try {
                       let playUrl= res.body.item_list[0].video.play_addr.url_list[0];
                       return resolve(playUrl);
                    } catch (error) {
                        return resolve(false); //解析失败  可能结构变了
                    }
                }).catch(err=>{
                    resolve(false);
                })
            })
        },
        userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    }
}

/**
 * 针对性的获取小视频的请求配置
 * @param {String} shareURL 小视频分享出来的连接
 */
function getPlatFormConfig(shareURL){
    for(let [key,value] of Object.entries(platformToogle)){
        if(shareURL.includes(key)){
            return value;
        }
    }
    return null;
}

module.exports=getPlatFormConfig;