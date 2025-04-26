import os
import requests
from PIL import Image
from io import BytesIO

# 游戏缩略图URL映射
THUMBNAIL_MAPPING = {
    "crazy-shooters": "https://freezenova.com/media/posts/81/Crazy-Shooters.jpg",
    "crazy-shooters-2": "https://freezenova.com/media/posts/90/Crazy-Shooters-2.jpg",
    "endless-siege": "https://freezenova.com/media/posts/523/Endless-Siege-Online.jpg",
    "tap-tap-shots": "https://freezenova.com/media/posts/525/Tap-Tap-Shots.jpg",
    "fall-boys": "https://freezenova.com/media/posts/527/Fall-Boys.jpg",
    "survival-karts": "https://freezenova.com/media/posts/529/Survival-Karts.jpg",
    "tetris": "https://freezenova.com/media/posts/531/Tetris.jpg",
    "egg-clicker": "https://freezenova.com/media/posts/533/Egg-Clicker.jpg",
    "cobra-shooter": "https://freezenova.com/media/posts/535/Cobra-Shooter.jpg",
    "drift-hunters-pro": "https://freezenova.com/media/posts/537/Drift-Hunters-Pro.jpg",
    "drift-king": "https://freezenova.com/media/posts/539/Drift-King.jpg",
    "drift-rider": "https://freezenova.com/media/posts/541/Drift-Rider.jpg",
    "edys-car-simulator": "https://freezenova.com/media/posts/543/Edys-Car-Simulator.jpg",
    "football-king": "https://freezenova.com/media/posts/545/Football-King.jpg",
    "super-soccer-noggins": "https://freezenova.com/media/posts/547/Super-Soccer-Noggins.jpg"
}

def download_and_optimize_image(url, output_path, size=(512, 512)):
    """下载图片并优化尺寸和质量"""
    try:
        # 创建输出目录
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # 下载图片
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            # 使用Pillow处理图片
            img = Image.open(BytesIO(response.content))
            
            # 调整尺寸
            img = img.resize(size, Image.Resampling.LANCZOS)
            
            # 转换为RGB模式（如果是RGBA）
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            
            # 保存优化后的图片
            img.save(output_path, 'JPEG', quality=85, optimize=True)
            print(f"已下载并优化图片: {output_path}")
        else:
            print(f"下载图片失败: {url}, 状态码: {response.status_code}")
    except Exception as e:
        print(f"处理图片时出错: {url}, 错误: {str(e)}")

def main():
    """主函数"""
    # 创建images/games目录
    os.makedirs("images/games", exist_ok=True)
    
    # 下载并优化所有游戏缩略图
    for game_name, url in THUMBNAIL_MAPPING.items():
        output_path = f"images/games/{game_name}.jpg"
        download_and_optimize_image(url, output_path)

if __name__ == "__main__":
    main() 