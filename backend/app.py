from flask import Flask, jsonify, request
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, origins='http://localhost:3001')

# CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}})

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
# Route pour récupérer toutes les données de la table "olympic_medals"
@app.route('/medals', methods=['GET'])
def get_all_medals():
    try:
        # Se connecter à la base de données
        conn = engine.connect()
        limit = request.args.get('limit', default=100, type=int)
    

        # Exécuter la requête pour récupérer toutes les entrées de la table "olympic_medals"
        query = text('SELECT * FROM "public"."olympic_medals" LIMIT :limit')
        result = conn.execute(query, {'limit': limit})

        # Convertir les résultats en format JSON et les renvoyer
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

        # Fermer la connexion à la base de données
        conn.close()
        
        return jsonify(data), 200

    except OperationalError as e:
        # En cas d'échec de la connexion, renvoyer un message d'erreur
        return f"Erreur de connexion à la base de données : {str(e)}", 500
@app.route('/athletes', methods=['GET'])
def get_all_athletes():
    try:
        # Se connecter à la base de données
        conn = engine.connect()

        # Paramètres de filtrage
        limit = request.args.get('limit', default=100, type=int)
        athlete_name = request.args.get('athlete_name', default='', type=str)
        birth_year = request.args.get('birth_year', default=None, type=int)

        # Construction de la requête SQL avec filtrage
        base_query = 'SELECT * FROM "public"."olympic_athletes" WHERE 1=1'
        if athlete_name:
            base_query += ' AND athlete_full_name LIKE :athlete_name'
        if birth_year is not None:
            base_query += ' AND athlete_year_birth = :birth_year'
        base_query += ' LIMIT :limit'
        
        query = text(base_query)

        # Préparer les paramètres
        params = {
            'athlete_name': f'%{athlete_name}%' if athlete_name else None,
            'birth_year': birth_year,
            'limit': limit
        }

        # Exécuter la requête SQL avec les paramètres de filtrage
        result = conn.execute(query, params)

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

        # Fermer la connexion à la base de données
        conn.close()
        
        return jsonify(data), 200

    except OperationalError as e:
        # En cas d'échec de la connexion, renvoyer un message d'erreur
        return f"Erreur de connexion à la base de données : {str(e)}", 500
    


@app.route('/hosts', methods=['GET'])
def get_all_hosts():
    try:
        conn = engine.connect()
        limit = request.args.get('limit', default=100, type=int)

        query = text('SELECT * FROM "public"."olympic_hosts" LIMIT :limit')
        result = conn.execute(query, {'limit': limit})

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

        conn.close()
        return jsonify(data), 200

    except OperationalError as e:
        return f"Erreur de connexion à la base de données : {str(e)}", 500


if __name__ == "__main__":
    app.run(debug=True)