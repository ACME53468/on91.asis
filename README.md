# CYBERGAMES 授权服务

这是赛博朋克游戏站的认证授权服务器，提供邮箱注册、登录以及第三方登录(GitHub/Google)功能。

## 功能特性

- 邮箱/密码注册和登录
- GitHub OAuth 登录
- Google OAuth 登录
- JWT 认证
- 用户资料管理

## 技术栈

- Node.js + Express
- MongoDB (数据库)
- Passport.js (OAuth认证)
- JWT (JSON Web Token)

## 快速开始

### 前置条件

- Node.js (v14+)
- MongoDB (本地或云服务)
- GitHub 和 Google 开发者账号 (第三方登录)

### 安装步骤

1. 克隆仓库
```
git clone https://yourrepo.git
cd server
```

2. 安装依赖
```
npm install
```

3. 创建环境变量文件
```
cp .env.example .env
```

4. 修改 `.env` 文件，填入你的配置信息
```
# 服务器配置
PORT=5000
NODE_ENV=development

# 数据库配置 
MONGO_URI=mongodb://localhost:27017/cybergames

# JWT配置
JWT_SECRET=你的密钥_请修改
SESSION_SECRET=你的会话密钥_请修改

# 前端地址
CLIENT_URL=http://localhost:3000

# GitHub OAuth配置
# 请在 https://github.com/settings/applications/new 注册应用获取
GITHUB_CLIENT_ID=你的GitHub客户端ID
GITHUB_CLIENT_SECRET=你的GitHub客户端密钥

# Google OAuth配置
# 请在 https://console.developers.google.com/ 注册应用获取
GOOGLE_CLIENT_ID=你的Google客户端ID
GOOGLE_CLIENT_SECRET=你的Google客户端密钥
```

5. 启动服务器
```
npm run dev
```

### 第三方登录配置

#### GitHub OAuth

1. 前往 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息:
   - Application name: CYBERGAMES
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:5000/api/auth/github/callback
4. 注册后获取 Client ID 和 Client Secret
5. 将这些值填入 `.env` 文件对应字段

#### Google OAuth

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建一个项目
3. 导航到 "APIs & Services" > "Credentials"
4. 点击 "Create Credentials" > "OAuth client ID"
5. 设置应用类型为 "Web application"
6. 添加重定向URI: http://localhost:5000/api/auth/google/callback
7. 创建后获取 Client ID 和 Client Secret
8. 将这些值填入 `.env` 文件对应字段

## API 接口

### 认证接口

- `GET /api/auth/github` - GitHub 登录
- `GET /api/auth/google` - Google 登录
- `POST /api/auth/login` - 邮箱密码登录
- `POST /api/auth/register` - 注册新用户

### 用户接口

- `GET /api/user/profile` - 获取当前用户资料
- `PUT /api/user/profile` - 更新用户资料
- `POST /api/user/validate-token` - 验证令牌有效性

## 前端集成

前端可以通过以下方式与授权服务集成:

1. 添加第三方登录按钮，例如:
```html
<a href="http://localhost:5000/api/auth/github">GitHub 登录</a>
<a href="http://localhost:5000/api/auth/google">Google 登录</a>
```

2. 处理重定向回调，获取 token 和用户信息:
```javascript
// 在前端页面加载时检查 URL 参数
window.onload = function() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const userJson = params.get('user');
  
  if (token && userJson) {
    // 存储 token
    localStorage.setItem('auth_token', token);
    // 存储用户信息
    localStorage.setItem('user', userJson);
    // 清除 URL 参数
    window.history.replaceState({}, document.title, '/');
    // 更新 UI
    updateUI();
  }
};
```

3. 发送 API 请求时添加授权头:
```javascript
fetch('http://localhost:5000/api/user/profile', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
``` 