/*
4399游戏盒游乐豆任务
等我攒够288开会员再写会员任务
邀请链接：https://yxhhd2.5054399.com/comm/bzyld2/share/index.php?ext=3091185497
2021-09-07 10:24
@wenmoux
ylc信息，可查看游乐豆
https://yxhhd2.5054399.com/youlecheng/app/?ctl=vip&act=ajaxInit&device=a8b1a3846a7c622a&sm_device=202103182141519806b8fa44f1fde792790213d257e63101c26fd926853b25&scookie=0%7C3664760350%7C3db6f66e4304d2fb743dafc92bf12e06%7C195414862%7C37b6bbc41cb8804f1c42ccb7b43cb4c7%7C3664760350、

开通vip链接
https://yxhhd2.5054399.com/youlecheng/app/?ctl=vip&act=join&device=a8b1a3846a7c622a&sm_device=202103182141519806b8fa44f1fde792790213d257e63101c26fd926853b25&scookie=0%7C3664760350%7C3db6f66e4304d2fb743dafc92bf12e06%7C195414862%7C37b6bbc41cb8804f1c42ccb7b43cb4c7%7C3664760350
*/

const axios = require("axios")
var sckstatus = false
var vip = 0
const device = config.youlecheng.device
var scookie 
const SMid = config.youlecheng.SMid
const UA = config.youlecheng.UA ? config.youlecheng.UA : "..."
var sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function get(a, b, log) {
    return new Promise(async resolve => {
        try {
            ac = "ac"
            aj = "ajax.php"
            if (a == "comm/ylddb") aj = "ajax2.php"
            else if (a == "youlecheng") {aj = "app";ac = "act";}
            let url = `https://yxhhd2.5054399.com/${a}/${aj}?${ac}=${b}&scookie=${scookie}&device=${device}`
            let res = await axios.get(url, {
                headers: {
                    "User-Agent": UA,
                    "Referer": "https://yxhhd2.5054399.com/2019/fxyxtq2/"
                }
            })
            resolve(res.data)
            if (!log) {
                console.log("    " + (res.data.status_code || res.data.msg))
            }
        } catch (err) {
            console.log(err)
        }
        resolve()
    })
}

//查询游乐豆
async function getinfo() {
    let res = await get("youlecheng", "recordInfo&ctl=ucenter", 1)
    if (res.userinfo) {
        info = res.userinfo
        userinfo = `昵称:${info.username}\n游乐豆: ${info.myYld}`
        vip = info.vip
        sckstatus = true
    } else userinfo = res.msg
    console.log(userinfo)
    return userinfo
}
async function getyxid() {
    let res = await axios.get(`https://yxhhd2.5054399.com/2019/fxyxtq2/`, {
        responseType: "arraybuffer"
    })
    resdata = require("iconv-lite").decode(res.data, "gbk")
    let id = resdata.match(/data-id=\"\d+\" data-name=\".+?\"/g)
    console.log("获取分享游戏信息成功 总游戏数 ：" + id.length)
    if (id) return id
    else return []
}

//分享游戏
async function share() {
    let ids = await getyxid()
    for (str of ids) {
        yxid = str.match(/data-id=\"(\d+)\"/)[1]
        yxname = str.match(/data-name=\"(.+?)\"/)[1]
        console.log("开始分享游戏：" + yxname)
        let shareres = await get("2019/fxyxtq2", `shareOver&id=${yxid}`)
        await sleep(1500)
    }
    await get("2019/fxyxtq2", "getprize")
}


async function task() {
    if (UA) {
        let cookies = config.youlecheng.scookie;
        let udids = config.youlecheng.udid;
        for (let i = 0; i < cookies.length; ++i) {
            scookie = cookies[i];
            await inittask();
        }
    } else console.log("请先填写你的User-Agent再运行脚本")
}

async function inittask() {
        await getinfo()
        if (sckstatus) {
            if (vip == 1) {
                console.log("去做vip每日任务")
                console.log("  签到中")
                await get("youlecheng", "signIn&ctl=vip")
                let gres = await axios.get("https://yxhhd2.5054399.com/youlecheng/app/?ctl=list&type=typeid&typeid=2")
                let gids = gres.data.match(/giftid=\"(\d+)\"/g)
                console.log("  vip浏览任务 ")
                for (g = 0; g < 7; g++) await get("youlecheng", `ajaxInit&ctl=detail&id=${gids[g].match(/\d+/)[0]}`)
                await get("youlecheng", "uidViewGift&ctl=vip")
                await sleep(2000)
            }
            await get("comm/bzyld2", "sub_yqm&yqm=3091185497&SMid=" + SMid)
            // var mres = await axios.get(
            //     "https://cdn.jsdelivr.net/gh/Wenmoux/sources/other/ylcml.json"
            // );
            // await get("comm/bzyld2", `sub_zb_kouling&klid=32&kl=${encodeURI(mres.data.smkl)}`); //)主播 神秘口令
            // await get("comm/bzyld2", `sub_kouling&kl=${mres.data.zskl}`); //)主播 神秘口令
            await get("comm/bzyld2", "share_total", true); //每日分享
            await get("comm/bzyld2", "n_task11")
            await sleep(1500)
            let fxres = await get("2019/fxyxtq2", "init", true)
            if (fxres.box3 == 2) console.log("分享宝箱已领完,跳过任务")
            else await share()
            //游乐豆转盘
            await get("comm/ylddb", "played", true)
            await get("comm/ylddb", "playshow", true)
            // let zpres = await get("comm/ylddb", "sharesuccess&res=1&type=3")
            // if (zpres.chances && zpres.chances > 0) {
            //     let lotteryres = await get("comm/ylddb", "lottery", true)
            //     console.log("恭喜您抽中了：" + lotteryres.prizetitle)
            // }

        }
        let userinfo = "【4399疯狂游乐城】:\n" + await getinfo()
        return userinfo
}

module.exports = task;