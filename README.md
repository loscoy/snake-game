# 🐍 贪吃蛇游戏

一个用 HTML5 Canvas 和 Vanilla JavaScript 构建的现代贪吃蛇游戏，已优化并准备好部署到 Vercel。

## 🎮 游戏特性

- ✨ **现代化 UI** - 漂亮的渐变背景和流畅的动画
- 🎯 **响应式设计** - 完美适配桌面和移动设备
- 📊 **实时统计** - 显示分数、蛇长度和游戏等级
- ⚡ **渐进式难度** - 每吃 5 个食物游戏速度加快
- ⏸️ **暂停功能** - 随时暂停和继续游戏
- 🎨 **视觉效果** - 发光效果和网格背景

## 🕹️ 游戏控制

- **方向键** (↑ ↓ ← →) 或 **WASD** - 控制蛇的移动
- **开始游戏** - 点击开始按钮开始游戏
- **暂停** - 点击暂停按钮暂停/继续游戏
- **重新开始** - 点击重新开始按钮重置游戏

## 📋 游戏规则

1. 用方向键控制蛇移动
2. 吃掉红色食物增加分数和长度
3. 避免撞到墙壁或自己的身体
4. 每吃 5 个食物，游戏速度会加快
5. 尽可能获得高分！

## 🚀 本地运行

### 方式一：直接打开 HTML 文件

```bash
# 只需在浏览器中打开 public/index.html
open public/index.html
```

### 方式二：使用本地服务器

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js http-server
npx http-server public
```

然后访问 `http://localhost:8000`

## 📦 部署到 Vercel

### 前置要求

- GitHub 账户
- Vercel 账户 (可在 [vercel.com](https://vercel.com) 免费注册)

### 部署步骤

#### 方法 1：使用 Vercel CLI（推荐）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 在项目目录中运行
vercel

# 3. 按照提示完成部署
# - 选择 "Create a new project"
# - 输入项目名称
# - 选择框架（选择 "Other"）
# - 确认部署
```

#### 方法 2：使用 GitHub + Vercel 自动部署

```bash
# 1. 初始化 Git 仓库
git init
git add .
git commit -m "Initial commit: Snake Game"

# 2. 创建 GitHub 仓库并推送代码
git remote add origin https://github.com/YOUR_USERNAME/snake-game.git
git branch -M main
git push -u origin main

# 3. 在 Vercel 中：
#    - 访问 https://vercel.com/new
#    - 导入你的 GitHub 仓库
#    - 自动检测配置
#    - 点击 "Deploy"
```

#### 方法 3：使用 Vercel 网页界面

1. 访问 [vercel.com/new](https://vercel.com/new)
2. 点击 "Import Project"
3. 选择 "Import Git Repository"
4. 粘贴此仓库的 URL
5. 配置项目设置
6. 点击 "Deploy"

### 部署后

- 你的游戏将在 `https://your-project-name.vercel.app` 上线
- 每次推送到 GitHub 都会自动重新部署
- 可以在 Vercel 仪表板中查看部署历史和日志

## 📁 项目结构

```
snake-game/
├── public/
│   └── index.html          # 游戏主文件
├── api/
│   └── index.js            # API 端点
├── package.json            # 项目配置
├── vercel.json             # Vercel 部署配置
├── .gitignore              # Git 忽略文件
└── README.md               # 本文件
```

## 🎨 自定义游戏

你可以轻松修改以下内容：

### 改变游戏大小
在 `public/index.html` 中找到：
```javascript
const gridSize = 20;  // 改变网格大小
```

### 改变颜色
在 CSS 中修改颜色值：
```css
/* 蛇的颜色 */
ctx.fillStyle = '#4CAF50';

/* 食物的颜色 */
ctx.fillStyle = '#FF6B6B';
```

### 调整游戏速度
```javascript
let gameSpeed = 100;  // 毫秒，数值越小速度越快
```

## 🐛 故障排除

### 游戏不显示
- 确保浏览器支持 HTML5 Canvas
- 清除浏览器缓存
- 尝试使用其他浏览器

### 部署失败
- 检查 `vercel.json` 配置是否正确
- 确保所有文件都已提交到 Git
- 查看 Vercel 仪表板中的部署日志

### 游戏响应缓慢
- 关闭其他浏览器标签
- 清除浏览器缓存
- 尝试降低游戏难度（增加 gameSpeed 值）

## 📝 许可证

MIT License - 自由使用和修改

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如有问题，请在 GitHub 上提交 Issue。

---

**祝你游戏愉快！🎮**