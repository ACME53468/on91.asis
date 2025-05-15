import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Gamepad2, 
  Flame, 
  BookOpenText, 
  MessageSquare, 
  User, 
  Search, 
  ChevronRight,
  Download,
  Star,
  Clock,
  Heart,
  Share2,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GameStation = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 轮播图数据
  const banners = [
    {
      image: "https://s.coze.cn/t/BaHGfB_RkV4/",
      title: "赛博纪元 2077",
      subtitle: "全新DLC现已上线"
    },
    {
      image: "https://s.coze.cn/t/OArv-9euDww/",
      title: "暗影之战",
      subtitle: "年度最佳RPG游戏"
    },
    {
      image: "https://s.coze.cn/t/faVPRYeE6fs/",
      title: "星际殖民",
      subtitle: "开启你的太空冒险"
    }
  ];

  // 热门游戏数据
  const popularGames = [
    {
      id: 1,
      cover: "https://s.coze.cn/t/uIPkO77TfX8/",
      title: "暗影之战",
      size: "38.6GB",
      rating: 4.2,
      downloads: "1.2M"
    },
    {
      id: 2,
      cover: "https://s.coze.cn/t/4kxwgHSM960/",
      title: "星际殖民",
      size: "45.3GB",
      rating: 3.5,
      downloads: "890K"
    },
    {
      id: 3,
      cover: "https://s.coze.cn/t/kecRY6-hKaI/",
      title: "赛博纪元 2077",
      size: "62.8GB",
      rating: 4.8,
      downloads: "2.4M"
    }
  ];

  // 游戏攻略数据
  const gameGuides = [
    {
      title: "终极BOSS速通指南",
      game: "暗影之战",
      author: "硬核玩家联盟",
      readCount: "12.8万"
    },
    {
      title: "新手入门全攻略",
      game: "星际殖民",
      author: "太空探索者",
      readCount: "8.5万"
    },
    {
      title: "隐藏彩蛋大全",
      game: "赛博纪元 2077",
      author: "彩蛋猎人",
      readCount: "15.2万"
    }
  ];

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners?.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners?.length]);

  // 渲染星级评分
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-current text-yellow-500" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 fill-current text-yellow-500" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-400" />);
      }
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* 导航栏 */}
      <nav className="bg-gray-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Gamepad2 className="text-red-500 h-8 w-8 mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              HardcoreGamer
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setActiveNav('home')}
              className={`flex items-center ${activeNav === 'home' ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
            >
              <Home className="mr-1" /> 首页
            </button>
            <button 
              onClick={() => setActiveNav('online')}
              className={`flex items-center ${activeNav === 'online' ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
            >
              <Play className="mr-1" /> 在线游戏
            </button>
            <button 
              onClick={() => setActiveNav('popular')}
              className={`flex items-center ${activeNav === 'popular' ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
            >
              <Flame className="mr-1" /> 热门游戏
            </button>
            <button 
              onClick={() => setActiveNav('guides')}
              className={`flex items-center ${activeNav === 'guides' ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
            >
              <BookOpenText className="mr-1" /> 游戏攻略
            </button>
            <button 
              onClick={() => setActiveNav('community')}
              className={`flex items-center ${activeNav === 'community' ? 'text-red-500' : 'text-gray-300 hover:text-white'}`}
            >
              <MessageSquare className="mr-1" /> 社区交流
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索游戏、攻略..."
                className="bg-gray-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-sm font-medium transition-colors">
              <User className="inline mr-1" /> 登录/注册
            </button>
            <button 
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="h-6 w-6">☰</div>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-800 overflow-hidden"
            >
              <div className="px-4 py-2 space-y-2">
                <button 
                  onClick={() => { setActiveNav('home'); setIsMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded ${activeNav === 'home' ? 'bg-gray-700 text-red-500' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <Home className="inline mr-2" /> 首页
                </button>
                <button 
                  onClick={() => { setActiveNav('online'); setIsMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded ${activeNav === 'online' ? 'bg-gray-700 text-red-500' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <Play className="inline mr-2" /> 在线游戏
                </button>
                <button 
                  onClick={() => { setActiveNav('popular'); setIsMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded ${activeNav === 'popular' ? 'bg-gray-700 text-red-500' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <Flame className="inline mr-2" /> 热门游戏
                </button>
                <button 
                  onClick={() => { setActiveNav('guides'); setIsMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded ${activeNav === 'guides' ? 'bg-gray-700 text-red-500' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <BookOpenText className="inline mr-2" /> 游戏攻略
                </button>
                <button 
                  onClick={() => { setActiveNav('community'); setIsMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded ${activeNav === 'community' ? 'bg-gray-700 text-red-500' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <MessageSquare className="inline mr-2" /> 社区交流
                </button>
                <div className="px-3 py-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索游戏、攻略..."
                      className="bg-gray-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* 轮播图 */}
        <section className="mb-12 relative overflow-hidden rounded-xl shadow-lg">
          <div className="relative h-80 md:h-[560px]">
            {banners?.map((banner, index) => (
              <AnimatePresence key={index}>
                {currentSlide === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={banner?.image} 
                      alt={banner?.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                      <div className="container mx-auto px-8 pb-12">
                        <motion.h2 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-3xl md:text-5xl font-bold mb-2"
                        >
                          {banner?.title}
                        </motion.h2>
                        <motion.p 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-xl md:text-2xl text-gray-300 mb-6"
                        >
                          {banner?.subtitle}
                        </motion.p>
                        <motion.button
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.7 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full text-lg font-medium transition-colors flex items-center"
                        >
                          立即体验 <ChevronRight className="ml-1" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
            {banners?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'w-3 bg-red-500' : 'bg-gray-500'}`}
                aria-label={`跳转到轮播图 ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* 热门游戏推荐 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center">
              <Flame className="text-red-500 mr-2" /> 热门游戏推荐
            </h2>
            <button className="text-gray-400 hover:text-white flex items-center text-sm">
              查看更多 <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGames?.map((game) => (
              <motion.div
                key={game?.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={game?.cover} 
                    alt={game?.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center">
                      <Play className="mr-1 w-4 h-4" /> 立即试玩
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{game?.title}</h3>
                    <div className="flex items-center">
                      {renderStars(game?.rating)}
                      <span className="ml-1 text-sm text-gray-400">{game?.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{game?.size}</span>
                    <span>{game?.downloads} 下载</span>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                      <Heart className="mr-1 w-4 h-4" /> 收藏
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                      <Download className="mr-1 w-4 h-4" /> 下载
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 游戏攻略 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center">
              <BookOpenText className="text-red-500 mr-2" /> 游戏攻略
            </h2>
            <button className="text-gray-400 hover:text-white flex items-center text-sm">
              查看更多 <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gameGuides?.map((guide, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white mr-3">
                    <BookOpenText size={18} />
                  </div>
                  <h3 className="text-xl font-bold">{guide?.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">游戏: {guide?.game}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">作者: {guide?.author}</span>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-1" /> {guide?.readCount} 阅读
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <button className="text-gray-400 hover:text-white flex items-center text-sm">
                    <Heart className="mr-1 w-4 h-4" /> 收藏
                  </button>
                  <button className="text-gray-400 hover:text-white flex items-center text-sm">
                    <Share2 className="mr-1 w-4 h-4" /> 分享
                  </button>
                  <button className="text-red-500 hover:text-red-400 flex items-center text-sm">
                    阅读全文 <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 在线游戏体验 */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center">
              <Play className="text-red-500 mr-2" /> 在线游戏体验
            </h2>
            <button className="text-gray-400 hover:text-white flex items-center text-sm">
              查看更多 <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">无需下载，即刻畅玩</h3>
                <p className="text-gray-400 mb-6">
                  我们精选了多款高品质游戏，无需下载安装，点击即可开始游戏体验。支持多种游戏类型，包括动作、冒险、角色扮演等。
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mr-3">
                      <Gamepad2 size={16} />
                    </div>
                    <span>多款热门游戏在线体验</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mr-3">
                      <Clock size={16} />
                    </div>
                    <span>无需等待下载时间</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mr-3">
                      <User size={16} />
                    </div>
                    <span>支持多人在线对战</span>
                  </div>
                </div>
                <button className="mt-8 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full text-lg font-medium transition-colors flex items-center">
                  开始游戏 <ChevronRight className="ml-1" />
                </button>
              </div>
              <div className="relative">
                <img 
                  src="https://s.coze.cn/t/DnkjYrgS1vU/" 
                  alt="在线游戏" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110">
                    <Play className="w-8 h-8" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <div className="mb-4">
            <a 
              href="https://space.coze.cn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              created by coze space
            </a>
          </div>
          <div>页面内容均由 AI 生成，仅供参考</div>
        </div>
      </footer>
    </div>
  );
};

export default GameStation;