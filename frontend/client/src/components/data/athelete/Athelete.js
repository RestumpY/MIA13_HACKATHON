import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AthletesTable = () => {
    const [filteredAthletes, setFilteredAthletes] = useState([]); // Initialisez comme un tableau vide
    const [filterName, setFilterName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filterBirthYear, setFilterBirthYear] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAthletes = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/athletes', {
                    params: { limit: 100 }
                });
                if (response.data) {
                    setFilteredAthletes(response.data);
                } else {
                    console.error('Response data is not an array');
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAthletes();
    }, []); // Mettre un tableau vide pour ne s'exécuter qu'une seule fois

    const handleNameFilterChange = (event) => {
        setFilterName(event.target.value);
        applyFilters(event.target.value, filterBirthYear);
    };

    const handleBirthYearFilterChange = (event) => {
        setFilterBirthYear(event.target.value);
        applyFilters(filterName, event.target.value);
    };

    const applyFilters = (name, birthYear) => {
        let filtered = filteredAthletes;

        if (name) {
            filtered = filtered.filter(athlete =>
                athlete.athlete_full_name.toLowerCase().includes(name.toLowerCase())
            );
        }

        if (birthYear) {
            filtered = filtered.filter(athlete =>
                athlete.athlete_year_birth === parseInt(birthYear)
            );
        }

        setFilteredAthletes(filtered);
    };

    return (
        <div className="container mt" style={{ width: '100%' }}>
            <h1>Tableau des Athlètes</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    value={filterName}
                    onChange={handleNameFilterChange}
                    placeholder="Rechercher par nom"
                />
                <input
                    type="number"
                    className="form-control"
                    value={filterBirthYear}
                    onChange={handleBirthYearFilterChange}
                    placeholder="Filtrer par année de naissance"
                />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Participations aux jeux</th>
                        <th>Premier jeux</th>
                        <th>Année de naissance</th>
                        <th>Médaille</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? <p>Loading ...</p> :
                            filteredAthletes.map((athlete, index) => (
                                <tr key={index}>
                                    <td><a href={athlete.athlete_url} target="_blank" rel="noopener noreferrer">{athlete.athlete_full_name}</a></td>
                                    <td>{athlete.games_participations}</td>
                                    <td>{athlete.first_game}</td>
                                    <td>{athlete.athlete_year_birth}</td>
                                    <td>{athlete.athlete_medals}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AthletesTable;
