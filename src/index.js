const bodyParser = require('body-parser')
const express = require('express');
const util=require('./reg');
const getDuration=require('./analyze')
const app=new express();

app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.post('/getDuration', async function (req, res) {
    const {code,getUrl,errorMsg}=util.parseHttptUrl(req.body.text);
    if(code!==200){
        return res.json({errorMsg,code})
    }
    const infoJson= await getDuration(getUrl);
    res.json(infoJson)
})
app.listen(1234,function(){
    console.log('程序准备就绪，开始造吧.......')
})

//console.log(getVideoTotalDuration(''))
