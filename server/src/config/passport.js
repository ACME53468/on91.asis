const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
const env = require('./env');

// 序列化用户信息到session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 从session中反序列化用户
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// 基于环境构建回调URL
const getCallbackURL = (provider) => {
  const baseURL = env.NODE_ENV === 'production' 
    ? `https://${env.DOMAIN}${env.API_PREFIX}`
    : `http://localhost:${env.PORT}${env.API_PREFIX}`;
  
  return `${baseURL}/auth/${provider}/callback`;
};

// Google OAuth策略
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: getCallbackURL('google'),
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 查找用户是否已存在
        let user = await User.findOne({ googleId: profile.id });
        
        // 如果不存在则创建新用户
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            googleId: profile.id
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// GitHub OAuth策略
passport.use(
  new GitHubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: getCallbackURL('github'),
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 查找用户是否已存在
        let user = await User.findOne({ githubId: profile.id });
        
        // GitHub可能不会返回公开邮箱
        const email = profile.emails && profile.emails[0]
          ? profile.emails[0].value
          : `${profile.username}@github.user`;
        
        // 如果不存在则创建新用户
        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username,
            email: email,
            avatar: profile.photos[0].value,
            githubId: profile.id
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
); 