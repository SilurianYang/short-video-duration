const http = require('superagent');

const time=+new Date();
const url=`https://search.amemv.com/aweme/v1/search/item/?app_name=douyin_lite&version_name=11.2.0&ssmix=a&_rticket=${time}&ts=${parseInt(time/1000)-1}&manifest_version_code=110200&device_type=MI%205s&language=zh&uuid=553690856263286&device_id=57917087728&app_name=douyin_lite&device_platform=android&aid=2329`

http.post(url).set({
    'User-Agent': 'com.ss.android.ugc.aweme.lite/110200 (Linux; U; Android 8.0.0; zh_CN; MI 5s; Build/OPR1.170623.032; Cronet/TTNetVersion:4df3ca9d 2019-11-25)',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie':' passport_csrf_token=5cf48f28feb96b1cd4f3d58eeabc7d55; install_id=791254098775085; ttreq=1$3b432d872664b2f51399d4b00f8ff9945922e46a; d_ticket=5695d61c06979fed3018109daa6f7acdc60b1; odin_tt=6f4a91cd11e373bd195ee891bb4c8e8b3ceb8da43609a63c6118f24a901320449cac4f8778767d3c516072596e9342f39488110ea81559bbcd70382d1485d8b3; sid_guard=9bac05c89ea1b4ea2d08c82f356ccdc2%7C1598240668%7C5184000%7CFri%2C+23-Oct-2020+03%3A44%3A28+GMT; uid_tt=4ca4e0bc347672a316ef3e91150e42b5; uid_tt_ss=4ca4e0bc347672a316ef3e91150e42b5; sid_tt=9bac05c89ea1b4ea2d08c82f356ccdc2; sessionid=9bac05c89ea1b4ea2d08c82f356ccdc2; sessionid_ss=9bac05c89ea1b4ea2d08c82f356ccdc2'
}).send({
    keyword:'再见青春',
    offset:0,
    count:10,
    source:'video_search',
    is_pull_refresh:1,
    hot_search:0,
    search_id:'',
    query_correct_type:1,
    is_filter_search:0,
    is_filter_search:0,
    publish_time:0,
}).then(res=>{
    console.log(res.body)
}).catch(err=>{
    console.log(err)
})
