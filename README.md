# GameHub 游戏网站

这是一个包含多个HTML5游戏的网站，包括赛车竞速、超级跑酷和数独大师。

## 网站结构

```
/
├── index.html          # 主页
├── images/             # 图片文件夹
│   ├── car-racing.jpg
│   ├── super-runner.jpg
│   └── sudoku-master.jpg
└── games/              # 游戏文件夹
    ├── car-racing/     # 赛车竞速游戏
    │   └── index.html
    ├── super-runner/   # 超级跑酷游戏
    │   └── index.html
    └── sudoku-master/  # 数独大师游戏
        └── index.html
```

## 部署说明

### 部署到 on91.asia

1. 将所有文件上传到 on91.asia 的根目录
2. 确保文件结构如上所示
3. 确保所有游戏文件都有正确的权限设置

### 本地测试

1. 克隆或下载此仓库
2. 使用本地服务器运行网站（例如使用 Python 的 SimpleHTTPServer 或 Node.js 的 http-server）
3. 在浏览器中访问 `http://localhost:8000`（或服务器提供的URL）

## 游戏说明

### 赛车竞速
- 使用方向键控制赛车
- 躲避其他车辆并收集金币
- 每收集一个金币得5分，每通过一辆车得1分

### 超级跑酷
- 点击屏幕或按空格键跳跃
- 躲避障碍物并收集金币
- 每收集一个金币得5分，每通过一个障碍物得1分

### 数独大师
- 选择难度级别（简单、中等、困难）
- 填写数字完成数独谜题
- 游戏会自动检查答案是否正确

## 技术栈

- HTML5
- CSS3
- JavaScript (原生)
- 无需任何外部库或框架

## 许可证

MIT License 