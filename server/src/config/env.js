/**
 * 环境变量配置指南
 * 请在项目根目录创建 .env 文件并设置以下环境变量
 */

/*
# 服务器配置
PORT=5000
NODE_ENV=development

# 数据库配置 
MONGO_URI=mongodb://localhost:27017/cybergames

# JWT配置
JWT_SECRET=cybergames_jwt_secret_key
SESSION_SECRET=cybergames_session_secret_key

# 前端地址
CLIENT_URL=http://localhost:3000

# GitHub OAuth配置
# 请在 https://github.com/settings/applications/new 注册应用获取
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth配置
# 请在 https://console.developers.google.com/ 注册应用获取
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
*/

// 环境变量配置，提供默认值
module.exports = {
  // 服务器配置
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // 数据库配置
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/cybergames',
  
  // JWT配置
  JWT_SECRET: process.env.JWT_SECRET || 'cyberpunk_games_jwt_secret_2024',
  SESSION_SECRET: process.env.SESSION_SECRET || 'cyberpunk_games_session_secret_2024',
  
  // 前端地址
  CLIENT_URL: process.env.CLIENT_URL || (process.env.NODE_ENV === 'production' ? 'https://on91.asia' : 'http://localhost:3000'),
  
  // 域名配置
  DOMAIN: process.env.DOMAIN || 'on91.asia',
  API_PREFIX: process.env.API_PREFIX || '/api',
  
  // GitHub OAuth配置
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || 'placeholder_github_id',
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || 'placeholder_github_secret',
  
  // Google OAuth配置
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'placeholder_google_id',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'placeholder_google_secret'
}; 