const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // 第三方登录的用户不需要密码
    },
    avatar: {
      type: String,
    },
    githubId: {
      type: String,
    },
    googleId: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// 密码加密中间件
UserSchema.pre('save', async function (next) {
  // 只有在密码被修改或新建时才哈希
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  
  try {
    // 生成盐
    const salt = await bcrypt.genSalt(10);
    // 哈希密码
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 验证密码方法
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model('User', UserSchema); 