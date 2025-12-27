# PROTOCOL-RELAY // GIT ACCELERATOR

> **/// BUREAU OF DATA TRANSPORT // SECURE CHANNEL**
>
> 一个基于 Astro + React 构建的磁带未来主义（Cassette Futurism）风格 Git 加速工具。

![License](https://img.shields.io/badge/license-MIT-orange.svg)
![Style](https://img.shields.io/badge/style-Cassette_Futurism-black.svg)
![Deployed](https://img.shields.io/badge/deployed_on-EdgeOne_Pages-blue.svg)

## 📖 简介 (Introduction)

**PROTOCOL-RELAY** 是一个极简的 GitHub 文件与仓库加速前端。它不存储任何文件，而是作为一个“协议中继”，通过 CDN 边缘节点转发流量，实现高速访问 GitHub 资源。

项目采用了冷峻的工业复古设计风格（Project Nebula），模拟行政审批与数据终端的交互体验。

### ✨ 核心特性
*   **0 存储成本**：纯前端页面，利用 EdgeOne 进行回源加速。
*   **智能解析**：支持完整 URL 输入，也支持 `user/repo` 简写模式。
*   **多协议支持**：一键生成 `Git Clone`、`Wget`、`cURL` 及 `Raw` 链接。
*   **直接下载**：提供 ZIP 源码包或单文件的 Direct Download 按钮。
*   **极致性能**：基于 Astro 构建，EdgeOne 边缘分发。

---

## 📂 目录结构 (Directory Structure)

```text
PROTOCOL-RELAY/
├── public/                 # 静态资源文件
├── src/
│   ├── components/         # React 组件库
│   │   └── ProtocolTerminal.jsx  # 核心交互终端（解析逻辑所在）
│   ├── layouts/            # 页面布局文件
│   │   └── Layout.astro    # 全局布局（字体、背景网格）
│   └── pages/              # 路由页面
│       └── index.astro     # 首页组装
├── astro.config.mjs        # Astro 配置文件 (集成 React & Tailwind)
├── tailwind.config.mjs     # Tailwind 样式配置 (定义复古配色与字体)
├── package.json            # 项目依赖
└── README.md               # 说明文档

🕹️ 使用方法 (Usage)
访问终端：打开部署好的网站。
输入目标：在输入框中填入 GitHub 链接或仓库名。
支持格式 1 (完整链接): https://github.com/torvalds/linux
支持格式 2 (简写): torvalds/linux
支持格式 3 (具体文件): https://github.com/torvalds/linux/blob/master/README
发起协议：点击橘色的 INITIATE PROTOCOL // 提交申请 按钮。
获取清单：等待“盖章”批准后，复制下方的加速命令：
GIT CLONE: 用于克隆仓库。
WGET / cURL: 用于命令行下载。
RAW URL: 原始文件的加速直链。
Direct Download: 浏览器直接下载 ZIP 包或文件。

🚀 部署方法 (Deployment)
本项目分为 前端托管 和 CDN 加速配置 两部分，推荐使用 腾讯云 EdgeOne 一站式完成。
1. 本地环境准备

# 克隆项目
git clone https://github.com/C-4-C-4/PROTOCOL-RELAY.git
cd PROTOCOL-RELAY

# 安装依赖 (推荐使用 npm)
npm install

# 本地调试
npm run dev
```

2. 前端部署 (EdgeOne Pages)
将代码推送到你的 GitHub 仓库。
登录 腾讯云 EdgeOne 控制台，进入 Pages (页面托管)。
点击 新建项目，连接你的 GitHub 仓库。
配置构建参数：
框架预设: Astro
构建命令: npm run build
构建目录: dist
点击部署，等待完成。
3. 加速通道配置 (核心步骤)
为了让加速链接真正生效，你需要配置一个自定义域名作为“中继隧道”。
添加站点：在 EdgeOne 控制台添加你的域名（如 example.com）。
添加加速域名：
新增子域名（如 git.example.com）。
源站地址: github.com
源站协议: HTTPS (端口 443)
修改回源 Host (至关重要)：
进入该域名的配置页面 -> 回源配置。
将 回源 Host 修改为 自定义 Host。
填入：github.com
注意：不修改此项会导致 502 错误。
配置 HTTPS：
在域名管理中申请免费证书并开启强制 HTTPS。
修改前端代码：
打开 src/components/ProtocolTerminal.jsx。
修改 const EDGE_DOMAIN 的值为你刚才配置的加速域名（如 https://git.example.com）。
重新推送代码部署。
👤 作者 (Author)
CCCC4444
Github: @C-4-C-4
Project Repo: PROTOCOL-RELAY
/// SYSTEM STATUS: ONLINE
/// END OF TRANSMISSION