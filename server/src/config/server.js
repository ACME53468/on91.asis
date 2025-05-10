module.exports = {
    // 阿里云ECS服务器配置
    server: {
        host: '8.141.113.216', // 您的服务器公网IP
        port: 22, // SSH默认端口
        username: 'root', // 默认用户名
        password: 'jizhi54826A', // 新设置的密码
        privateKey: '', // SSH私钥路径，如果使用密钥认证
    },
    
    // 应用配置
    app: {
        port: 3000, // 应用运行端口
        env: 'production', // 环境：production/development
    },
    
    // 数据库配置
    database: {
        url: 'mongodb://localhost:27017/game_platform',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}; 