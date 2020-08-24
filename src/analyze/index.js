const ffmpeg = require('../ffmpeg');
const http = require('superagent');
const logs = require('logs-dir');
const getPlatFormConfig = require('../base');


function getVideoTotalDuration(videoPath) {
    return new Promise(resolve=>{
        ffmpeg.ffprobe(videoPath, (error, metadata) => {
            if(error){
                logs.write('error',error);
                return resolve({code:202,errorMsg:error})
            }
            const duration = metadata.format.duration;
            return resolve({code:200,duration});
          });
    })
}

function getDuration(path){
    return new Promise(resolve=>{
        const shareConfig=getPlatFormConfig(path);
        if(shareConfig==null){
            return resolve({code:206,errorMsg:`此平台目前还不支持，请继续关注！`});
        }
        http.get(path)
        .set({
            'User-Agent': shareConfig.userAgent,
        })
        .then(async (res) => {
            const playUrl= await shareConfig.callFun(res);
            if(playUrl===false){
                const errorMsg=`获取 ${path} 失败！匹配视频连接为 null`;
                logs.write('error', errorMsg);
                return resolve({code:201,errorMsg})
            }
            const durationJson = await getVideoTotalDuration(playUrl);
            resolve(durationJson);
        })
        .catch((err) => {
            const errorMsg=`获取 ${path} 失败！连接无法访问`;
            logs.write('error', err);
            resolve({code:203,errorMsg});
        });
    })
}

module.exports=getDuration;
