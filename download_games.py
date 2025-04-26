import os
import requests
import json
import shutil
from bs4 import BeautifulSoup
import re
import time

# FreezeNova仓库URL
REPO_URL = "https://github.com/freezenova/freezenova.github.io"
RAW_URL = "https://raw.githubusercontent.com/freezenova/freezenova.github.io/main"

# 游戏分类映射
CATEGORY_MAPPING = {
    "action": ["crazy-shooters", "crazy-shooters-2", "endless-siege", "tap-tap-shots"],
    "adventure": ["fall-boys", "survival-karts"],
    "puzzle": ["tetris", "egg-clicker"],
    "strategy": ["cobra-shooter"],
    "racing": ["drift-hunters-pro", "drift-king", "drift-rider", "edys-car-simulator"],
    "sports": ["football-king", "super-soccer-noggins"]
}

def download_game(game_name, category):
    """下载游戏文件并添加到网站中"""
    print(f"正在下载游戏: {game_name}")
    
    # 创建游戏目录
    game_dir = os.path.join("games", category, game_name)
    os.makedirs(game_dir, exist_ok=True)
    
    # 下载游戏文件
    try:
        # 尝试下载index.html
        index_url = f"{RAW_URL}/{game_name}/index.html"
        try:
            response = requests.get(index_url, timeout=10)
            if response.status_code == 200:
                with open(os.path.join(game_dir, "index.html"), "w", encoding="utf-8") as f:
                    f.write(response.text)
                print(f"已下载 {game_name}/index.html")
            else:
                print(f"无法下载 {game_name}/index.html，状态码: {response.status_code}")
        except Exception as e:
            print(f"下载 {game_name}/index.html 时出错: {str(e)}")
        
        # 尝试下载其他资源文件
        try:
            assets_url = f"{RAW_URL}/{game_name}/assets"
            response = requests.get(assets_url, timeout=10)
            if response.status_code == 200:
                assets_dir = os.path.join(game_dir, "assets")
                os.makedirs(assets_dir, exist_ok=True)
                
                # 解析HTML以获取资源文件列表
                soup = BeautifulSoup(response.text, "html.parser")
                for link in soup.find_all("a"):
                    href = link.get("href")
                    if href and not href.startswith("?") and not href.endswith("/"):
                        try:
                            file_url = f"{RAW_URL}/{game_name}/{href}"
                            file_response = requests.get(file_url, timeout=10)
                            if file_response.status_code == 200:
                                file_path = os.path.join(assets_dir, os.path.basename(href))
                                with open(file_path, "wb") as f:
                                    f.write(file_response.content)
                                print(f"已下载 {game_name}/assets/{os.path.basename(href)}")
                            else:
                                print(f"无法下载 {game_name}/{href}，状态码: {file_response.status_code}")
                        except Exception as e:
                            print(f"下载 {game_name}/{href} 时出错: {str(e)}")
            else:
                print(f"无法访问 {game_name}/assets，状态码: {response.status_code}")
        except Exception as e:
            print(f"下载 {game_name}/assets 时出错: {str(e)}")
        
        # 创建游戏数据
        game_data = {
            'title': game_name.replace("-", " ").title(),
            'type': category.title() + " Game",
            'category': category,
            'slug': game_name,
            'short_description': f"Play {game_name.replace('-', ' ').title()}, an exciting {category} game on 91xiuluo.cn",
            'description': f"{game_name.replace('-', ' ').title()} is an exciting {category} game that offers hours of entertainment. Challenge yourself with this engaging gameplay and see if you can master all the levels!",
            'thumbnail': f"/images/games/{game_name}.jpg",
            'iframe_url': f"/games/{category}/{game_name}/index.html",
            'additional_tags': [],
            'features': [
                'Engaging gameplay',
                'Multiple levels',
                'Simple controls',
                'Hours of entertainment'
            ],
            'how_to_play': f"Use your mouse or keyboard to play {game_name.replace('-', ' ').title()}. Follow the on-screen instructions to learn the controls and start playing!",
            'controls': '''
                <ul class="list-disc list-inside text-gray-600 space-y-2">
                    <li><strong>Mouse</strong> - Click and interact</li>
                    <li><strong>Keyboard</strong> - Use arrow keys or WASD for movement</li>
                    <li><strong>Space</strong> - Action button</li>
                </ul>
            '''
        }
        
        # 保存游戏数据
        with open(os.path.join(game_dir, "game_data.json"), "w", encoding="utf-8") as f:
            json.dump(game_data, f, indent=4)
        
        print(f"已创建游戏数据: {game_name}")
        return game_data
    
    except Exception as e:
        print(f"下载游戏 {game_name} 时出错: {str(e)}")
        return None

def main():
    """主函数"""
    # 创建游戏分类目录
    for category in CATEGORY_MAPPING.keys():
        os.makedirs(os.path.join("games", category), exist_ok=True)
    
    # 下载游戏
    all_game_data = []
    for category, games in CATEGORY_MAPPING.items():
        for game in games:
            try:
                game_data = download_game(game, category)
                if game_data:
                    all_game_data.append(game_data)
                # 添加延迟，避免请求过于频繁
                time.sleep(1)
            except Exception as e:
                print(f"处理游戏 {game} 时出错: {str(e)}")
    
    # 生成游戏页面
    try:
        from generate_game_page import create_game_page
        for game_data in all_game_data:
            try:
                create_game_page(game_data)
                print(f"已生成游戏页面: {game_data['title']}")
            except Exception as e:
                print(f"生成游戏页面 {game_data['title']} 时出错: {str(e)}")
    except Exception as e:
        print(f"导入 create_game_page 时出错: {str(e)}")
    
    print(f"已成功添加 {len(all_game_data)} 个游戏到您的网站")

if __name__ == "__main__":
    main() 