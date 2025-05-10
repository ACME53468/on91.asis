const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');
const router = express.Router();

// 中间件: 验证JWT令牌
const authMiddleware = async (req, res, next) => {
  try {
    // 从请求头获取令牌
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '未授权访问' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // 验证令牌
    jwt.verify(token, env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: '令牌无效或已过期' });
      }
      
      // 使用内存模式
      if (global.inMemoryDB) {
        const user = global.inMemoryDB.users.find(u => u.id === decoded.id || u.email === decoded.email);
        if (!user) {
          return res.status(401).json({ message: '用户不存在' });
        }
        req.user = user;
        return next();
      }
      
      // 使用MongoDB
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: '用户不存在' });
      }
      
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('验证令牌错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

/**
 * @route   GET /api/user/profile
 * @desc    获取当前用户资料
 * @access  Private
 */
router.get('/profile', authMiddleware, (req, res) => {
  // 排除敏感字段
  const { password, __v, ...userProfile } = req.user._doc || req.user;
  res.json(userProfile);
});

/**
 * @route   PUT /api/user/profile
 * @desc    更新用户资料
 * @access  Private
 */
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    
    // 使用内存模式
    if (global.inMemoryDB) {
      const userIndex = global.inMemoryDB.users.findIndex(u => u.id === req.user.id);
      if (userIndex === -1) {
        return res.status(404).json({ message: '用户不存在' });
      }
      
      // 更新字段
      if (name) global.inMemoryDB.users[userIndex].name = name;
      if (avatar) global.inMemoryDB.users[userIndex].avatar = avatar;
      
      return res.json({
        id: global.inMemoryDB.users[userIndex].id,
        name: global.inMemoryDB.users[userIndex].name,
        email: global.inMemoryDB.users[userIndex].email,
        avatar: global.inMemoryDB.users[userIndex].avatar
      });
    }
    
    // 更新用户资料
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    // 更新字段
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    
    await user.save();
    
    // 排除敏感字段
    const { password, __v, ...userProfile } = user._doc;
    res.json(userProfile);
  } catch (error) {
    console.error('更新用户资料错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

/**
 * @route   POST /api/user/validate-token
 * @desc    验证令牌有效性
 * @access  Public
 */
router.post('/validate-token', authMiddleware, (req, res) => {
  res.json({ valid: true });
});

module.exports = router; 