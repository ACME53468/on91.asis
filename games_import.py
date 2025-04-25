import csv
import os
from datetime import datetime

def create_games_csv(games_data, output_file='games_import.csv'):
    """
    Generate a CSV file for CMS import with all game data.
    
    Args:
        games_data (list): List of dictionaries containing game information
        output_file (str): Output CSV file path
    """
    # Define CSV headers for WordPress import
    headers = [
        'post_title',           # Game title
        'post_content',         # Game description
        'post_excerpt',         # Short description
        'post_status',          # publish
        'post_type',            # game
        'post_category',        # Game category
        'post_tags',            # Additional tags
        'custom_fields',        # Game metadata
        'featured_image',       # Thumbnail URL
        'game_type',            # Game type
        'iframe_url',           # Game iframe URL
        'features',             # Game features
        'how_to_play',          # How to play instructions
        'controls',             # Game controls
        'game_highlights',      # Game highlights
        'quick_start',          # Quick start guide
        'game_screenshots',     # Game screenshots
        'game_guide',           # Game guide
        'game_tips',            # Game tips
        'game_developer',       # Game developer
        'developer_story',      # Developer story
        'post_date',            # Publication date
        'post_author',          # Author
        'post_slug'             # URL-friendly name
    ]
    
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        
        for game in games_data:
            # Format custom fields as JSON string
            custom_fields = {
                'game_type': game['type'],
                'iframe_url': game['iframe_url'],
                'features': game['features'],
                'how_to_play': game['how_to_play'],
                'controls': game['controls'],
                'game_highlights': game.get('highlights', ''),
                'quick_start': game.get('quick_start', ''),
                'game_screenshots': game.get('screenshots', ''),
                'game_guide': game.get('guide', ''),
                'game_tips': game.get('tips', ''),
                'game_developer': game.get('developer', ''),
                'developer_story': game.get('developer_story', '')
            }
            
            # Create row data
            row = {
                'post_title': game['title'],
                'post_content': game['description'],
                'post_excerpt': game['short_description'],
                'post_status': 'publish',
                'post_type': 'game',
                'post_category': game['category'],
                'post_tags': ','.join(game['additional_tags']),
                'custom_fields': str(custom_fields),
                'featured_image': game['thumbnail'],
                'game_type': game['type'],
                'iframe_url': game['iframe_url'],
                'features': '|'.join(game['features']),
                'how_to_play': game['how_to_play'],
                'controls': game['controls'],
                'game_highlights': game.get('highlights', ''),
                'quick_start': game.get('quick_start', ''),
                'game_screenshots': game.get('screenshots', ''),
                'game_guide': game.get('guide', ''),
                'game_tips': game.get('tips', ''),
                'game_developer': game.get('developer', ''),
                'developer_story': game.get('developer_story', ''),
                'post_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'post_author': 'admin',
                'post_slug': game['slug']
            }
            writer.writerow(row)
    
    print(f"Generated CSV file: {output_file}")

def main():
    # Example games data
    games = [
        {
            'title': 'Monster Survivors',
            'type': 'Action Game',
            'category': 'Action',
            'slug': 'monster-survivors',
            'short_description': 'An epic survival action game where you battle waves of monsters and evolve your character',
            'description': 'Monster Survivors is an action-packed survival game that challenges players to survive against endless waves of monsters. With its unique evolution system and strategic gameplay, players must make crucial decisions to enhance their character\'s abilities and survive increasingly difficult challenges.',
            'thumbnail': '/images/games/monster-survivors.jpg',
            'iframe_url': 'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/index-og.html',
            'additional_tags': ['Survival', 'Roguelike'],
            'features': [
                'Dynamic combat system with multiple weapon choices',
                'Character evolution and skill progression',
                'Diverse monster types with unique abilities',
                'Strategic gameplay requiring tactical decisions',
                'Progressive difficulty scaling'
            ],
            'how_to_play': 'Use your mouse or touch controls to move your character and attack monsters. Collect experience points to level up and choose new abilities. The longer you survive, the stronger the monsters become. Can you survive the endless waves of monsters and become the ultimate survivor?',
            'controls': '''
                <ul class="list-disc list-inside text-gray-600 space-y-2">
                    <li><strong>WASD</strong> or <strong>Arrow Keys</strong> - Move character</li>
                    <li><strong>Mouse</strong> - Aim and attack</li>
                    <li><strong>Space</strong> - Special ability</li>
                    <li><strong>E</strong> - Interact with objects</li>
                </ul>
            ''',
            'highlights': 'Monster Survivors combines fast-paced action with strategic depth. The unique evolution system allows you to customize your character\'s abilities as you progress, creating a different experience with each playthrough.',
            'quick_start': 'Click the "Start Game" button to begin. Use WASD or arrow keys to move, and your mouse to aim and attack. Collect experience orbs to level up and choose new abilities.',
            'screenshots': '''
                /images/games/monster-survivors/screenshot1.jpg
                /images/games/monster-survivors/screenshot2.jpg
                /images/games/monster-survivors/screenshot3.jpg
            ''',
            'guide': '''
                <h3>游戏攻略</h3>
                <p>在Monster Survivors中，生存是关键。以下是一些帮助你取得高分的策略：</p>
                <ol>
                    <li>优先升级移动速度，这样你可以更容易地躲避怪物</li>
                    <li>在游戏初期，专注于收集经验值而不是击杀怪物</li>
                    <li>选择互补的能力组合，如范围攻击和减速效果</li>
                    <li>注意地图边界，避免被怪物包围</li>
                    <li>在Boss战前保存特殊能力</li>
                </ol>
            ''',
            'tips': '''
                <ul>
                    <li>使用墙壁作为掩护，让怪物互相阻挡</li>
                    <li>在升级时，优先考虑生存能力而非攻击力</li>
                    <li>注意收集地图上的能量道具，它们可以临时提升你的能力</li>
                    <li>不同的武器有不同的攻击模式，根据情况选择最适合的</li>
                </ul>
            ''',
            'developer': 'GameStudio X',
            'developer_story': 'Monster Survivors最初是一个游戏开发比赛的作品，在获得玩家热烈反响后，我们决定将其开发成一个完整的游戏。开发团队花费了6个月时间，添加了更多怪物类型、能力和关卡，以创造更加丰富和具有挑战性的游戏体验。'
        }
        # Add more games here
    ]
    
    # Generate the CSV file
    create_games_csv(games)

if __name__ == '__main__':
    main() 