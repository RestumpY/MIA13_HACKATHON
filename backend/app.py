from flask import Flask, jsonify
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError

app = Flask(__name__)

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

        # Exécuter la requête pour récupérer toutes les entrées de la table "olympic_medals"
        query = text('SELECT * FROM "public"."olympic_medals"')
        result = conn.execute(query)

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


# Route pour récupérer toutes les données de la table "athletes"
@app.route('/athletes', methods=['GET'])
def get_all_athletes():
    try:
        # Se connecter à la base de données
        conn = engine.connect()

        # Exécuter la requête pour récupérer toutes les entrées de la table "athletes"
        query = text('SELECT * FROM "public"."olympic_athletes"')
        result = conn.execute(query)

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


# Route pour récupérer toutes les données de la table "hosts"
@app.route('/hosts', methods=['GET'])
def get_all_hosts():
    try:
        # Se connecter à la base de données
        conn = engine.connect()

        # Exécuter la requête pour récupérer toutes les entrées de la table "hosts"
        query = text('SELECT * FROM "public"."olympic_hosts"')
        result = conn.execute(query)

        # Convertir les résultats en format JSON et les renvoyer
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

        # Fermer la connexion à la base de données
        conn.close()
        
        return jsonify(data), 200

    except OperationalError as e:
        # En cas d'échec de la connexion, renvoyer un message d'erreur
        return f"Erreur de connexion à la base de données : {str(e)}", 500


# Route pour récupérer toutes les données de la table "results"
@app.route('/results', methods=['GET'])
def get_all_results():
    try:
        # Se connecter à la base de données
        conn = engine.connect()

        # Exécuter la requête pour récupérer toutes les entrées de la table "results"
        query = text('SELECT * FROM "public"."olympic_results"')
        result = conn.execute(query)

        # Convertir les résultats en format JSON et les renvoyer
        data = []
        for row in result:
            result_dict = {
                "discipline_title": row[0],
                "event_title": row[1],
                "slug_game": row[2],
                "participant_type": row[3],
                "medal_type": row[4],
                "rank_equal": row[5],
                "rank_position": row[6],
                "country_name": row[7],
                "country_code": row[8],
                "country_3_letter_code": row[9],
                "athlete_full_name": row[10],
                "value_unit": row[11],
                "value_type": row[12]
            }
            data.append(result_dict)

        # Fermer la connexion à la base de données
        conn.close()
        
        return jsonify(data), 200

    except OperationalError as e:
        # En cas d'échec de la connexion, renvoyer un message d'erreur
        return f"Erreur de connexion à la base de données : {str(e)}", 500

if __name__ == "__main__":
    app.run(debug=True)
