// 配置区
const USERNAME = "你的网络账号";   // <--- 填入NetID
const PASSWORD = "你的密码";       // <--- 校园网密码
const GW_LIST = ["IP1", "IP2"]; // <--- 活跃网关IP列表
const MAX_RETRIES = 3;            // <--- 最大重试次数


function s(a, b) { var c = a.length, v = []; for (var i = 0; i < c; i += 4) { v[i >> 2] = a.charCodeAt(i) | a.charCodeAt(i + 1) << 8 | a.charCodeAt(i + 2) << 16 | a.charCodeAt(i + 3) << 24; } if (b) v[v.length] = c; return v; }
function l(a, b) { var d = a.length, c = (d - 1) << 2; if (b) { var m = a[d - 1]; if ((m < c - 3) || (m > c)) return null; c = m; } for (var i = 0; i < d; i++) { a[i] = String.fromCharCode(a[i] & 0xff, a[i] >>> 8 & 0xff, a[i] >>> 16 & 0xff, a[i] >>> 24 & 0xff); } return b ? a.join('').substring(0, c) : a.join(''); }
function xEncode(str, key) { if (str == "") return ""; var v = s(str, true), k = s(key, false); if (k.length < 4) k.length = 4; var n = v.length - 1, z = v[n], y = v[0], c = 0x86014019 | 0x183639A0, m, e, p, q = Math.floor(6 + 52 / (n + 1)), d = 0; while (0 < q--) { d = d + c & (0x8CE0D9BF | 0x731F2640); e = d >>> 2 & 3; for (p = 0; p < n; p++) { y = v[p + 1]; m = z >>> 5 ^ y << 2; m += (y >>> 3 ^ z << 4) ^ (d ^ y); m += k[(p & 3) ^ e] ^ z; z = v[p] = v[p] + m & (0xEFB8D130 | 0x10472ECF); } y = v[0]; m = z >>> 5 ^ y << 2; m += (y >>> 3 ^ z << 4) ^ (d ^ y); m += k[(p & 3) ^ e] ^ z; z = v[n] = v[n] + m & (0xBB390742 | 0x44C6F8BD); } return l(v, false); }
function base64Encode(str) { var chars = 'LVoJPiCN2R8G90yg+hmFHuacZ1OWMnrsSTXkYpUq/3dlbfKwv6xztjI7DeBE45QA', out = ''; for (var i = 0; i < str.length; i += 3) { var c1 = str.charCodeAt(i) & 0xFF, c2 = i + 1 < str.length ? str.charCodeAt(i + 1) & 0xFF : 0, c3 = i + 2 < str.length ? str.charCodeAt(i + 2) & 0xFF : 0; out += chars.charAt(c1 >> 2) + chars.charAt(((c1 & 3) << 4) | (c2 >> 4)) + (i + 1 < str.length ? chars.charAt(((c2 & 15) << 2) | (c3 >> 6)) : '') + (i + 2 < str.length ? chars.charAt(c3 & 63) : ''); } var pad = str.length % 3; if (pad == 1) out += "=="; else if (pad == 2) out += "="; return out; }

var chrsz = 8; var hexcase = 0;
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function hex_sha1(s) { return binb2hex(core_sha1(str2binb(s), s.length * chrsz)); }

function core_md5(x, len) {
    x[len >> 5] |= 0x80 << ((len) % 32); x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a, oldb = b, oldc = c, oldd = d;
        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936); d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586); c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819); b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897); d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426); c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341); b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416); d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417); c = md5_ff(c, d, a, b, x[i + 10], 17, -42063); b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682); d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101); c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290); b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510); d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632); c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713); b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691); d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083); c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335); b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438); d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690); c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961); b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467); d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784); c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473); b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558); d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463); c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562); b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060); d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353); c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632); b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174); d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222); c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979); b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487); d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835); c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520); b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844); d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415); c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905); b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571); d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606); c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523); b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359); d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744); c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380); b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070); d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379); c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259); b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safe_add(a, olda); b = safe_add(b, oldb); c = safe_add(c, oldc); d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
}
function md5_cmn(q, a, b, x, s, t) { return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b); }
function md5_ff(a, b, c, d, x, s, t) { return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t); }
function md5_gg(a, b, c, d, x, s, t) { return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t); }
function md5_hh(a, b, c, d, x, s, t) { return md5_cmn(b ^ c ^ d, a, b, x, s, t); }
function md5_ii(a, b, c, d, x, s, t) { return md5_cmn(c ^ (b | (~d)), a, b, x, s, t); }
function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) { ipad[i] = bkey[i] ^ 0x36363636; opad[i] = bkey[i] ^ 0x5C5C5C5C; }
    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}
