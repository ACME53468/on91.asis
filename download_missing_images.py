import os
import requests
from PIL import Image
from io import BytesIO

# 创建images/games目录（如果不存在）
os.makedirs('images/games', exist_ok=True)

# 需要下载的图片列表
images_to_download = [
    {
        'url': 'https://placehold.co/512x512/png?text=Fall+Boys',
        'filename': 'fall-boys.jpg'
    },
    {
        'url': 'https://placehold.co/512x512/png?text=Tetris',
        'filename': 'tetris.jpg'
    },
    {
        'url': 'https://placehold.co/512x512/png?text=Tap+Tap+Shots',
        'filename': 'tap-tap-shots.jpg'
    }
]

def download_image(url, filename):
    """下载图片并保存到指定路径"""
    try:
        response = requests.get(url, verify=False)  # 禁用SSL验证
        if response.status_code == 200:
            # 使用PIL打开图片
            img = Image.open(BytesIO(response.content))
            
            # 如果图片是RGBA模式，转换为RGB
            if img.mode == 'RGBA':
                # 创建白色背景
                background = Image.new('RGB', img.size, 'white')
                # 将原图粘贴到白色背景上
                background.paste(img, mask=img.split()[3])  # 使用alpha通道作为mask
                img = background
            
            # 保存为JPEG格式
            img.save(f'images/games/{filename}', 'JPEG')
            print(f"成功下载图片: {filename}")
        else:
            print(f"下载图片失败: {filename}, 状态码: {response.status_code}")
    except Exception as e:
        print(f"下载图片时出错: {filename}, 错误: {str(e)}")

def main():
    """主函数"""
    # 禁用SSL验证警告
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    
    for image in images_to_download:
        # 检查文件是否已存在
        if not os.path.exists(f'images/games/{image["filename"]}'):
            download_image(image['url'], image['filename'])
        else:
            print(f"图片已存在: {image['filename']}")

if __name__ == "__main__":
    main() 