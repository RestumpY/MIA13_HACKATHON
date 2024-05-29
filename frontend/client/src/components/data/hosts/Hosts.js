import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HostsTable = () => {
    const [hosts, setHosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchHosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/hosts');
                setHosts(response.data);
            } catch (error) {
                console.error('Error fetching hosts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHosts();
    }, []);

    return (
        <div className="container mt">
            <h1>Tableau des Pays d'accueil</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lieu</th>
                        <th>Nom du jeu</th>
                        <th>Saison</th>
                        <th>Année</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="4">Chargement en cours...</td>
                        </tr>
                    ) : (
                        hosts.map((host, index) => (
                            <tr key={index}>
                                <td>{host.game_location}</td>
                                <td>{host.game_name}</td>
                                <td>{host.game_season}</td>
                                <td>{host.game_year}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HostsTable;
