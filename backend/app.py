from flask import Flask, jsonify, request
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
from flask_cors import CORS
from collections import defaultdict
import logging

app = Flask(__name__)
CORS(app)

# Configuration du logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration de la connexion à la base de données PostgreSQL
POSTGRES_USER = 'jo2024_fatima'
POSTGRES_PASSWORD = 'Ipssi2024!'
POSTGRES_DB = 'jo2024_postgres'
POSTGRES_HOST = 'postgresql-jo2024.alwaysdata.net'
POSTGRES_PORT = '5432'

# Chaîne de connexion à la base de données
DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

# Créer un moteur SQLAlchemy pour la connexion à la base de données
engine = create_engine(DATABASE_URL)

# Route pour la page d'accueil
@app.route('/')
def home():
    return jsonify({"message": "Bienvenue sur l'API des JO 2024!"}), 200

# Route pour récupérer toutes les données de la table "olympic_medals"
@app.route('/medals', methods=['GET'])
def get_all_medals():
    try:
        # Se connecter à la base de données
        conn = engine.connect()
        
        # Récupérer les années, les pays & disciplines uniques de toute la table
        query_years = conn.execute(text("SELECT DISTINCT year FROM olympic_medals ORDER BY year DESC"))
        query_disciplines = conn.execute(text("SELECT DISTINCT discipline_title FROM olympic_medals ORDER BY discipline_title ASC"))
        query_countries = conn.execute(text("SELECT DISTINCT country_name FROM olympic_medals ORDER BY country_name ASC"))
        query_medal_type = conn.execute(text("SELECT DISTINCT medal_type FROM olympic_medals ORDER BY medal_type ASC"))
        query_slug_game = conn.execute(text("SELECT DISTINCT slug_game FROM olympic_medals ORDER BY slug_game ASC"))
        query_event_gender = conn.execute(text("SELECT DISTINCT event_gender FROM olympic_medals "))
    
        # Get unique data 
        unique_years = [row[0] for row in query_years]
        unique_disciplines = [row[0] for row in query_disciplines]
        unique_countries = [row[0] for row in query_countries]
        unique_medal_type = [row[0] for row in query_medal_type]
        unique_slug_game = [row[0] for row in query_slug_game]
        unique_event_gender = [row[0] for row in query_event_gender]

        # Récupérer les paramètres de requête pour les filtres et la pagination
        discipline_title = request.args.get('discipline_title', '')
        country_name = request.args.get('country_name', '')
        event_gender = request.args.get('event_gender', '')
        slug_game = request.args.get('slug_game', '')
        year = request.args.get('year', '')
        medal_type = request.args.get('medal_type', '')
        limit = int(request.args.get('limit', 50))  # Limite par défaut à 100
        page = int(request.args.get('page', 1))
        sort_by = request.args.get('sort_by', default='discipline_title', type=str)
        sort_order = request.args.get('sort_order', default='asc', type=str)

        # Valider le champ de tri
        valid_sort_columns = ['discipline_title', 'country_name', 'year', 'athlete_full_name']
        if sort_by not in valid_sort_columns:
            return jsonify({"error": "Invalid sort column"}), 400
        
        # Construire la requête de filtrage
        filters = []
        if discipline_title:
            filters.append("discipline_title ILIKE :discipline_title")
        if country_name:
            filters.append("country_name ILIKE :country_name")
        if event_gender:
            filters.append("event_gender ILIKE :event_gender")
        if year:
            filters.append("year = :year")
        if medal_type:
            filters.append("medal_type ILIKE :medal_type")
        if slug_game:
            filters.append("medal_type = :slug_game")

        filter_query = ' AND '.join(filters) if filters else 'TRUE'
        offset = (page - 1) * limit

        query = text(f'''
            SELECT * FROM "public"."olympic_medals" 
            WHERE {filter_query} 
            ORDER BY {sort_by} {sort_order}
            LIMIT :limit OFFSET :offset
        ''')

        # Récupérer le nombre total d'éléments correspondant aux filtres appliqués
        total_items_query = text(f'''
            SELECT COUNT(*) FROM "public"."olympic_medals" 
            WHERE {filter_query}
        ''')

        # Paramètres pour la requête
        params = {
            'discipline_title': f'%{discipline_title}%',
            'country_name': f'%{country_name}%',
            'event_gender': f'%{event_gender}%',
            'year': year,
            'medal_type': f'%{medal_type}%',
            'slug_game': f'%{slug_game}%',
            'limit': limit,
            'offset': offset
        }

        result = conn.execute(query, params)
        total_items_result = conn.execute(total_items_query, params)

        # Convertir les résultats en format JSON
        data = []
        for row in result:
            medal_dict = {
                "discipline_title": row[0],
                "slug_game": row[1],
                "event_title": row[2],
                "event_gender": row[3],
                "medal_type": row[4],
                "participant_type": row[5],
                "participant_title": row[6],
                "athlete_full_name": row[7],
                "country_name": row[8],
                "country_code": row[9],
                "year": row[10]
            }
            data.append(medal_dict)
        
        # Récupérer le nombre total d'éléments à partir du résultat de la requête
        total_items = total_items_result.fetchone()[0]

        # Fermer la connexion à la base de données
        conn.close()
        
        # Retourner les données ainsi que le nombre total d'éléments
        return jsonify({
            "medals": data,
            "unique_years": unique_years,
            "unique_disciplines": unique_disciplines,
            "unique_countries": unique_countries,
            "unique_medal_type" : unique_medal_type,
            "unique_event_gender" : unique_event_gender,
            "unique_slug_game" : unique_slug_game,
            "total_items": total_items
        }), 200

    except OperationalError as e:
        # En cas d'échec de la connexion, renvoyer un message d'erreur
        return f"Erreur de connexion à la base de données : {str(e)}", 500
    except IndexError as e:
        # En cas d'erreur d'indexation, renvoyer un message d'erreur spécifique
        return f"Erreur d'indexation : {str(e)}", 500


