#!/bin/bash

# ==========================================================
# 配置区
USERNAME='Your_account' 
PASSWORD='Your_pass'
School_IP_list=("IP1" "IP2" "...")     
# ==========================================================

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"

echo "================================================="
echo "🎯 启动极速认证引擎 (最终解谜版)..."

# 启动无限寿命的 Watchdog 拦截弹窗
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

MAX_RETRIES=3
for (( ATTEMPT=1; ATTEMPT<=MAX_RETRIES; ATTEMPT++ )); do
    echo "-------------------------------------------------"
    echo "第 $ATTEMPT 次连接准备..."

    IP=$(ifconfig en0 | awk '/inet / {print $2}')
    if [ -z "$IP" ]; then
        sleep 2
        continue
    fi
    echo "获得本机 IP: $IP。等待路由同步..."
    sleep 2

    # 扫描活跃的校园网网关
# 扫描活跃的校园网网关
    TARGET_GW=""
    # 正确的数组遍历方式：加上 [@] 来获取所有元素
    for gw in "${SCHOOL_IP_LIST[@]}"; do
        if ping -c 1 -W 1 "$gw" &> /dev/null; then
            TARGET_GW="$gw"
            echo "  [雷达] 锁定活跃网关: $TARGET_GW"
            break
        fi
    done

    if [ -z "$TARGET_GW" ]; then
        echo "  [警告] 物理网络不通，休眠 3 秒..."
        sleep 3
        continue
    fi

    TS="$(date +%s)$(printf "%03d" $((RANDOM % 1000)))"
    CB_STR="jQuery1124_${TS}"

    echo "  [交互] 向 $TARGET_GW 请求 Challenge Token..."
    CHALLENGE_RES=$(curl -sS --connect-timeout 3 -m 10 -H "Connection: keep-alive" -A "$UA" "http://${TARGET_GW}/cgi-bin/get_challenge?callback=${CB_STR}&username=${USER_ENCODED}&ip=${IP}&_=${TS}" 2>&1)
    
    TOKEN=$(echo "$CHALLENGE_RES" | grep -o '"challenge":"[^"]*' | cut -d'"' -f4)

    if [ -z "$TOKEN" ]; then
        echo "  [失败] 无法获取 Token: $CHALLENGE_RES"
        sleep 5
        continue
    fi
    echo "  [状态] 锁定 Token: $TOKEN"

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
    
    CURL_EXIT_CODE=$?

    if echo "$AUTH_RES" | grep -q '"error":"ok"'; then
        echo "================================================="
        echo "🎉 狙击成功！跨网关漫游认证已打通。"
        exit 0
    elif echo "$AUTH_RES" | grep -q '"error":"ip_already_online_error"'; then
        echo "================================================="
        echo "🎉 目标已在线，无需开火。"
        exit 0
    elif echo "$AUTH_RES" | grep -q 'no_response_data_error'; then
        echo "  [警告] 触发频率护盾 (E2532)。进入深度休眠 10 秒..."
        sleep 10
    else
        if [ $CURL_EXIT_CODE -eq 28 ]; then
            echo "  [状态] ⚠️ 请求超时。探测外网隐性连通..."
            if ping -c 1 -W 2 223.5.5.5 &> /dev/null; then
                echo "================================================="
                echo "🎉 验证通过：外网通道已经被成功打通！"
                exit 0
            else
                echo "  [失败] 网络未通畅，准备重试..."
                sleep 5
            fi
        else
            echo "  [失败] 认证异常: $AUTH_RES"
            sleep 5
        fi
    fi

done

echo "================================================="
echo "❌ 均未命中，请断开 Wi-Fi 稍后再试。"
exit 1