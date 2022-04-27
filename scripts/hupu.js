/*
活动链接：https://activity-static.hupu.com/activities/activity-220216-mxk18d8g/index.html?night=0&entrance=1
2021-09-07 10:24
@wenmoux
*/

const axios = require("axios")
var sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
var token;

var pid;
var tid;

function get(url, log) {
    return new Promise(async resolve => {
        try {
            let res = await axios.get(url, {
                headers: {
                    "X-Hupu-Token": token,
                }
            })
            resolve(res.data)
            if (log&&res.data) {
                console.log(res.data)
            }
        } catch (err) {
            console.log(err)
        }
        resolve()
    })
}

function postForm(url,data,log) {
    return new Promise(async resolve => {
        try {
            let res = await axios.post(url, data, {
                headers: {
                    "X-Hupu-Token": token,
                }
            })
            resolve(res.data)
            if (log&&res.data) {
                console.log(res.data)
            }
        } catch (err) {
            console.log(err)
        }
        resolve()
    })
}

function postJson(url,data,log) {
    return new Promise(async resolve => {
        try {
            let res = await axios.post(url, data, {
                headers: {
                    "X-Hupu-Token": token,
                    "Content-Type": "application/json; charset=utf-8"  
                }
            })
            resolve(res.data)
            if (log&&res.data) {
                console.log(res.data)
            }
        } catch (err) {
            console.log(err)
        }
        resolve()
    })
}
async function draw() {
    return await get("https://devbup.hupu.com/api/sign/mang/activity/draw?activityId=1", false)
}
async function getTopicThreads() {
    return await get("https://bbs.mobileapi.hupu.com/1/7.5.51/topics/getTopicThreads?clientId=112179603&crt=1648621333870&night=0&channel=VIVO&sign=4fb71e23d42fad5514de5ddbda6b6631&stamp=0&_ssid=Iua1t%2Be6s%2BWMu%2BS%2FoV81RyI%3D&_imei=811974573551997&time_zone=Asia%2FShanghai&deviceId=BqmlveiA837nhE77kPKE%2FXKk%2B%2FGhJoTmA1yBk23BVdeSS%2B7T08MhulwbUUmIP14bx1s1VsZnMKGT8HtgOhQXEvw%3D%3D&token=NDUwNTIyMDg%3D%7CMTY0ODYyMDY1Nw%3D%3D%7C604551f5c7544cb3675526a2bb38d8e0&tab_type=2&width=517&client=3effcdeb3053c298&topic_id=706&page=1&android_id=3effcdeb3053c298&oaid=0d7378e3de77299a8bd0570c4925ea463b8be88529ae2dd6596b140c2b53c34c", false)
}
async function getsThreadLightReplyList() {
    return await get(`https://bbs.mobileapi.hupu.com/1/7.5.51/threads/getsThreadLightReplyList?fid=5054&clientId=112179603&crt=1645091732229&night=0&channel=VIVO&sign=1391c71aca90f15e1180e67484c53669&_ssid=PHVua25vd24gc3NpZD4%3D&_imei=811974573551997&webp=1&time_zone=Asia%2FShanghai&deviceId=BtpbqkNAO17iTb6SfPZhl7PXcMKzWyNHCmeI2Jy42LUmqoAIEZYpE9qappF%2FfUglm4CKIlwvEBrhjPsfa88PFcw%3D%3D&tid=${tid}&token=NDM0NTA0MzI%3D%7CMTY0NTA5MTY5NA%3D%3D%7C3972a031b98547fa0a0271af3043fd7e&offline=json&topicId=706&client=3effcdeb3053c298&android_id=3effcdeb3053c298&entrance=9&oaid=0d7378e3de77299a8bd0570c4925ea463b8be88529ae2dd6596b140c2b53c34c&order=asc`, false)
}
async function replyLightNew() {
    var data=`fid=5054&clientId=112179603&crt=1645091759509&night=0&channel=VIVO&sign=eedd69c10cb096a84adf2ec5855a1b28&_ssid=PHVua25vd24gc3NpZD4%3D&pid=${pid}&_imei=811974573551997&webp=1&time_zone=Asia%2FShanghai&deviceId=BtpbqkNAO17iTb6SfPZhl7PXcMKzWyNHCmeI2Jy42LUmqoAIEZYpE9qappF%2FfUglm4CKIlwvEBrhjPsfa88PFcw%3D%3D&tid=${tid}&token=NDM0NTA0MzI%3D%7CMTY0NTA5MTY5NA%3D%3D%7C3972a031b98547fa0a0271af3043fd7e&offline=json&puid=89660786&client=3effcdeb3053c298&android_id=3effcdeb3053c298&db_click=0&oaid=0d7378e3de77299a8bd0570c4925ea463b8be88529ae2dd6596b140c2b53c34c`;
    return await postForm(`https://bbs.mobileapi.hupu.com/1/7.5.51/bbslightapi/light/v1/replyLightNew`,data,true)
}
async function recommend() {
    var data={
        "fid": "5054",
        "recommendStatus": "1",
        "tid": tid,
        "clientId": "112179603",
        "crt": "1645091753054",
        "night": "0",
        "channel": "VIVO",
        "client": "3effcdeb3053c298",
        "_ssid": "PHVua25vd24gc3NpZD4=",
        "_imei": "811974573551997",
        "android_id": "3effcdeb3053c298",
        "time_zone": "Asia\/Shanghai",
        "deviceId": "BtpbqkNAO17iTb6SfPZhl7PXcMKzWyNHCmeI2Jy42LUmqoAIEZYpE9qappF\/fUglm4CKIlwvEBrhjPsfa88PFcw==",
        "oaid": "0d7378e3de77299a8bd0570c4925ea463b8be88529ae2dd6596b140c2b53c34c",
        "token": "NDM0NTA0MzI=|MTY0NTA5MTY5NA==|3972a031b98547fa0a0271af3043fd7e",
        "sign": "79f2b7e5a97faae96b9849754929e280"
    }
    return await postJson(`https://bbs.mobileapi.hupu.com/1/7.5.51/bbsintapi/recommend/v1/recommend`,data,true)
}

async function task() {
    let tokens = config.hupu.token;
    token = tokens[0];
    let topic = await getTopicThreads();

    await sleep(2000)
    for(i=0;i<topic.data.list.length;i++){

        tid = topic.data.list[0].tid;
        var reply = await getsThreadLightReplyList();
        if(reply.data.list.length>0){
            pid = reply.data.list[0].pid;
            break;
        }
        await sleep(2000)
      
    }

    await sleep(2000)

    for (let i = 0; i < tokens.length; ++i) {
        token = tokens[i];
        await recommend();
        
        await sleep(2000)
        await replyLightNew();
        await sleep(2000)

        for(n=0;n<=1;n++){
           
        let ret = await draw();
        if(ret&&ret.data){
            console.log(ret.data.prizesInfo); 
        }
        await sleep(2000)
        
        }

    }

}

async function inittask() {

}
//task()

module.exports = task;