# Route pour récupérer toutes les données de la table "olympic_athletes
@app.route('/athletes', methods=['GET'])
def get_all_athletes():
    try:
        # Se connecter à la base de données
        conn = engine.connect()

        # Récupérer les années de naissance uniques de toute la table
        query_athletesBirth = conn.execute(text("SELECT DISTINCT athlete_year_birth FROM olympic_athletes ORDER BY athlete_year_birth DESC"))
        query_firstGames = conn.execute(text("SELECT DISTINCT first_game FROM olympic_athletes ORDER BY first_game ASC"))

        # Get unique data 
        unique_athletesBirth = [row[0] for row in query_athletesBirth]
        unique_firstGame = [row[0] for row in query_firstGames]

        # Récupérer les paramètres de requête pour les filtres et la pagination
        athlete_name = request.args.get('athlete_full_name', default='', type=str)
        athlete_year_birth = request.args.get('athlete_year_birth', type=int)
        first_game = request.args.get('first_game', type=str)
        limit = int(request.args.get('limit', 50))  # Limite par défaut à 50
        page = int(request.args.get('page', 1))
        sort_by = request.args.get('sort_by', default='athlete_full_name', type=str)
        sort_order = request.args.get('sort_order', default='asc', type=str)

        # Valider le champ de tri
        valid_sort_columns = ['athlete_full_name', 'games_participations', 'athlete_year_birth', 'gold_medals', 'silver_medals', 'bronze_medals']
        if sort_by not in valid_sort_columns:
            return jsonify({"error": "Invalid sort column"}), 400

        # Construire la requête de filtrage
        filters = []
        if athlete_name:
            filters.append('athlete_full_name ILIKE :athlete_name')
        if athlete_year_birth:
            filters.append('athlete_year_birth = :athlete_year_birth')
        if first_game:
            filters.append('first_game = :first_game')

        filter_query = ' AND '.join(filters) if filters else 'TRUE'
        offset = (page - 1) * limit

        query = text(f'''
            SELECT * FROM "public"."olympic_athletes" 
            WHERE {filter_query} 
            ORDER BY {sort_by} {sort_order}
            LIMIT :limit OFFSET :offset
        ''')

        # Récupérer le nombre total d'éléments correspondant aux filtres appliqués
        total_items_query = text(f'''
            SELECT COUNT(*) FROM "public"."olympic_athletes" 
            WHERE {filter_query}
        ''')
        
        # Paramètres pour la requête
        params = {
            'athlete_name': f'%{athlete_name}%' if athlete_name else None,
            'athlete_year_birth': athlete_year_birth,
            'first_game': first_game,
            'offset': offset,
            'limit': limit
        }

        # Exécuter la requête SQL avec les paramètres de filtrage
        result = conn.execute(query, params)
        total_items_result = conn.execute(total_items_query, params)

        # Convertir les résultats en format JSON et les renvoyer
        data = []
        for row in result:
            athlete_dict = {
                "athlete_url": row[0],
                "athlete_full_name": row[1],
                "games_participations": row[2],
                "first_game": row[3],
                "athlete_year_birth": row[4],
                "bio": row[5],
                "gold_medals": row[6],
                "silver_medals": row[7],
                "bronze_medals": row[8]
            }
            data.append(athlete_dict)
        
        # Récupérer le nombre total d'éléments à partir du résultat de la requête
        total_items = total_items_result.fetchone()[0]

        # Fermer la connexion à la base de données
        conn.close()
        
        return jsonify({
            "athletes": data,
            "unique_athletesBirth": unique_athletesBirth,
            "unique_firstGame": unique_firstGame,
            "total_items": total_items
        }), 200

    except OperationalError as e:
        # En cas d'échec de la connexion, renvoyer un message d'erreur
        return f"Erreur de connexion à la base de données : {str(e)}", 500
    except IndexError as e:
        # En cas d'erreur d'indexation, renvoyer un message d'erreur spécifique
        return f"Erreur d'indexation : {str(e)}", 500

    

