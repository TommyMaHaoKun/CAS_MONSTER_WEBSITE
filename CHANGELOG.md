# 更新日志

## v5.2.0 - 2026-06-20

本次更新把 CAS Monster 从传统表单工具升级为以 `CAS AI Chat` 为主入口的审批式自动填报体验，并将 AI 后端迁移到 Qwen。

### 新增

- 将 `Activity Record`、`Weekly Batch Records`、`Activity Reflection` 集成到聊天流程中。
- 聊天中可生成可审批卡片，用户可以在提交前检查、编辑、批准或取消：
  - Activity Record 卡片显示社团、日期、主题、C/A/S 小时和生成描述。
  - Activity Reflection 卡片显示社团、Learning Outcomes、summary 和 reflection content。
  - Weekly Batch 卡片显示日期范围、星期、周数和首周示例。
- 新增登录入口页，支持 WFLA 账号登录验证、`Remember me` 本设备记住登录、退出登录。
- 新增 Gemini 风格的居中聊天 UI：
  - 聊天作为默认主界面。
  - 输入框固定在窗口底部。
  - 消息、提示 chips 和审批卡片居中显示。
  - 卡片改为更清晰的审批状态、图标、badge 和按钮样式。
- 聊天输入左侧 `+` 菜单新增：
  - `Add Record`
  - `Add Reflection`
  - `Add files or photos`
- `Add Record` / `Add Reflection` 面板支持多个请求：
  - 左上角 `+` 添加请求。
  - 右上角关闭面板。
  - 每个请求右下角垃圾桶删除该请求。
  - 每个请求可附加文件或照片。
- `Add Record` 面板支持选择社团、日期、C/A/S 小时和活动描述。
- `Add Reflection` 面板支持选择社团、Learning Outcomes 和反思描述。
- 聊天和快速面板均新增 `Thinking` 开关。
- Thinking 模式下，聊天会以较小的灰色文字展示模型思考内容，并显示三点上下跳动的动态思考动画。
- 附件上传支持 `.txt`、`.md`、`.csv`、`.log`、`.json`、`.docx`、`.pdf`、`.xlsx`、图片等格式。
- 预置 `CAS_DOCUMENTS/` 中的 CAS 官方文档会作为参考注入聊天和内容生成 prompt。

### 变更

- AI 后端从 DeepSeek / Kimi 迁移为 Qwen：
  - 默认文本生成模型：`qwen3.6-flash`
  - 文件读取模型：`qwen-long`
  - 默认 OpenAI 兼容端点：`https://dashscope.aliyuncs.com/compatible-mode/v1`
  - API key 优先读取 `DASHSCOPE_API_KEY`
- 统一 LLM 调用入口，支持 Qwen `enable_thinking`。
- 文件读取全部改用 Qwen-Long file-extract，不再依赖 Kimi 文件解析。
- Activity Record / Reflection 生成会优先使用英文社团名，避免生成内容混入中文社团名。
- `Conversation` 反思被明确处理为 CAS 总结性反思，而不是社团活动。
- 对话中的英文社团别名会匹配到已有社团全名，例如 `Computerization Club` 匹配 `世外信息化社(Computerization)`。
- Reflection 如果没有显式指定 Learning Outcomes，聊天 agent 会基于描述自动推断 3-5 个合适 outcomes。
- Activity Record / Reflection 的正文生成现在在审批前完成，用户批准的内容会原样提交到学校系统。
- 生成逻辑会在 prompt 中引用 CAS 官方文档片段，使快速面板和聊天生成都遵循学校要求。
- UI 文案统一从 DeepSeek / Kimi 更新为 Qwen。

### 修复

- 修复模型只回复 “Let me create...” 但不调用工具，导致没有卡片的问题：
  - 强化 system prompt，禁止只宣布将创建内容。
  - 增加服务端 fallback，检测到卡住或空回复时强制重新请求工具调用。
- 修复 Kimi/Qwen 历史消息中 assistant 空内容导致 API 报错的问题。
- 修复生成卡片时 description / reflection content 为空却仍显示空 textarea 的问题：
  - 空正文会重试。
  - 最终仍为空会返回错误，不再展示空卡片。
- 修复聊天卡片在消息过多时被 flex 布局压缩成细条的问题。
- 修复输入框固定底部时遮挡卡片按钮的问题。
- 修复 Word 临时文件 `~$...docx` 被当作 CAS 文档读取并产生 warning 的问题。
- 修复快速面板附件上传后无法作为生成上下文的问题。
- 修复 `Conversation` 被模型误解为 “Conversation Club” 的问题。

### 验证

- `python -m py_compile app.py`
- `node --check static/script.js`
- 使用 mock 测试验证：
  - 聊天卡住时 fallback 能强制生成 reflection proposal。
  - `Add Record` / `Add Reflection` 面板打开 Thinking 时，后端 Qwen 调用收到 `thinking_enabled=True`。
  - CAS 官方文档成功加载并注入生成 prompt。

### 配置说明

启动前建议设置：

```powershell
$env:DASHSCOPE_API_KEY="你的千问 API Key"
python app.py
```

可选环境变量：

```powershell
$env:LLM_MODEL="qwen3.6-flash"
$env:FILE_MODEL="qwen-long"
$env:LLM_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
```

如果要永久保存到 Windows 用户环境变量：

```powershell
setx DASHSCOPE_API_KEY "你的千问 API Key"
```
