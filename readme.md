# 🚀 MacOS SRun Auto-Login | 深澜无感认证

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
* [ ] **iOS / iPadOS** (Coming Soon via Shortcuts + Scriptable)
* [ ] **Linux / OpenWrt** (Planned)

<a id="macos-guide-en"></a>
### 🍎 macOS Installation & Usage

#### 1. Configuration
Clone this repository and create your local configuration file from the template to prevent accidentally committing your credentials:
```bash
git clone [https://github.com/Miyawa-x/Auto_StuWifi](https://github.com/Miyawa-x/Auto_StuWifi)
cd YourRepository

```

Edit the `macos_bash_wifi.sh` file. 

```bash
USERNAME='YourStudentID'  # Must include the @stu suffix
PASSWORD='YourPassword'

```

#### 2. Execution

Grant execution permission and run the script:

```bash
chmod +x srun_login.sh
./srun_login.sh

```

#### 3. Automation (Optional but Recommended)

You can wrap this script in a macOS **Shortcuts** app automation to trigger it silently whenever you connect to `STUwifi`.

<a id="ios-guide-en"></a>

### 📱 iOS / iPadOS Guide

*Currently under development. A pure JavaScript implementation utilizing iOS Shortcuts will be released soon.*

<a id="troubleshooting-en"></a>

### 🛠 Troubleshooting

* **`E2901: Authentication failed`**: Your password is wrong, or you forgot the suffix (e.g.`@stu`) in your username.
* **`E2532: no_response_data_error`**: You requested too frequently. The script will automatically sleep for 10-12 seconds to let the gateway cool down.

---

<a id="chinese-version"></a>

## 🇨🇳 中文版

专为大学 (STUwifi) 打造的极速无感认证引擎。基于深澜 (SRun) 系统逆向工程，纯原生底层发包，彻底干掉恶心的弹窗，实现开盖即连的极致体验。

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
git clone [https://github.com/Miyawa-x/Auto_StuWifi](https://github.com/Miyawa-x/Auto_StuWifi)
cd YourRepository

```

打开 `macos_bash_wifi.sh`，填入你的账号密码。

```bash
USERNAME='你的学号@stu' 
PASSWORD='你的密码'

```

#### 2. 运行脚本

赋予执行权限并启动：

```bash
chmod +x srun_login.sh
./srun_login.sh

```

#### 3. 自动化部署（推荐）

建议将此脚本放入 macOS 自带的 **“快捷指令 (Shortcuts)”** 中，配置触发条件为“当加入 你的STUwifi 时”，即可无感体验。

<a id="ios-guide-zh"></a>

### 📱 iOS / iPadOS 使用指南

*全自动原生 iOS 方案正在开发中，利用 Safari DOM 注入与快捷指令联动，敬请期待。*

<a id="troubleshooting-zh"></a>

### 🛠 常见问题排错

* **提示 `E2901: Authentication failed**`: 账号或密码错误。请检查密码是否包含未转义字符，以及账号是否带了后缀，比如`@stu`。
* **日志卡在 `触发频率护盾 (E2532)**`: 网关觉得你发包太快了。脚本已经内置了 12 秒的深度休眠，耐心等待其自动重试即可。
* **提示 `zsh: command not found**`: 脚本必须运行在 `bash` 环境下。请确保你是通过 `./srun_login.sh` 或 `bash srun_login.sh` 执行，而不是使用 `sh` 命令。

---

*Disclaimer: This project is for educational purposes only. Please comply with the network regulations of your university.*

*免责声明: 本项目仅供网络协议学习与研究使用，请严格遵守校园网使用规范。*

