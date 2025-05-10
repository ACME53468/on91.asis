const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('MongoDB连接成功');
  } catch (error) {
    console.error('MongoDB连接失败:', error.message);
    // 如果是开发环境，可以继续使用内存模式
    if (env.NODE_ENV === 'development') {
      console.log('使用内存模式模拟数据库');
      global.inMemoryDB = { users: [] };
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB; 