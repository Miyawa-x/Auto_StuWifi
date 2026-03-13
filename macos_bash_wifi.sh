#!/bin/bash


# 配置区 

USERNAME='Your_account' # <--你的NetID
PASSWORD='Your_pass'    # <--你的密码
SCHOOL_IP_LIST=("IP1" "IP2")     # <--你的校园网关IP


UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"

sleep 3

echo "================================================="
echo "🎯 启动极速认证引擎 (探针完全体)..."

# 前置物理网络探针。如果已经有网，直接exit。
echo "  [探针] 正在检测外部网络连通性..."
if curl -sS -m 2 "http://captive.apple.com/hotspot-detect.html" | grep -q "Success" || ping -c 1 -W 2 223.5.5.5 > /dev/null 2>&1; then
    echo "🎉 外网已打通，设备已在线，无需重复认证！"
    exit 0
fi

# 启动 Watchdog 拦截弹窗
(
    while true; do
        pkill -x "Captive Network Assistant" &>/dev/null
        sleep 0.5
    done
) &
WATCHDOG_PID=$!
trap "kill $WATCHDOG_PID &>/dev/null" EXIT

# 提前进行安全 URL 编码
USER_ENCODED=$(echo -n "$USERNAME" | curl -Gso /dev/null -w %{url_effective} --data-urlencode @- "http://localhost" | sed 's|^http://localhost/?||')
AC_ID="1"
TARGET_GW=""

