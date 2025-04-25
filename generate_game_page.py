import os
import json
import shutil
from string import Template

def create_game_page(game_data):
    """
    Generate a game page from the template using the provided game data.
    
    Args:
        game_data (dict): Dictionary containing game information
    """
    # Read the template
    with open('games/template.html', 'r', encoding='utf-8') as f:
        template = Template(f.read())
    
    # Create the game directory if it doesn't exist
    game_dir = os.path.join('games', game_data['category'])
    os.makedirs(game_dir, exist_ok=True)
    
    # Generate the game features HTML
    features_html = '\n'.join([f'<li>{feature}</li>' for feature in game_data['features']])
    
    # Generate additional tags HTML
    additional_tags = ''
    for tag in game_data.get('additional_tags', []):
        additional_tags += f'''
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 ml-2">
                {tag}
            </span>'''
    
    # Replace template variables
    html_content = template.substitute(
        GAME_TITLE=game_data['title'],
        GAME_TYPE=game_data['type'],
        GAME_CATEGORY=game_data['category'],
        GAME_SLUG=game_data['slug'],
        GAME_SHORT_DESCRIPTION=game_data['short_description'],
        GAME_DESCRIPTION=game_data['description'],
        GAME_THUMBNAIL=game_data['thumbnail'],
        GAME_IFRAME_URL=game_data['iframe_url'],
        ADDITIONAL_TAGS=additional_tags,
        GAME_FEATURES=features_html,
        HOW_TO_PLAY=game_data['how_to_play'],
        GAME_CONTROLS=game_data['controls']
    )
    
    # Write the generated HTML to a file
    output_path = os.path.join(game_dir, f"{game_data['slug']}.html")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Generated game page: {output_path}")

def main():
    # Example game data
    monster_survivors = {
        'title': 'Monster Survivors',
        'type': 'Action Game',
        'category': 'action',
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
        '''
    }
    
    # Generate the game page
    create_game_page(monster_survivors)

if __name__ == '__main__':
    main() 