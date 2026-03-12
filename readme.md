# SRun Auto-Login | 深澜无感认证

[English Version](#english-version) | [中文版](#chinese-version)

---

<a id="english-version"></a>
## 🌐 English Version

A lightning-fast, zero-dependency bash script for automatic authentication on the SRun Gateway (specifically tailored for SRun-STUwifi). It silently bypasses the Apple Captive Portal Assistant, auto-discovers active gateways, and achieves millisecond-level login without any manual intervention.

### 📑 Table of Contents (English)
- [Features](#features-en)
- [Platform Support](#platform-support-en)
- [macOS Installation & Usage](#macos-guide-en)
- [iOS / iPadOS Guide](#ios-guide-en)
- [Troubleshooting](#troubleshooting-en)

<a id="features-en"></a>
### ✨ Features
* **Zero Dependencies:** Pure Bash & JXA (JavaScript for Automation). No Node.js, Python, or external libraries required.
* **Popup Killer (Watchdog):** Silently kills the annoying macOS Captive Portal Assistant window before it even renders.
* **Auto-Discovery Radar:** Dynamically scans and locks onto active gateways (e.g., `10.6.18.2`, `10.6.21.2`) to support seamless roaming across different campus buildings.
* **Anti-DDoS Shield Bypass:** Intelligently handles `E2532` high-frequency blocks with elastic sleep and implicit connection verification.



<a id="platform-support-en"></a>
### 💻 Platform Support
* [x] **macOS** (Native Bash, fully tested on macOS Ventura/Sonoma)
* [x] **iOS / iPadOS** (Coming Soon via Shortcuts + Scriptable)
* [ ] **Linux / OpenWrt** (Planned)

<a id="macos-guide-en"></a>
### 🍎 macOS Installation & Usage

#### 1. Configuration
Clone this repository and create your local configuration file from the template to prevent accidentally committing your credentials:
```bash
git clone https://github.com/Miyawa-x/Auto_StuWifi
cd Auto_StuWifi

```

Edit the `macos_bash_wifi.sh` file. 

```bash
USERNAME='YourStudentID'  # Must include the @stu suffix
PASSWORD='YourPassword'

```

#### 2. Execution

Grant execution permission and run the script:

```bash
chmod +x macos_bash_wifi.sh
./macos_bash_wifi.sh

```

#### 3. Automation (Optional but Recommended)

You can wrap this script in a macOS **Shortcuts** app automation to trigger it silently whenever you connect to `STUwifi`.

<a id="ios-guide-en"></a>

### 📱 iOS / iPadOS Guide

By leveraging the free Scriptable app, we can execute the SRun authentication protocol natively in the background, achieving a true zero-click, zero-popup experience when connecting to the campus Wi-Fi.

#### 1. Prerequisites
Download the free **Scriptable** app from the App Store.

#### 2. Install the Script
1. Open Scriptable and tap the `+` icon in the top right corner to create a new script.
2. Copy all the code from [`ios_scriptable.js`](https://github.com/Miyawa-x/Auto_StuWifi/blob/main/ios_scriptable.js) in this repository and paste it into the editor.
3. Edit the configuration section at the top of the script with your real credentials:
   ```javascript
   const USERNAME = "YourStudentID";
   const PASSWORD = "YourPassword";

    ```

4. Tap the title at the top to rename it (e.g., "Auto_STUwifi"), then tap **Done** to save.

#### 3. Setup Zero-Click Automation

To make this run silently in the background every time you connect:

1. Open the built-in **Shortcuts** app on your iPhone/iPad.
2. Go to the **Automation** tab and tap `+` to create a new one.
3. Scroll down and select **Wi-Fi**.
4. Choose your campus network (e.g., `STUwifi`) for the Network.
5. **CRITICAL:** Select **Run Immediately** (Do NOT choose "Run After Confirmation"), then tap Next.
6. Search for **Scriptable** in the action list, select **Run Script**, and choose the script you just saved.
7. Tap Done. You are all set!

<a id="troubleshooting-en"></a>

### 🛠 Troubleshooting

* **`E2901: Authentication failed`**: Your password is wrong, or you forgot the suffix (e.g.`@stu`) in your username.
* **`E2532: no_response_data_error`**: You requested too frequently. The script will automatically sleep for 10-12 seconds to let the gateway cool down.

---

<a id="chinese-version"></a>

## 🇨🇳 中文版

专为大学 (STUwifi) 打造的极速无感认证引擎。基于深澜 (SRun) 系统逆向工程，纯原生底层发包，彻底干掉恶心的弹窗，实现开盖即连的极致体验。

Bilibili教程开发中

### 📑 目录 (中文)

* [功能特性](#features-zh)
* [支持平台](#platform-support-zh)
* [macOS 使用指南](#macos-guide-zh)
* [iOS / iPadOS 使用指南](#ios-guide-zh)
* [常见问题排错](#troubleshooting-zh)

<a id="features-zh"></a>

### ✨ 功能特性

* **零依赖架构:** 纯 Bash + 系统原生 JXA 引擎驱动，无需安装 Node.js、Python 或任何第三方库。
* **无情弹窗猎手 (Watchdog):** 建立后台无限守护进程，在苹果强制门户弹窗 (Captive Portal) 渲染出来的 0.1 秒内将其静默关闭。
* **动态IP雷达:** 告别硬编码。扫描 `10.6.18.2`、`10.6.21.2` 等多网关节点，支持跨校区/楼栋的无缝漫游漫游。
* **高容错模式:** 针对深澜防刷盾 (E2532) 设计了弹性退避与外网隐性连通校验，告别盲目发包导致的死锁。

<a id="platform-support-zh"></a>

### 💻 支持平台

* [x] **macOS** (原生 Bash，已在 Ventura/Sonoma 完美验证)
* [ ] **iOS / iPadOS** (敬请期待：基于快捷指令的纯 JS 降维打击方案)
* [ ] **Linux / OpenWrt** (计划中)

<a id="macos-guide-zh"></a>

### 🍎 macOS 使用指南

#### 1. 基础配置

克隆本仓库：

```bash
git clone https://github.com/Miyawa-x/Auto_StuWifi
cd Auto_StuWifi

```

打开 `macos_bash_wifi.sh`，填入你的账号密码。

```bash
USERNAME='你的学号@stu' 
PASSWORD='你的密码'

```

#### 2. 运行脚本

赋予执行权限并启动：

```bash
chmod +x macos_bash_wifi.sh
./macos_bash_wifi.sh

```

#### 3. 自动化部署（推荐）

建议将此脚本放入 macOS 自带的 **“快捷指令 (Shortcuts)”** 中，配置触发条件为“当加入 你的STUwifi 时”，即可无感体验。

<a id="ios-guide-zh"></a>

### 📱 iOS / iPadOS 使用指南


借助免费的 [Scriptable](https://scriptable.app/) 软件，我们在 iOS 沙盒环境中用纯 JavaScript 重写了整套深澜加密协议。配合苹果的快捷指令自动化，实现连上 Wi-Fi 瞬间自动认证。

#### 1. 环境准备
前往 App Store 搜索并下载免费应用 **Scriptable**。

#### 2. 注入灵魂 (配置代码)
1. 打开 Scriptable，点击右上角的 `+` 号新建一个脚本。
2. 复制本仓库中 [`ios_scriptable.js`](https://github.com/Miyawa-x/Auto_StuWifi/blob/main/ios_scriptable.js) 里的所有代码，粘贴到输入框内。
3. **关键步骤：** 修改代码最顶部的账号密码配置：
   ```javascript
   const USERNAME = "你的NetID";
   const PASSWORD = "你的密码";

    ```

4. 点击顶部的标题可以给它重命名（比如 "校园网自动认证"），点击左上角 **Done** 保存。

#### 3. 无感连接与自动化方法

让它变成彻底的后台静默服务：

1. 打开 iOS 系统自带的 **“快捷指令 (Shortcuts)”** App。
2. 点击右上角 `+` 号，新建快捷指令
3. 在操作列表中，搜索 **Scriptable**，选择 **“Run Script (运行脚本)”**。
4. 点击半透明的“Script”蓝色字体，选中你刚才保存的那个脚本
5. 切换到屏幕底部的 “自动化” 标签页，点击右上角 + 号。
6. 下滑找到并选择 **“无线局域网 (Wi-Fi)”**。
4. “网络”选择你的校园网名称 (例如 `STUwifi`)。
5. 勾选底部的 **“立即运行”**（千万不要选“运行前询问”），点击下一步。
6. 操作选择你刚才新建的快捷指令，点击完成。

现在，你可以断开并重新连接校园网，并测试其可用性。

<a id="troubleshooting-zh"></a>

### 🛠 常见问题排错

* **提示 `E2901: Authentication failed**`: 账号或密码错误。请检查密码是否包含未转义字符，以及账号是否带了后缀，比如`@stu`。
* **日志卡在 `触发频率护盾 (E2532)**`: 网关觉得你发包太快了。脚本已经内置了 12 秒的深度休眠，耐心等待其自动重试即可。
* **提示 `zsh: command not found**`: 脚本必须运行在 `bash` 环境下。请确保你是通过 `./srun_login.sh` 或 `bash srun_login.sh` 执行，而不是使用 `sh` 命令。

---

*Disclaimer: This project is for educational purposes only. Please comply with the network regulations of your university.*

*免责声明: 本项目仅供网络协议学习与研究使用，请严格遵守校园网使用规范。*

