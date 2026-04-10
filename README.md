# CAS_MONSTER_WEBSITE

## English

### Overview
CAS_MONSTER_WEBSITE is a Flask + Socket.IO web app that automates IB CAS form filling on the WFLA CAS system using Playwright and DeepSeek.

It supports:
- Fetching available clubs from your CAS account
- Single activity record autofill
- Weekly batch activity record autofill
- Activity reflection autofill (summary + full reflection)
- Live logs and preview panel in the browser

### Tech Stack
- Python 3.11+
- Flask
- Flask-SocketIO
- Playwright (Chromium)
- DeepSeek API

### Prerequisites
1. Python 3.11 or newer
2. DeepSeek API key
3. Playwright browser installed (Chromium)

### Setup (Local)
```bash
git clone <your-repo-url>
cd CAS_MONSTER_WEBSITE
python -m venv .venv
```

Activate venv:

Windows (PowerShell):
```powershell
.venv\Scripts\Activate.ps1
```

macOS/Linux:
```bash
source .venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
playwright install chromium
```

Set environment variable:

Windows (PowerShell):
```powershell
$env:DEEPSEEK_API_KEY="your_api_key_here"
```

macOS/Linux:
```bash
export DEEPSEEK_API_KEY="your_api_key_here"
```

Run:
```bash
python app.py
```

Open:
`http://127.0.0.1:5000` (or `http://localhost:5000`)

### Setup (Docker)
Build:
```bash
docker build -t cas-monster-web .
```

Run:
```bash
docker run --rm -p 5000:5000 -e DEEPSEEK_API_KEY=your_api_key_here cas-monster-web
```

### Environment Variables
- `DEEPSEEK_API_KEY` (required): DeepSeek API key used for content generation.
- `PORT` (optional): server port. Default is `5000`.

### Project Structure
```text
CAS_MONSTER_WEBSITE/
├─ app.py
├─ requirements.txt
├─ Dockerfile
├─ templates/
│  └─ index.html
└─ static/
   ├─ style.css
   └─ script.js
```

### Notes
- This project is designed for the WFLA CAS system flow and selectors.
- School website structure changes may break automation.
- Keep your account and API key private.

---

## 中文

### 项目简介
CAS_MONSTER_WEBSITE 是一个基于 Flask + Socket.IO 的网页工具，结合 Playwright 与 DeepSeek，自动完成 WFLA CAS 系统中的 IB CAS 表单填写。

主要功能：
- 获取账号下可用社团列表
- 单条 Activity Record 自动填写
- 按周批量生成并填写 Activity Record
- Activity Reflection 自动填写（Summary + 正文）
- 浏览器端实时日志与预览

### 技术栈
- Python 3.11+
- Flask
- Flask-SocketIO
- Playwright（Chromium）
- DeepSeek API

### 运行前准备
1. Python 3.11 或更高版本
2. DeepSeek API Key
3. 已安装 Playwright 浏览器（Chromium）

### 本地部署
```bash
git clone <你的仓库地址>
cd CAS_MONSTER_WEBSITE
python -m venv .venv
```

激活虚拟环境：

Windows (PowerShell)：
```powershell
.venv\Scripts\Activate.ps1
```

macOS/Linux：
```bash
source .venv/bin/activate
```

安装依赖：
```bash
pip install -r requirements.txt
playwright install chromium
```

设置环境变量：

Windows (PowerShell)：
```powershell
$env:DEEPSEEK_API_KEY="your_api_key_here"
```

macOS/Linux：
```bash
export DEEPSEEK_API_KEY="your_api_key_here"
```

启动服务：
```bash
python app.py
```

访问：
`http://127.0.0.1:5000`（或 `http://localhost:5000`）

### Docker 部署
构建镜像：
```bash
docker build -t cas-monster-web .
```

运行容器：
```bash
docker run --rm -p 5000:5000 -e DEEPSEEK_API_KEY=your_api_key_here cas-monster-web
```

### 环境变量说明
- `DEEPSEEK_API_KEY`（必填）：用于生成内容的 DeepSeek API Key。
- `PORT`（可选）：服务端口，默认 `5000`。

### 项目结构
```text
CAS_MONSTER_WEBSITE/
├─ app.py
├─ requirements.txt
├─ Dockerfile
├─ templates/
│  └─ index.html
└─ static/
   ├─ style.css
   └─ script.js
```

### 注意事项
- 本项目基于 WFLA CAS 系统页面流程与选择器编写。
- 若学校系统页面结构变动，自动化流程可能失效。
- 请妥善保管账号和 API Key，避免泄露。
