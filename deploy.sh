#!/bin/bash

# 部署脚本 - 将游戏网站部署到 on91.asia

echo "开始部署 GameHub 游戏网站到 on91.asia..."

# 检查是否安装了必要的工具
if ! command -v rsync &> /dev/null; then
    echo "错误: 未安装 rsync。请先安装 rsync。"
    exit 1
fi

# 设置变量
REMOTE_HOST="your-username@on91.asia"  # 替换为你的用户名
REMOTE_PATH="/var/www/html/"  # 替换为你的网站根目录
LOCAL_PATH="."

# 确认部署
read -p "确定要部署到 $REMOTE_HOST:$REMOTE_PATH 吗? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "部署已取消。"
    exit 1
fi

# 使用 rsync 上传文件
echo "正在上传文件..."
rsync -avz --exclude '.git' --exclude 'deploy.sh' $LOCAL_PATH/ $REMOTE_HOST:$REMOTE_PATH

# 检查上传是否成功
if [ $? -eq 0 ]; then
    echo "部署成功！网站已上传到 on91.asia"
    echo "请访问 https://on91.asia 查看网站"
else
    echo "部署失败，请检查错误信息。"
    exit 1
fi

echo "部署完成！" 