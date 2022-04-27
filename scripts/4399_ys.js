/*
邀请链接：https://yxhhd2.5054399.com/comm/bzyld2/share/index.php?ext=3091185497
2021-09-07 10:24
@wenmoux
*/

const axios = require("axios")
var sckstatus = true
var strcode = ""
var name = []
var device = config.youlecheng.device
var scookie
const UA = config.youlecheng.UA ? config.youlecheng.UA : "..."

function get(b, path, log, append) {
    return new Promise(async resolve => {
        try {
            let url = `https://yxhhd2.5054399.com/2022/${path}/ajax.php?ac=${b}&strcode=${strcode}&scookie=${scookie}&device=${device}${append}`
            let res = await axios.get(url, {
                headers: {
                    "User-Agent": UA,
                    "Referer": "https://yxhhd2.5054399.com/2019/fxyxtq2/"
                }
            })
            resolve(res.data)
            if (log && res.data.msg && !res.data.msg.match(/没有此任务/)) {
                console.log("    " + res.data.msg)
            } else if (res.data && log) {
                console.log(res.data);
            }
        } catch (err) {
            console.log(err)
        }
        resolve()
    })
}

function post(log) {
    return new Promise(async resolve => {
        try {
            let url = "https://yxhhd2.5054399.com/2022/ysyzn2/ajax.php"
            let data = `ac=init&scookie=${scookie}&device=${device}`
            let res = await axios.post(url, data, {
                headers: {
                    "User-Agent": UA,
                    "Referer": "https://yxhhd2.5054399.com/2022/ysyzn2/?hduuid=edq384pdx&id=176726"
                }
            })
            resolve(res.data)
            if (res.data.msg && log) {
                console.log(res.data.msg)
            } else if (res.data.key) {
                if (res.data.key == "nologin") ckstatus = false
                console.log(res.data.key)
            } else if (res.data && log) {
                console.log(res.data);
            }
        } catch (err) {
            console.log(err)
        }
        resolve()
    })
}

async function lottery() {
    return await get("lottery", 'ysyzn2', true, '&sm_id=202103182141519806b8fa44f1fde792790213d257e63101c26fd926853b25')
}
async function submitCode(submit_code) {
    return await get("submitCode", 'ysyzn2', true, `&submit_code=${submit_code}`)
}
async function doTask(tid) {
    return await get("doTask", 'ysyzn2', true, `&tid=${tid}`)
}
async function finishInviteTask() {
    return await get("finishInviteTask", 'ysyzn2', true, ``)
}
async function userPrizes() {
    return await get("userPrizes", 'ysyzn2', true, ``)
}
async function getInfo() {
    return await post(true)
}

async function task() {
    if (UA) {
        let cookies = config.youlecheng.scookie;
        let udids = config.youlecheng.udid;
        console.log("【4399游戏原神集卡】: \n")
        // for (let i = 0; i < cookies.length; ++i) {

        //     // 
        //     scookie = cookies[i];
        //     // device="2021"+(Math.round(Math.random()*90000)+10000); 
        //     device = cookies[i].split("|")[1];
        //     await getInfo();
        //     let ret;
        //     if (cookies.length - i == 1) {
        //         let code = cookies[0].split("|")[1];
        //         ret = await submitCode(code)
        //     } else {
        //         let code = cookies[i + 1].split("|")[1];
        //         ret = await submitCode(code)
        //     }
        //     if (!ret.msg || ret.msg.match(/已经参加/)) {
        //         continue;
        //     }
        //     for (var j = 1; j < 4; j++) {
        //         await doTask(j);
        //     }

        //     for (var j = 0; j < 10; j++) {
        //         ret = await lottery();
        //         console.log(ret);
        //         if (!ret.msg || ret.msg.match(/抽卡次数不足/)) {
        //             break;
        //         }
        //     }

        // }


        for (let i = 0; i < cookies.length; ++i) {
            scookie = cookies[i];
            device = cookies[i].split("|")[1];
            // await finishInviteTask()

            let ret = await userPrizes();
            console.log(ret);
        }
    } else console.log("请先填写你的User-Agent再运行脚本")
}

async function inittask() {

}
//task()

module.exports = task;