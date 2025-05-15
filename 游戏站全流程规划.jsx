import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Gamepad2,
  Users,
  MonitorPlay,
  Trophy,
  MessageSquare,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Download,
  BookOpen,
  MessageCircle,
  Star,
  Clock,
  TrendingUp,
  Smartphone,
  Globe,
  Headphones,
  Gift,
  Award,
  Calendar,
  BarChart2,
  CheckCircle,
  AlertCircle,
  Settings,
  LogIn,
  Plus,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GameHub = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 用户群体数据
  const userData = [
    { name: '硬核玩家', value: 75 },
    { name: '普通玩家', value: 25 }
  ];

  // 功能模块数据
  const featureData = [
    { name: '在线游戏', value: 40 },
    { name: '社区', value: 30 },
    { name: '商城', value: 20 },
    { name: '其他', value: 10 }
  ];

  // 开发进度数据
  const progressData = [
    { name: '设计', days: 30, start: 0, color: '#4CAF50' },
    { name: '前端', days: 45, start: 30, color: '#2196F3' },
    { name: '后端', days: 60, start: 75, color: '#FFC107' }
  ];

  // 测试进度数据
  const testData = [
    { name: '单元测试', value: 30 },
    { name: '集成测试', value: 40 },
    { name: '验收测试', value: 30 }
  ];

  // 热门游戏数据
  const gamesData = [
    { name: 'Apex Legends', players: 35000 },
    { name: 'CS2', players: 42000 },
    { name: 'Valorant', players: 38000 }
  ];

  // 用户增长数据
  const growthData = [
    { month: '首月', users: 5000 },
    { month: '三月', users: 15000 },
    { month: '半年', users: 50000 }
  ];

  // 轮播图数据
  const slides = [
    {
      title: 'Apex Legends 新赛季',
      description: '探索全新地图和传奇角色',
      image: 'https://s.coze.cn/t/L6Q8cNmb3C8/'
    },
    {
      title: 'CS2 锦标赛',
      description: '全球顶尖战队角逐百万奖金',
      image: 'https://s.coze.cn/t/Xmybv8QBm2o/'
    },
    {
      title: 'Valorant 新特工',
      description: '掌握全新技能组合',
      image: 'https://s.coze.cn/t/pxwj_zVqnRA/'
    }
  ];

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview',
        'design',
        'development',
        'testing',
        'operation'
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 平滑滚动
  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // 点击页面其他区域关闭菜单
  useEffect(() => {
    const handleClickOutside = event => {
      const navElement = document.getElementById('main-nav');
      if (isMobileMenuOpen && navElement && !navElement.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // 颜色配置
  const COLORS = ['#FF4655', '#00E0FF', '#4CAF50', '#FFC107', '#2196F3', '#9C27B0'];

  return (
    <div className="min-h-screen font-sans bg-[#0F0F0F] text-white overflow-x-hidden">
      {/* 导航条 */}
      <nav
        id="main-nav"
        className="sticky top-0 z-50 p-4 bg-[#1A1A1A] border-b border-[#333333]"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Gamepad2 className="text-[#FF4655] mr-2" size={24} />
            <span className="text-xl font-bold">GAMEHUB</span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            {[
              { id: 'overview', label: '需求分析' },
              { id: 'design', label: '设计方案' },
              { id: 'development', label: '开发成果' },
              { id: 'testing', label: '测试计划' },
              { id: 'operation', label: '运营方案' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${
                  activeSection === item.id
                    ? 'text-[#FF4655] font-bold after:content-[""] after:block after:h-[3px] after:bg-[#FF4655] after:mt-1'
                    : 'text-[#B3B3B3] hover:text-white'
                } transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <button
            aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
            className="md:hidden text-[#B3B3B3] p-2 rounded-md hover:bg-[#333333] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 移动端菜单 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute left-0 right-0 mt-2 mx-4 p-4 bg-[#1A1A1A] rounded-lg shadow-lg border border-[#333333] z-50 overflow-hidden"
            >
              <div className="flex flex-col space-y-3">
                {[
                  { id: 'overview', label: '需求分析' },
                  { id: 'design', label: '设计方案' },
                  { id: 'development', label: '开发成果' },
                  { id: 'testing', label: '测试计划' },
                  { id: 'operation', label: '运营方案' }
                ].map(item => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ x: 5 }}
                    className={`${
                      activeSection === item.id
                        ? 'text-[#FF4655] font-medium bg-[#333333]'
                        : 'text-[#B3B3B3] hover:text-white'
                    } transition-colors text-left py-2 px-4 rounded-lg flex items-center`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4655] mr-2.5 opacity-70"></span>
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 主要内容区 */}
      <main className="container mx-auto px-4 py-8">
        {/* 需求分析部分 */}
        <section id="overview" className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] rounded-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Users className="text-[#FF4655] mr-3" size={28} />
              需求分析
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-4 h-4 bg-[#FF4655] mr-2"></span>
                  目标用户群体
                </h3>
                <p className="text-[#B3B3B3] mb-6">
                  面向硬核玩家，他们对游戏有深入的了解和高要求，追求游戏的品质、深度和挑战性。
                </p>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {userData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-4 h-4 bg-[#00E0FF] mr-2"></span>
                  功能需求
                </h3>
                <p className="text-[#B3B3B3] mb-6">
                  具有在线游戏功能，方便玩家直接在网站上进行游戏体验。
                </p>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={featureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8">
                        {featureData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-4 h-4 bg-[#4CAF50] mr-2"></span>
                内容方向
              </h3>
              <p className="text-[#B3B3B3]">
                专注于某几个热门游戏，为玩家提供这些热门游戏的相关信息、攻略、社区交流等服务。
              </p>
            </div>
          </motion.div>
        </section>

        {/* 设计方案部分 */}
        <section id="design" className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] rounded-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <MonitorPlay className="text-[#FF4655] mr-3" size={28} />
              设计方案
            </h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">整体风格</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <CheckCircle className="text-[#4CAF50] mr-2" size={18} />
                    简洁大气
                  </h4>
                  <p className="text-[#B3B3B3]">
                    采用简洁的线条、图标和色彩，避免过于复杂的布局和装饰，使页面视觉效果更加清晰。
                  </p>
                </div>
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <CheckCircle className="text-[#4CAF50] mr-2" size={18} />
                    游戏氛围
                  </h4>
                  <p className="text-[#B3B3B3]">
                    通过色彩、图片和文字等形式，营造浓厚的游戏氛围，传达出游戏的独特魅力。
                  </p>
                </div>
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <CheckCircle className="text-[#4CAF50] mr-2" size={18} />
                    现代感
                  </h4>
                  <p className="text-[#B3B3B3]">
                    紧跟时代潮流，运用现代元素，如扁平化设计、动态效果等，使网站更具时尚感。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">布局结构</h3>
              <div className="bg-[#333333] p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <Navigation className="text-[#00E0FF] mr-2" size={18} />
                      导航栏
                    </h4>
                    <p className="text-[#B3B3B3] mb-4">
                      位于页面顶部，清晰展示网站的主要板块，包括首页、在线游戏、热门游戏、游戏攻略、社区交流、用户中心等。
                    </p>
                    <div className="flex items-center text-[#B3B3B3]">
                      <ChevronDown className="mr-2" size={16} />
                      <span>下拉菜单或侧滑菜单</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <Search className="text-[#00E0FF] mr-2" size={18} />
                      搜索框
                    </h4>
                    <p className="text-[#B3B3B3]">
                      设置在导航栏旁边，方便用户快速查找游戏、攻略、资讯等。具有智能联想功能。
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  {/* 轮播图示例 */}
                  <div className="relative h-64 w-full rounded-lg overflow-hidden">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-[#333333] flex items-center justify-center"
                      >
                        <div className="text-center p-4">
                          <h4 className="text-xl font-bold mb-2">{slides[currentSlide]?.title}</h4>
                          <p className="text-[#B3B3B3] mb-4">{slides[currentSlide]?.description}</p>
                          <div className="flex justify-center space-x-2">
                            {slides.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-[#FF4655]' : 'bg-[#666666]'}`}
                                aria-label={`跳转到第${index + 1}张幻灯片`}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">交互流程设计</h3>
              <div className="bg-[#333333] p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <ArrowRight className="text-[#FF4655] mr-2" size={18} />
                      首页交互流程
                    </h4>
                    <p className="text-[#B3B3B3]">
                      用户打开网站，首先看到首页的轮播图、游戏推荐区、游戏资讯区等内容。可以通过导航栏或搜索框快速找到所需内容。
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <ArrowRight className="text-[#FF4655] mr-2" size={18} />
                      在线游戏交互流程
                    </h4>
                    <p className="text-[#B3B3B3]">
                      用户点击导航栏中的"在线游戏"板块，进入在线游戏列表页面。点击游戏图标或名称，进入游戏详情页面并开始游戏。
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <ArrowRight className="text-[#FF4655] mr-2" size={18} />
                      热门游戏交互流程
                    </h4>
                    <p className="text-[#B3B3B3]">
                      用户点击导航栏中的"热门游戏"板块，进入热门游戏列表页面。点击游戏详情并下载安装游戏。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 开发成果部分 */}
        <section id="development" className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] rounded-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Settings className="text-[#FF4655] mr-3" size={28} />
              开发成果
            </h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">开发进度</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={progressData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="days" barSize={30}>
                      {progressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">热门游戏</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gamesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="players" fill="#8884d8">
                        {gamesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">用户增长预测</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#8884d8">
                        {growthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 测试计划部分 */}
        <section id="testing" className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] rounded-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <AlertCircle className="text-[#FF4655] mr-3" size={28} />
              测试计划
            </h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">测试目标</h3>
              <p className="text-[#B3B3B3] mb-6">
                确保游戏站在不同网络环境、设备类型和用户操作下能够稳定运行，并且在主流浏览器和移动设备上具有良好的兼容性。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <CheckCircle className="text-[#4CAF50] mr-2" size={18} />
                    稳定性测试
                  </h4>
                  <ul className="text-[#B3B3B3] space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4655] mt-1.5 mr-2"></span>
                      在线游戏功能是否出现卡顿、崩溃等问题
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4655] mt-1.5 mr-2"></span>
                      数据的准确性和完整性
                    </li>
                  </ul>
                </div>
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <CheckCircle className="text-[#4CAF50] mr-2" size={18} />
                    兼容性测试
                  </h4>
                  <ul className="text-[#B3B3B3] space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF] mt-1.5 mr-2"></span>
                      主流浏览器（Chrome、Firefox、Safari、Edge等）
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF] mt-1.5 mr-2"></span>
                      主流移动设备（iPhone、iPad、Android等）
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">测试进度</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={testData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {testData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">测试方法和工具</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <Globe className="text-[#2196F3] mr-2" size={18} />
                    网络模拟
                  </h4>
                  <p className="text-[#B3B3B3]">
                    使用Fiddler、Network Link Conditioner等工具模拟不同网络环境。
                  </p>
                </div>
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <TrendingUp className="text-[#FFC107] mr-2" size={18} />
                    性能测试
                  </h4>
                  <p className="text-[#B3B3B3]">
                    使用JMeter、LoadRunner等工具模拟高并发情况。
                  </p>
                </div>
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <Smartphone className="text-[#9C27B0] mr-2" size={18} />
                    设备测试
                  </h4>
                  <p className="text-[#B3B3B3]">
                    使用BrowserStack、Appium等工具进行跨设备测试。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 运营方案部分 */}
        <section id="operation" className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] rounded-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Trophy className="text-[#FF4655] mr-3" size={28} />
              运营方案
            </h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">推广策略</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <MessageSquare className="text-[#2196F3] mr-2" size={18} />
                    社交媒体平台推广
                  </h4>
                  <ul className="text-[#B3B3B3] space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2196F3] mt-1.5 mr-2"></span>
                      微博：创建官方微博，发布游戏更新内容、新角色预告
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2196F3] mt-1.5 mr-2"></span>
                      微信：开通公众号发布攻略、评测、活动等内容
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2196F3] mt-1.5 mr-2"></span>
                      抖音/快手：制作精彩游戏短视频吸引用户
                    </li>
                  </ul>
                </div>
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <MonitorPlay className="text-[#FFC107] mr-2" size={18} />
                    游戏直播推广
                  </h4>
                  <p className="text-[#B3B3B3]">
                    与知名游戏主播合作，在直播过程中推荐游戏站。主播可以介绍游戏站的特色、热门游戏等内容。
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <BookOpen className="text-[#4CAF50] mr-2" size={18} />
                    游戏论坛和社区推广
                  </h4>
                  <ul className="text-[#B3B3B3] space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mt-1.5 mr-2"></span>
                      热门游戏官方论坛发布游戏站相关信息
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mt-1.5 mr-2"></span>
                      加入硬核玩家社区与玩家互动
                    </li>
                  </ul>
                </div>
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <Calendar className="text-[#9C27B0] mr-2" size={18} />
                    线下活动推广
                  </h4>
                  <ul className="text-[#B3B3B3] space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9C27B0] mt-1.5 mr-2"></span>
                      参加游戏展会搭建体验区
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9C27B0] mt-1.5 mr-2"></span>
                      高校、商场举办线下试玩活动
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">用户服务</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <Headphones className="text-[#FF4655] mr-2" size={18} />
                    客服体系
                  </h4>
                  <ul className="text-[#B3B3B3] space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4655] mt-1.5 mr-2"></span>
                      设置在线客服及时解答问题
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4655] mt-1.5 mr-2"></span>
                      设立客服热线保持畅通
                    </li>
                  </ul>
                </div>
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <Gift className="text-[#00E0FF] mr-2" size={18} />
                    用户激励机制
                  </h4>
                  <ul className="text-[#B3B3B3] space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF] mt-1.5 mr-2"></span>
                      建立积分系统兑换游戏礼包
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF] mt-1.5 mr-2"></span>
                      设立会员制度享受特权
                    </li>
                  </ul>
                </div>
                <div className="bg-[#333333] p-6 rounded-lg">
                  <h4 className="text-lg font-medium mb-2 flex items-center">
                    <MessageCircle className="text-[#4CAF50] mr-2" size={18} />
                    用户反馈机制
                  </h4>
                  <ul className="text-[#B3B3B3] space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mt-1.5 mr-2"></span>
                      设置意见反馈渠道
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mt-1.5 mr-2"></span>
                      定期开展用户调研
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">运营计划</h3>
              <div className="bg-[#333333] p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <Clock className="text-[#FF4655] mr-2" size={18} />
                      上线前准备
                    </h4>
                    <ul className="text-[#B3B3B3] space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4655] mt-1.5 mr-2"></span>
                        全面测试确保稳定性
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4655] mt-1.5 mr-2"></span>
                        准备游戏站内容
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4655] mt-1.5 mr-2"></span>
                        制定宣传推广计划
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <TrendingUp className="text-[#00E0FF] mr-2" size={18} />
                      上线初期
                    </h4>
                    <ul className="text-[#B3B3B3] space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF] mt-1.5 mr-2"></span>
                        监测各项数据变化
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF] mt-1.5 mr-2"></span>
                        策划有吸引力活动
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF] mt-1.5 mr-2"></span>
                        优化用户体验
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <Award className="text-[#4CAF50] mr-2" size={18} />
                      长期运营
                    </h4>
                    <ul className="text-[#B3B3B3] space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mt-1.5 mr-2"></span>
                        定期更新内容
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mt-1.5 mr-2"></span>
                        策划主题活动
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mt-1.5 mr-2"></span>
                        优化用户服务
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-[#121212] py-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-[#8C8C8C] text-sm">
              <p>页面内容均由 AI 生成，仅供参考</p>
            </div>
            <div className="text-right">
              <a
                href="https://space.coze.cn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF4655] hover:underline text-sm md:text-base"
              >
                created by coze space
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GameHub;