MAX_RETRIES=3
for (( ATTEMPT=1; ATTEMPT<=MAX_RETRIES; ATTEMPT++ )); do
    echo "-------------------------------------------------"
    echo "🏹 第 $ATTEMPT 次连接准备..."

    # 扫描活跃网关
    for gw in "${SCHOOL_IP_LIST[@]}"; do
        if ping -c 1 -W 1 "$gw" &> /dev/null; then
            TARGET_GW="$gw"
            echo "锁定活跃网关: $TARGET_GW"
            break
        fi
    done

    if [ -z "$TARGET_GW" ]; then
        echo "  [警告] 物理网络不通，休眠 2 秒..."
        sleep 2
        continue
    fi

    TS="$(date +%s)$(printf "%03d" $((RANDOM % 1000)))"
    CB_STR="jQuery1124_${TS}"

    echo "  [交互] 向 $TARGET_GW 请求 Challenge Token..."
    CHALLENGE_RES=$(curl -sS --connect-timeout 3 -m 10 -H "Connection: keep-alive" -A "$UA" "http://${TARGET_GW}/cgi-bin/get_challenge?callback=${CB_STR}&username=${USER_ENCODED}&ip=&_=${TS}" 2>&1)
    
    TOKEN=$(echo "$CHALLENGE_RES" | grep -o '"challenge":"[^"]*' | cut -d'"' -f4)

    if [ -z "$TOKEN" ]; then
        echo "  [失败] 无法获取 Token。可能是请求被阻断或设备已放行。"
        sleep 2
        continue
    fi
    echo "  [状态] 锁定 Token: $TOKEN"

    # 废弃 ifconfig。
    IP=$(echo "$CHALLENGE_RES" | grep -o '"client_ip":"[^"]*' | cut -d'"' -f4)
    if [ -z "$IP" ]; then
        # 如果 JSON 里没拿到，用 macOS 最底层原生路由命令获取，避开虚拟机网卡干扰
        ACTIVE_IFACE=$(route -n get default 2>/dev/null | awk '/interface: / {print $2}')
        IP=$(ipconfig getifaddr "$ACTIVE_IFACE" 2>/dev/null || ipconfig getifaddr en0 2>/dev/null)
    fi
    echo "  [状态] 截取真实通信 IP: $IP"

    HMD5=$(echo -n "$PASSWORD" | openssl dgst -md5 -hmac "$TOKEN" | awk '{print $NF}')
    INFO=$(osascript -l JavaScript - "$USERNAME" "$PASSWORD" "$IP" "$TOKEN" "$AC_ID" <<'EOF'
    function run(argv) {
        var user = argv[0], pass = argv[1], ip = argv[2], token = argv[3], acid = argv[4];
        function s(a,b){var c=a.length,v=[];for(var i=0;i<c;i+=4){v[i>>2]=a.charCodeAt(i)|a.charCodeAt(i+1)<<8|a.charCodeAt(i+2)<<16|a.charCodeAt(i+3)<<24;}if(b)v[v.length]=c;return v;}
        function l(a,b){var d=a.length,c=(d-1)<<2;if(b){var m=a[d-1];if((m<c-3)||(m>c))return null;c=m;}for(var i=0;i<d;i++){a[i]=String.fromCharCode(a[i]&0xff,a[i]>>>8&0xff,a[i]>>>16&0xff,a[i]>>>24&0xff);}return b?a.join('').substring(0,c):a.join('');}
        function xEncode(str,key){if(str=="")return"";var v=s(str,true),k=s(key,false);if(k.length<4)k.length=4;var n=v.length-1,z=v[n],y=v[0],c=0x86014019|0x183639A0,m,e,p,q=Math.floor(6+52/(n+1)),d=0;while(0<q--){d=d+c&(0x8CE0D9BF|0x731F2640);e=d>>>2&3;for(p=0;p<n;p++){y=v[p+1];m=z>>>5^y<<2;m+=(y>>>3^z<<4)^(d^y);m+=k[(p&3)^e]^z;z=v[p]=v[p]+m&(0xEFB8D130|0x10472ECF);}y=v[0];m=z>>>5^y<<2;m+=(y>>>3^z<<4)^(d^y);m+=k[(p&3)^e]^z;z=v[n]=v[n]+m&(0xBB390742|0x44C6F8BD);}return l(v,false);}
        function base64Encode(str){var chars='LVoJPiCN2R8G90yg+hmFHuacZ1OWMnrsSTXkYpUq/3dlbfKwv6xztjI7DeBE45QA',out='';for(var i=0;i<str.length;i+=3){var c1=str.charCodeAt(i)&0xFF,c2=i+1<str.length?str.charCodeAt(i+1)&0xFF:0,c3=i+2<str.length?str.charCodeAt(i+2)&0xFF:0;out+=chars.charAt(c1>>2)+chars.charAt(((c1&3)<<4)|(c2>>4))+(i+1<str.length?chars.charAt(((c2&15)<<2)|(c3>>6)):'')+(i+2<str.length?chars.charAt(c3&63):'');}var pad=str.length%3;if(pad==1)out+="==";else if(pad==2)out+="=";return out;}
        return "{SRBX1}" + base64Encode(xEncode(JSON.stringify({username:user,password:pass,ip:ip,acid:acid,enc_ver:"srun_bx1"}),token));
    }
EOF
    )

    CHKSTR="${TOKEN}${USERNAME}${TOKEN}${HMD5}${TOKEN}${AC_ID}${TOKEN}${IP}${TOKEN}200${TOKEN}1${TOKEN}${INFO}"
    CHKSUM=$(echo -n "$CHKSTR" | shasum -a 1 | awk '{print $1}')
    INFO_ENCODED=$(echo -n "$INFO" | curl -Gso /dev/null -w %{url_effective} --data-urlencode @- "http://localhost" | sed 's|^http://localhost/?||')

    echo "  [交互] 向 $TARGET_GW 发射最终认证请求..."
    AUTH_RES=$(curl -sS --connect-timeout 3 -m 15 -H "Connection: keep-alive" -A "$UA" "http://${TARGET_GW}/cgi-bin/srun_portal?callback=${CB_STR}&action=login&username=${USER_ENCODED}&password=%7BMD5%7D${HMD5}&ac_id=${AC_ID}&ip=${IP}&chksum=${CHKSUM}&info=${INFO_ENCODED}&n=200&type=1&os=Mac+OS&name=Macintosh&_=${TS}" 2>&1)
    
    if echo "$AUTH_RES" | grep -q '"error":"ok"' || echo "$AUTH_RES" | grep -q 'ip_already_online_error'; then
        echo "================================================="
        echo "🎉 验证成功！网络已放行。"
        exit 0
    else
        echo "  [失败] 认证拦截，返回信息: $AUTH_RES"
        sleep 2
    fi
done

echo "================================================="
echo "❌ 常规发包流程未能命中。正在启动最终网络连通性物理校验..."

# 用物理 Ping 测定真实状况
if ping -c 1 -W 2 223.5.5.5 > /dev/null 2>&1; then
    echo "🎉 最终校验通过：网络已被隐性放行，无需唤起浏览器！"
    exit 0
else
    echo "⚠️ 网络依然阻断。准备唤起浏览器进行手动认证..."
    if [ -n "$TARGET_GW" ]; then
        open "http://$TARGET_GW"
    fi
    exit 1
fi