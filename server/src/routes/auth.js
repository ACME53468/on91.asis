const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');
const router = express.Router();

// 生成JWT令牌
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// 成功登录处理函数
const handleAuthSuccess = (req, res) => {
  // 更新最后登录时间
  req.user.lastLogin = Date.now();
  if (req.user.save) {
    req.user.save();
  }
  
  // 生成JWT令牌
  const token = generateToken(req.user);
  
  // 重定向到前端，带上令牌
  const redirectUrl = new URL(env.CLIENT_URL);
  redirectUrl.searchParams.append('token', token);
  
  // 将用户信息也添加到URL参数（避免敏感信息）
  redirectUrl.searchParams.append('user', JSON.stringify({
    id: req.user._id || req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar,
  }));
  
  res.redirect(redirectUrl.toString());
};

/**
 * @route   GET /api/auth/github
 * @desc    使用GitHub登录
 * @access  Public
 */
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

/**
 * @route   GET /api/auth/github/callback
 * @desc    GitHub登录回调
 * @access  Public
 */
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  handleAuthSuccess
);

/**
 * @route   GET /api/auth/google
 * @desc    使用Google登录
 * @access  Public
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google登录回调
 * @access  Public
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  handleAuthSuccess
);

/**
 * @route   POST /api/auth/login
 * @desc    邮箱密码登录
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 检查是否使用内存模式
    if (global.inMemoryDB) {
      const user = global.inMemoryDB.users.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({ message: '邮箱或密码错误' });
      }
      
      // 简单密码验证
      if (user.password !== password) {
        return res.status(401).json({ message: '邮箱或密码错误' });
      }
      
      // 生成JWT令牌
      const token = generateToken(user);
      
      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      });
    }
    
    // MongoDB模式
    // 检查用户是否存在
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }
    
    // 验证密码
    if (!user.password) {
      return res.status(401).json({ 
        message: '此邮箱使用第三方账号登录，请使用对应的登录方式',
        providers: {
          github: !!user.githubId,
          google: !!user.googleId
        }
      });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }
    
    // 生成JWT令牌
    const token = generateToken(user);
    
    // 更新最后登录时间
    user.lastLogin = Date.now();
    await user.save();
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

/**
 * @route   POST /api/auth/register
 * @desc    注册新用户
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // 检查是否使用内存模式
    if (global.inMemoryDB) {
      // 检查邮箱是否已被使用
      const existingUser = global.inMemoryDB.users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: '邮箱已被注册' });
      }
      
      // 创建新用户
      const userId = Date.now().toString();
      const user = {
        id: userId,
        name,
        email,
        password,  // 简化处理，实际应该加密
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        role: 'user',
        lastLogin: Date.now()
      };
      
      global.inMemoryDB.users.push(user);
      
      // 生成JWT令牌
      const token = generateToken(user);
      
      return res.status(201).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      });
    }
    
    // MongoDB模式
    // 检查邮箱是否已被使用
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '邮箱已被注册' });
    }
    
    // 创建新用户
    const user = await User.create({
      name,
      email,
      password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    });
    
    // 生成JWT令牌
    const token = generateToken(user);
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router; 