function core_sha1(x, len) {
    x[len >> 5] |= 0x80 << (24 - len % 32); x[((len + 64 >> 9) << 4) + 15] = len;
    var w = Array(80), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, e = -1009589776;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a, oldb = b, oldc = c, oldd = d, olde = e;
        for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j]; else w[j] = bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d; d = c; c = bit_rol(b, 30); b = a; a = t;
        }
        a = safe_add(a, olda); b = safe_add(b, oldb); c = safe_add(c, oldc); d = safe_add(d, oldd); e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);
}
function sha1_ft(t, b, c, d) { if (t < 20) return (b & c) | ((~b) & d); if (t < 40) return b ^ c ^ d; if (t < 60) return (b & c) | (b & d) | (c & d); return b ^ c ^ d; }
function sha1_kt(t) { return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514; }
function safe_add(x, y) { var lsw = (x & 0xFFFF) + (y & 0xFFFF); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xFFFF); }
function bit_rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)); }
function str2binl(str) { var bin = Array(), mask = (1 << chrsz) - 1; for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32); return bin; }
function str2binb(str) { var bin = Array(), mask = (1 << chrsz) - 1; for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32); return bin; }
function binl2hex(binarray) { var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", str = ""; for (var i = 0; i < binarray.length * 4; i++) { str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF); } return str; }
function binb2hex(binarray) { var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", str = ""; for (var i = 0; i < binarray.length * 4; i++) { str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF); } return str; }

// Scriptable 原生休眠函数
function sleep(ms) {
    return new Promise(resolve => {
        let t = new Timer();
        t.timeInterval = ms;
        t.repeats = false;
        t.addAction(resolve);
        t.schedule();
    });
}

async function main() {
    let targetGw = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        console.log(`\n--- 🏹 第 ${attempt} 次探测与认证 ---`);

        try {
            let captiveReq = new Request("http://captive.apple.com/hotspot-detect.html");
            captiveReq.timeoutInterval = 2;
            let captiveRes = await captiveReq.loadString();
            if (captiveRes.includes("Success")) {
                console.log("🎉 外网已打通，设备已在线，无需重复认证！");
                if (attempt > 1) {
                    let n = new Notification(); n.title = "网络已恢复通畅"; n.body = "已无感越过网关阻断"; n.schedule();
                }
                Script.complete();
                return;
            }
        } catch (e) {
            console.log("🔍 设备处于离线状态，准备启动雷达索敌...");
        }

        for (let gw of GW_LIST) {
            try {
                let probe = new Request(`http://${gw}`);
                probe.timeoutInterval = 1.5;
                await probe.loadString();
                targetGw = gw;
                break;
            } catch (e) { }
        }

        if (!targetGw) {
            console.log("⚠️ 未发现可用网关，当前 Wi-Fi 物理连接可能尚未稳固");
            if (attempt < MAX_RETRIES) { await sleep(2000); continue; }
            else { break; }
        }

        const ts = Date.now() + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const cb = "jQuery1124_" + ts;
        const userEnc = encodeURIComponent(USERNAME);
        let clientIp = "";

        // 请求 Challenge Token 并拦截 AC 劫持

        let reqChall = new Request(`http://${targetGw}/cgi-bin/get_challenge?callback=${cb}&username=${userEnc}&ip=&_=${ts}`);
        reqChall.timeoutInterval = 3;
        let resChall = "";
        try {
            resChall = await reqChall.loadString();
        } catch (e) {
            console.log("⚠️ 获取 Token 接口超时或无响应。");
            if (attempt < MAX_RETRIES) { await sleep(2000); continue; }
            else { break; }
        }

        if (resChall.includes("top.self.location.href")) {
            console.log("⚠️ 探测到 AC 节点重定向，正在拦截底层参数...");
            let gwMatch = resChall.match(/href='http:\/\/(.*?)\//);
            if (gwMatch) targetGw = gwMatch[1];

            let ipMatch = resChall.match(/wlanuserip=([^&']+)/);
            if (ipMatch) clientIp = ipMatch[1];

            console.log(`🎯 重新锁定真实网关: ${targetGw} | IP: ${clientIp}`);

            reqChall = new Request(`http://${targetGw}/cgi-bin/get_challenge?callback=${cb}&username=${userEnc}&ip=${clientIp}&_=${ts}`);
            reqChall.timeoutInterval = 3;
            try {
                resChall = await reqChall.loadString();
            } catch (e) {
                console.log("⚠️ 二次请求获取 Token 超时。");
                if (attempt < MAX_RETRIES) { await sleep(2000); continue; }
                else { break; }
            }
        }

        let tokenMatch = resChall.match(/"challenge":"(.*?)"/);
        if (!tokenMatch) {
            console.log("⚠️ 无法解析 Token。返回内容:\n" + resChall);
            if (attempt < MAX_RETRIES) { await sleep(2000); continue; }
            else { break; }
        }
        let token = tokenMatch[1];

        // 🌟 反向提取真实 IP，完美防止假死和签名错误
        if (!clientIp) {
            let jsonIpMatch = resChall.match(/"client_ip":"(.*?)"/);
            clientIp = jsonIpMatch ? jsonIpMatch[1] : "";
            console.log("🎯 从 JSON 提取分配 IP: " + clientIp);
        }

        let ac_id = "1";

        let hmd5 = hex_hmac_md5(token, PASSWORD);
        let infoObj = { username: USERNAME, password: PASSWORD, ip: clientIp, acid: ac_id, enc_ver: "srun_bx1" };
        let info = "{SRBX1}" + base64Encode(xEncode(JSON.stringify(infoObj), token));

        let chkstr = token + USERNAME + token + hmd5 + token + ac_id + token + clientIp + token + "200" + token + "1" + token + info;
        let chksum = hex_sha1(chkstr);

        let queryParams = `callback=${cb}&action=login&username=${userEnc}&password=${encodeURIComponent("{MD5}" + hmd5)}&ac_id=${ac_id}&ip=${clientIp}&chksum=${chksum}&info=${encodeURIComponent(info)}&n=200&type=1&os=iOS&name=iPhone&_=${ts}`;
        let authUrl = `http://${targetGw}/cgi-bin/srun_portal?${queryParams}`;

        let reqAuth = new Request(authUrl);
        reqAuth.method = "GET";
        reqAuth.timeoutInterval = 4;
        reqAuth.headers = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
            "Connection": "keep-alive"
        };

        try {
            let authRes = await reqAuth.loadString();
            console.log("返回报文: " + authRes);

            if (authRes.includes('"error":"ok"') || authRes.includes('ip_already_online_error')) {
                let n = new Notification();
                n.title = "网络认证成功";
                n.body = `已无感打通校园网节点 ${targetGw}`;
                n.schedule();
                console.log("🎉 狙击成功！结束运行。");
                Script.complete();
                return;
            } else if (authRes.includes("E2532")) {
                console.log("⚠️ 触发网关防刷盾 (E2532)，强制深度休眠 10 秒...");
                await sleep(10000);
            } else {
                console.log("⚠️ 认证受阻，请检查账号密码配置。");
                if (attempt < MAX_RETRIES) await sleep(2000);
            }
        } catch (e) {
            console.log("⚠️ 发包超时。可能是 WAF 拦截或连接已隐性放行。");
            if (attempt < MAX_RETRIES) await sleep(2000);
        }
    }

    // ----------------------------------------------------
    // [兜底] 最终物理网络探针校验与优雅降级
    // ----------------------------------------------------
    console.log("=================================================");
    console.log("❌ 常规发包流程未能命中。正在启动最终网络连通性物理校验...");

    try {
        let finalCheck = new Request("http://captive.apple.com/hotspot-detect.html");
        finalCheck.timeoutInterval = 3;
        let finalRes = await finalCheck.loadString();

        if (finalRes.includes("Success")) {
            console.log("🎉 最终校验通过：网络已被隐性放行，无需唤起浏览器！");
            let n = new Notification(); n.title = "网络已恢复通畅"; n.body = "已成功越过网关阻断"; n.schedule();
            Script.complete();
            return;
        }
    } catch (e) {
        console.log("⚠️ 最终物理校验未通过，网络依然阻断。");
    }

    console.log("  [兜底] 准备唤起 Safari 浏览器进行手动认证...");
    if (targetGw) {
        Safari.open(`http://${targetGw}`);
    }

    Script.complete();
}

main();