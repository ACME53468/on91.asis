import os
import json
from pathlib import Path

def create_index_page(games_data):
    """
    Create the main index page using the template and game data.
    
    Args:
        games_data (dict): Dictionary containing game data organized by category
    """
    # Read the template
    with open('index_template.html', 'r', encoding='utf-8') as f:
        template = f.read()
    
    # Generate featured games HTML
    featured_games_html = []
    for category, games in games_data.items():
        for game in games[:2]:  # Take first 2 games from each category
            featured_games_html.append(f'''
                <div class="game-card">
                    <img src="{game['thumbnail']}" alt="{game['title']}">
                    <h3>{game['title']}</h3>
                    <p>{game['short_description']}</p>
                    <a href="/games/{category}/{game['slug']}" class="play-button">Play Now</a>
                </div>
            ''')
    
    # Generate category cards HTML
    category_cards_html = []
    for category in games_data.keys():
        category_name = category.capitalize()
        category_cards_html.append(f'''
            <div class="category-card">
                <h3>{category_name}</h3>
                <p>Play the best {category_name.lower()} games online!</p>
                <a href="/games/{category}" class="category-link">Browse {category_name} Games</a>
            </div>
        ''')
    
    # Replace placeholders in template
    index_html = template.replace('{{featured_games}}', '\n'.join(featured_games_html))
    index_html = index_html.replace('{{category_cards}}', '\n'.join(category_cards_html))
    
    # Write the generated HTML to index.html
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(index_html)
    
    print(f"Created index page at index.html")

if __name__ == '__main__':
    # Example game data
    games_data = {
        'action': [
            {
                'title': 'Monster Survivors',
                'slug': 'monster-survivors',
                'short_description': 'An intense survival action game where you battle waves of monsters.',
                'thumbnail': 'assets/images/games/action/monster-survivors.jpg'
            },
            {
                'title': 'Space Shooter',
                'slug': 'space-shooter',
                'short_description': 'Classic space shooting game with modern graphics.',
                'thumbnail': 'assets/images/games/action/space-shooter.jpg'
            }
        ],
        'adventure': [
            {
                'title': 'Lost Treasure',
                'slug': 'lost-treasure',
                'short_description': 'Embark on an epic adventure to find ancient treasures.',
                'thumbnail': 'assets/images/games/adventure/lost-treasure.jpg'
            }
        ]
    }
    
    create_index_page(games_data) 