# Route pour récupérer toutes les données de la table "olympic_hosts"
@app.route('/hosts', methods=['GET'])
def get_all_hosts():
    try:
        # Connexion à la base de données
        conn = engine.connect()

        # Récupérer les saisons et les années de jeu uniques
        query_season = conn.execute(text("SELECT DISTINCT game_season FROM olympic_hosts ORDER BY game_season ASC"))
        query_gamesYear = conn.execute(text("SELECT DISTINCT game_year FROM olympic_hosts ORDER BY game_year ASC"))

        # Extraire les données uniques
        unique_season = [row[0] for row in query_season]
        unique_gameYear = [row[0] for row in query_gamesYear]

        # Récupérer les paramètres de requête pour les filtres et la pagination
        game_season = request.args.get('game_season', default='', type=str)
        game_year = request.args.get('game_year', type=int)
        limit = int(request.args.get('limit', 50))  # Limite par défaut à 50
        page = int(request.args.get('page', 1))
        sort_by = request.args.get('sort_by', default='game_location', type=str)
        sort_order = request.args.get('sort_order', default='asc', type=str)

        # Valider le champ de tri
        valid_sort_columns = ['game_location', 'game_year']
        if sort_by not in valid_sort_columns:
            return jsonify({"error": "Invalid sort column"}), 400
        
        # Construire la requête de filtrage
        filters = []
        if game_season:
            filters.append('game_season ILIKE :game_season')
        if game_year:
            filters.append('game_year = :game_year')

        filter_query = ' AND '.join(filters) if filters else 'TRUE'
        offset = (page - 1) * limit

        query = text(f'''
            SELECT * FROM "public"."olympic_hosts" 
            WHERE {filter_query} 
            ORDER BY {sort_by} {sort_order}
            LIMIT :limit OFFSET :offset
        ''')

        # Récupérer le nombre total d'éléments correspondant aux filtres appliqués
        total_items_query = text(f'''
            SELECT COUNT(*) FROM "public"."olympic_hosts" 
            WHERE {filter_query}
        ''')

        # Paramètres pour la requête
        params = {
            'game_season': f'%{game_season}%' if game_season else None,
            'game_year': game_year,
            'offset': offset,
            'limit': limit
        }

        # Exécuter la requête SQL avec les paramètres de filtrage
        result = conn.execute(query, params)
        total_items_result = conn.execute(total_items_query, params)

        # Convertir les résultats en format JSON
        data = []
        for row in result:
            host_dict = {
                "index": row[0],
                "game_slug": row[1],
                "game_end_date": row[2],
                "game_start_date": row[3],
                "game_location": row[4],
                "game_name": row[5],
                "game_season": row[6],
                "game_year": row[7],
                "start_year": row[8]
            }
            data.append(host_dict)
        
        # Récupérer le nombre total d'éléments à partir du résultat de la requête
        total_items = total_items_result.fetchone()[0]

        conn.close()
        return jsonify({
            "hosts": data,
            "unique_season": unique_season,
            "unique_gamesYear": unique_gameYear,
            "total_items": total_items
        }), 200

    except OperationalError as e:
        return f"Erreur de connexion à la base de données : {str(e)}", 500


