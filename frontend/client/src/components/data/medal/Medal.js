import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedalsTable = () => {
    const [medals, setMedals] = useState([]);
    const [filteredMedals, setFilteredMedals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        medalType: '',
        year: '',
        eventTitle: ''
    });

    useEffect(() => {
        const fetchMedals = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/medals?limit=100');
                setMedals(response.data);
                setFilteredMedals(response.data);
            } catch (error) {
                console.error('Error fetching medals:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMedals();
    }, []);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    useEffect(() => {
        let filteredData = medals;

        if (filters.medalType !== '') {
            filteredData = filteredData.filter(medal => medal.medal_type === filters.medalType);
        }

        if (filters.year !== '') {
            filteredData = filteredData.filter(medal => medal.year === filters.year);
        }

        if (filters.eventTitle !== '') {
            filteredData = filteredData.filter(medal => medal.event_title.toLowerCase().includes(filters.eventTitle.toLowerCase()));
        }

        setFilteredMedals(filteredData);
    }, [filters, medals]);

    return (
        <div className="container mt">
            <h1>Tableau des Médailles</h1>
            <div className="mb-3">
                <input
                    type="text"
                    name="medalType"
                    value={filters.medalType}
                    onChange={handleFilterChange}
                    placeholder="Filtrer par type de médaille"
                    className="form-control mb-2"
                />
                <input
                    type="number"
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChange}
                    placeholder="Filtrer par année"
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    name="eventTitle"
                    value={filters.eventTitle}
                    onChange={handleFilterChange}
                    placeholder="Filtrer par titre d'événement"
                    className="form-control mb-2"
                />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Discipline</th>
                        <th>Slug Game</th>
                        <th>Titre de l'événement</th>
                        <th>Genre de l'événement</th>
                        <th>Type de médaille</th>
                        <th>Type de participant</th>
                        <th>Titre du participant</th>
                        <th>Nom de l'athlète</th>
                        <th>Nom du pays</th>
                        <th>Année</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="11">Chargement en cours...</td>
                        </tr>
                    ) : (
                        filteredMedals.map((medal, index) => (
                            <tr key={index}>
                                <td>{medal.discipline_title}</td>
                                <td>{medal.slug_game}</td>
                                <td>{medal.event_title}</td>
                                <td>{medal.event_gender}</td>
                                <td>{medal.medal_type}</td>
                                <td>{medal.participant_type}</td>
                                <td>{medal.participant_title}</td>
                                <td>{medal.athlete_full_name}</td>
                                <td>{medal.country_name}</td>
                                <td>{medal.year}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MedalsTable;
