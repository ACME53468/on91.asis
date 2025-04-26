import json
import os
from pathlib import Path
from generate_game_page import create_game_page

def load_games_data():
    """Load games data from JSON file"""
    with open('games_data.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_all_game_pages():
    """Generate HTML pages for all games"""
    # Load games data
    data = load_games_data()
    
    # Create games directory if it doesn't exist
    games_dir = Path('games')
    games_dir.mkdir(exist_ok=True)
    
    # Generate pages for each game
    for game in data['games']:
        # Create category directory
        category_dir = games_dir / game['category']
        category_dir.mkdir(exist_ok=True)
        
        # Generate game page
        create_game_page(game)
        print(f"Generated page for {game['title']}")

if __name__ == '__main__':
    generate_all_game_pages() 