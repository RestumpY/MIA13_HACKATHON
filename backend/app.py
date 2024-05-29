from flask import Flask, jsonify
import pickle

app = Flask(__name__)

@app.route('/medals/<country>', methods=['GET'])
def get_medals_by_country(country):
    # Charger le modèle de ML/DL pré-enregistré 
    model = pickle.load(open('model.pkl', 'rb'))

    # TODO: prédire les médailles pour le pays ciblé

    # data = {
    #     "country": country,
    #     "gold": 1,
    #     "silver": 2,
    #     "bronze": 3
    # }

    return jsonify(data), 200


@app.route('/country/top25', methods=['GET'])
def get_top_25_countries():
    # Charger le modèle de ML/DL pré-enregistré 
    model = pickle.load(open('model.pkl', 'rb'))

    # TODO: prédire les 25 meilleurs pays et leurs médailles respectives

    # data = [
    #     {
    #         "country": "FRA",
    #         "gold": 1,
    #         "silver": 2,
    #         "bronze": 3,
    #     },
    #     {
    #         "country": "USA",
    #         "gold": 4,
    #         "silver": 5,
    #         "bronze": 6,
    #     },
    # ]

    return jsonify(data), 200


@app.route('/winners', methods=['GET'])
def get_winners():
    # Charger le modèle de ML/DL pré-enregistré 
    model = pickle.load(open('model.pkl', 'rb'))

    # TODO: prédire la liste des athlètes gagnants

    # data = [
    #     {
    #         "name": "John",
    #         "country": "USA",
    #         "gold": 0,
    #         "silver": 2,
    #         "bronze": 1,
    #     },
    #     {
    #         "name": "Jane",
    #         "country": "FRA",
    #         "gold": 0,
    #         "silver": 1,
    #         "bronze": 0,
    #     },
    #     {
    #         "name": "Bob",
    #         "country": "FRA",
    #         "gold": 1,
    #         "silver": 0,
    #         "bronze": 1,
    #     },
    # ]

    return jsonify(data), 200



@app.route('/country/groups', methods=['GET'])
def get_country_groups():
    # Charger le modèle de ML/DL pré-enregistré 
    model = pickle.load(open('model.pkl', 'rb'))

    # TODO: prédire la classification des pays par groupes

    # data = [
    #     {
    #         "groupId": 1,
    #         "countries": ["FRA", "USA", "JPN", "CHN", "RUS"],
    #     },
    #     {
    #         "groupId": 2,
    #         "countries": ["ITA", "GBR", "SWE", "NOR", "ESP"],
    #     },
    # ]

    return jsonify(data), 200


if __name__ == "__main__":
    app.run(debug=True)