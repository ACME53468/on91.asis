import os
import re
import json
from pathlib import Path

def load_games_data():
    """Load games data from JSON file."""
    with open('games_data.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def create_game_page(game_data):
    """
    Create a game page using the template and game data.
    
    Args:
        game_data (dict): Dictionary containing game information
    """
    # Read the template
    with open('games/template.html', 'r', encoding='utf-8') as f:
        template = f.read()
    
    # Replace placeholders with actual data
    replacements = {
        '{{title}}': game_data['title'],
        '{{category}}': game_data['category'],
        '{{slug}}': game_data['slug'],
        '{{shortDescription}}': game_data['shortDescription'],
        '{{fullDescription}}': game_data['fullDescription'],
        '{{thumbnail}}': game_data['thumbnail'],
        '{{iframeUrl}}': game_data['iframeUrl'],
        '{{features}}': '\n'.join([f'<li>{feature}</li>' for feature in game_data['features']]),
        '{{howToPlay}}': game_data['howToPlay'],
        '{{controls}}': '\n'.join([f'<li><strong>{key}:</strong> {value}</li>' for key, value in game_data['controls'].items()])
    }
    
    # Apply all replacements
    for placeholder, value in replacements.items():
        template = template.replace(placeholder, value)
    
    # Create output directory if it doesn't exist
    output_dir = Path(f'games/{game_data["category"]}')
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Write the generated page
    output_path = output_dir / f'{game_data["slug"]}.html'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(template)
    
    print(f'Created game page: {output_path}')

def generate_category_page(category, games):
    """Generate category page with game cards."""
    category_name = CATEGORY_NAMES.get(category, category.title())
    
    # Create category directory if it doesn't exist
    category_dir = Path(f"games/{category}")
    category_dir.mkdir(parents=True, exist_ok=True)
    
    # Generate game cards HTML
    game_cards = []
    for game in games:
        card = f"""
        <div class="game-card">
            <div class="game-card-image">
                <img src="{game['thumbnail']}" alt="{game['title']}">
            </div>
            <div class="game-card-content">
                <h3>{game['title']}</h3>
                <p>{game['shortDescription']}</p>
                <a href="{game['slug']}.html" class="play-button">Play Now</a>
            </div>
        </div>
        """
        game_cards.append(card)
    
    # Read category template
    with open("games/category_template.html", "r", encoding="utf-8") as f:
        template = f.read()
    
    # Replace placeholders
    html = template.replace("{{category}}", category_name)
    html = html.replace("{{games}}", "\n".join(game_cards))
    
    # Write category page
    output_path = category_dir / "index.html"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    
    print(f"Created category page: {output_path}")

def main():
    """Main function to generate all game pages and category pages."""
    # Load games data
    data = load_games_data()
    games = data['games']
    
    # Group games by category
    games_by_category = {}
    for game in games:
        category = game['category']
        if category not in games_by_category:
            games_by_category[category] = []
        games_by_category[category].append(game)
    
    # Generate category pages
    for category, category_games in games_by_category.items():
        generate_category_page(category, category_games)
    
    # Generate individual game pages
    for game in games:
        create_game_page(game)

if __name__ == "__main__":
    main() 