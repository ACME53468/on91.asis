require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const connectDB = require('./config/db');
const env = require('./config/env');

// 初始化Express应用
const app = express();
const PORT = env.PORT;

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: env.CLIENT_URL, 
  credentials: true
}));

// 会话配置
app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 1天
  }
}));

// Passport初始化
app.use(passport.initialize());
app.use(passport.session());

// 配置Passport策略
require('./config/passport');

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// 首页路由
app.get('/', (req, res) => {
  res.send('CYBERGAMES 授权服务 API');
});

// 连接数据库
connectDB();

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口: ${PORT}`);
}); 