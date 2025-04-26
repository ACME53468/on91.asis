import os
import json
from pathlib import Path

CATEGORY_NAMES = {
    'action': 'Action Games',
    'adventure': 'Adventure Games',
    'puzzle': 'Puzzle Games',
    'strategy': 'Strategy Games',
    'racing': 'Racing Games',
    'sports': 'Sports Games'
}

def create_category_page(category, games):
    """
    Create a category page using the template and game data.
    
    Args:
        category (str): The category name (e.g., 'action', 'adventure')
        games (list): List of game dictionaries containing game data
    """
    # Read templates
    with open('games/category_template.html', 'r', encoding='utf-8') as f:
        category_template = f.read()
    
    with open('games/game_card_template.html', 'r', encoding='utf-8') as f:
        game_card_template = f.read()
    
    # Generate game cards HTML
    games_html = []
    for game in games:
        game_html = game_card_template
        game_html = game_html.replace('{{title}}', game['title'])
        game_html = game_html.replace('{{description}}', game['short_description'])
        game_html = game_html.replace('{{thumbnail}}', game['thumbnail'])
        game_html = game_html.replace('{{slug}}', game['slug'])
        games_html.append(game_html)
    
    # Generate category page
    category_page = category_template
    category_page = category_page.replace('{{category}}', CATEGORY_NAMES[category])
    category_page = category_page.replace('{{games_grid}}', '\n'.join(games_html))
    
    # Create output directory
    output_dir = Path(f'games/{category}')
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Write the file
    output_path = output_dir / 'index.html'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(category_page)
    
    print(f"Created category page: {output_path}")

# Example usage
if __name__ == '__main__':
    # Example game data
    games = [
        {
            'title': 'Monster Survivors',
            'slug': 'monster-survivors',
            'short_description': 'An intense survival action game where you battle waves of monsters.',
            'thumbnail': '../../assets/images/games/action/monster-survivors.jpg'
        },
        {
            'title': 'Space Shooter',
            'slug': 'space-shooter',
            'short_description': 'Classic space shooting game with modern graphics and effects.',
            'thumbnail': '../../assets/images/games/action/space-shooter.jpg'
        }
    ]
    
    create_category_page('action', games) 