# Route pour récupérer toutes les données de la table "olympic_results"
@app.route('/results', methods=['GET'])
def get_all_results():
    try:
        # Se connecter à la base de données
        conn = engine.connect()
        
        # Récupérer les disciplines, les types de participants, et les pays uniques de toute la table
        query_disciplines = conn.execute(text("SELECT DISTINCT discipline_title FROM olympic_results ORDER BY discipline_title ASC"))
        query_participant_types = conn.execute(text("SELECT DISTINCT participant_type FROM olympic_results ORDER BY participant_type ASC"))
        query_countries = conn.execute(text("SELECT DISTINCT country_name FROM olympic_results ORDER BY country_name ASC"))
        query_medal_types = conn.execute(text("SELECT DISTINCT medal_type FROM olympic_results ORDER BY medal_type ASC"))
        query_slug_games = conn.execute(text("SELECT DISTINCT slug_game FROM olympic_results ORDER BY slug_game ASC"))

        # Get unique data 
        unique_disciplines = [row[0] for row in query_disciplines]
        unique_participant_types = [row[0] for row in query_participant_types]
        unique_countries = [row[0] for row in query_countries]
        unique_medal_types = [row[0] for row in query_medal_types]
        unique_slug_games = [row[0] for row in query_slug_games]

        # Récupérer les paramètres de requête pour les filtres et la pagination
        discipline_title = request.args.get('discipline_title', '')
        participant_type = request.args.get('participant_type', '')
        country_name = request.args.get('country_name', '')
        medal_type = request.args.get('medal_type', '')
        slug_game = request.args.get('slug_game', '')
        limit = int(request.args.get('limit', 50))  # Limite par défaut à 50
        page = int(request.args.get('page', 1))
        sort_by = request.args.get('sort_by', default='discipline_title', type=str)
        sort_order = request.args.get('sort_order', default='asc', type=str)

        # Valider le champ de tri
        valid_sort_columns = ['discipline_title', 'country_name', 'participant_type', 'athlete_full_name']
        if sort_by not in valid_sort_columns:
            return jsonify({"error": "Invalid sort column"}), 400

        # Construire la requête de filtrage
        filters = []
        if discipline_title:
            filters.append("discipline_title ILIKE :discipline_title")
        if participant_type:
            filters.append("participant_type ILIKE :participant_type")
        if country_name:
            filters.append("country_name ILIKE :country_name")
        if medal_type:
            filters.append("medal_type ILIKE :medal_type")
        if slug_game:
            filters.append("slug_game ILIKE :slug_game")

        filter_query = ' AND '.join(filters) if filters else 'TRUE'
        offset = (page - 1) * limit

        query = text(f'''
            SELECT * FROM "public"."olympic_results" 
            WHERE {filter_query} 
            ORDER BY {sort_by} {sort_order}
            LIMIT :limit OFFSET :offset
        ''')

        # Récupérer le nombre total d'éléments correspondant aux filtres appliqués
        total_items_query = text(f'''
            SELECT COUNT(*) FROM "public"."olympic_results" 
            WHERE {filter_query}
        ''')

        # Paramètres pour la requête
        params = {
            'discipline_title': f'%{discipline_title}%',
            'participant_type': f'%{participant_type}%',
            'country_name': f'%{country_name}%',
            'medal_type': f'%{medal_type}%',
            'slug_game': f'%{slug_game}%',
            'limit': limit,
            'offset': offset
        }

        result = conn.execute(query, params)
        total_items_result = conn.execute(total_items_query, params)

        # Convertir les résultats en format JSON
        data = []
        for row in result:
            result_dict = {
                "_c0": row[0],
                "Unnamed: 0": row[1],
                "discipline_title": row[2],
                "event_title": row[3],
                "slug_game": row[4],
                "participant_type": row[5],
                "medal_type": row[6],
                "rank_equal": row[7],
                "rank_position": row[8],
                "country_name": row[9],
                "country_code": row[10],
                "country_3_letter_code": row[11],
                "athlete_url": row[12],
                "athlete_full_name": row[13],
                "value_unit": row[14],
                "value_type": row[15]
            }
            data.append(result_dict)
        
        # Récupérer le nombre total d'éléments à partir du résultat de la requête
        total_items = total_items_result.fetchone()[0]

        # Fermer la connexion à la base de données
        conn.close()
        
        # Retourner les données ainsi que le nombre total d'éléments
        return jsonify({
            "results": data,
            "unique_disciplines": unique_disciplines,
            "unique_participant_types": unique_participant_types,
            "unique_countries": unique_countries,
            "unique_medal_types": unique_medal_types,
            "unique_slug_games": unique_slug_games,
            "total_items": total_items
        }), 200

    except OperationalError as e:
        # En cas d'échec de la connexion, renvoyer un message d'erreur
        return f"Erreur de connexion à la base de données : {str(e)}", 500
    except IndexError as e:
        # En cas d'erreur d'indexation, renvoyer un message d'erreur spécifique
        return f"Erreur d'indexation : {str(e)}", 500

if __name__ == "__main__":
    app.run(debug=True)