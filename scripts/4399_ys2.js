/*
邀请链接：https://yxhhd2.5054399.com/comm/bzyld2/share/index.php?ext=3091185497
2021-09-07 10:24
@wenmoux
*/

const axios = require("axios")
var sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
var sckstatus = true
var strcode = ""
var name = []
var device = config.youlecheng.device
var scookie
const UA = config.youlecheng.UA ? config.youlecheng.UA : "..."

function get(b, p, scookie) {
    return new Promise(async resolve => {
        try {
            let path = "yyxzmb"
            if (p) path = "fulizhongxin2"
            let url = `https://yxhhd2.5054399.com/comm/${path}/ajax.php?ac=${b}&strcode=${strcode}&scookie=${scookie}&device=${device}`
            let res = await axios.get(url, {
                headers: {
                    "User-Agent": UA,
                    "Referer": "https://yxhhd2.5054399.com/2019/fxyxtq2/"
                }
            })
            resolve(res.data)
            if (res.data.msg &&  !res.data.msg.match(/没有此任务/)) {
                console.log("    " + res.data.msg)
            }
        } catch (err) {
            console.log(err)
        }
        resolve()
    })


}

async function dotask(name, code, scookie) {
    strcode = code.match(/strcode=(.+?)\"/)[1]
    gamename = name.match(/《(.+?)》/)[1]
    console.log(gamename + "  " + strcode)
    userinfo = ""
    p = null
    if (code.match(/fulizhongxin2/)) p = 1
    let res = await get("do_init", p, scookie)
    if (res.key == 200) {
        userinfo = `游戏:${gamename}\n道具: ${res.suipian}\n抽奖次数: ${res.cjnum}\n`
        sckstatus = true
        let sres = await get("do_share", p, scookie)

        if (!sres.msg || sres.msg.match(/活动已经结束/)) {} else {
            let sres2 = await get("download_game_init", p, scookie)
            let sres3 = await get("playgame_init", p, scookie)
            let sres4 = await get("log_gametime", p, scookie)

            await sleep(1000 * 60 * 6);
            let sres5 = await get("set_over_game", p, scookie)
            let sres7 = await get("yuyuequan", p, scookie)

            for (i of [1, 2, 3]) {
                let gres = await get("choujiang2", p, scookie)
                if (!gres.msg || gres.msg.match(/抽奖次数不足/)) {
                    break;
                }
            }
            let sres9 = await get("leiji_cj", p, scookie)
            let sres8 = await get("leiji_cj", p, scookie)
        }
    } else console.log(res.msg)

    // console.log(res.uid+"--username:"+res.username);

    return userinfo
}

async function getstrcode() {
    var code = []

    code.push('https://yxhhd2.5054399.com/comm/yyxzmb/index2.php?strcode=MTY="')
    name.push('"<p class=\"p1\">《原神》福利中心<\/p>"')
    console.log("共" + code.length + "游戏 任务待完成")
    return code
}

async function task() {
    if (UA) {
        let cookies = config.youlecheng.scookie;
        let udids = config.youlecheng.udid;
        for (let i = 0; i < cookies.length; ++i) {
            scookie = cookies[i];
            inittask(scookie);
        }
        await sleep(1000 * 60 * 6);
    } else console.log("请先填写你的User-Agent再运行脚本")
}

async function inittask(scookie) {
    yxinfo = "【4399游戏福利社】: \n"
    let codeList = await getstrcode()
    for (k = 0; k < codeList.length; k++) {
        if (sckstatus) dotask(name[k], codeList[k], scookie)

        // let wdjp = await get("myprize", p)
        // console.log(wdjp);
        console.log("\n\n")
    }
    return yxinfo

}
//task()

module.exports = task;