
import axios from 'axios';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

// HOOKS
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const HostsTable = () => {
    // STATE 
    const [hosts, setHosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({ game_season: '', game_year: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [gamesSeason, setgamesSeason] = useState([]);
    const [gamesYear, setGamesYear] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
    const [sortBy, setSortBy] = useState('game_location');
    const [sortOrder, setSortOrder] = useState('asc');
    const [totalDisplayedResults, setTotalDisplayedResults] = useState(0);
    const [limit, setLimit] = useState(50);

    // CONSTANTS
    const location = useLocation();
    const navigate = useNavigate();

    // EFFECTS
    useEffect(() => {

        // Recuperer les parametres d'url
        const queryParams = new URLSearchParams(location.search);
        const page = parseInt(queryParams.get('page')) || 1;
        const limit = parseInt(queryParams.get('limit')) || 50;
        const sort_by = queryParams.get('sort_by') || 'game_location';
        const sort_order = queryParams.get('sort_order') || 'asc';
        const game_season = queryParams.get('game_season') || '';
        const game_year = queryParams.get('game_year') || '';

        setCurrentPage(page);
        setFilters({ game_season, game_year });
        setLimit(limit);
        setSortBy(sort_by);
        setSortOrder(sort_order);

        // fetch data
        const fetchHosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/hosts', 
                    {
                        params: { 
                            game_season,
                            game_year,
                            page,
                            limit,
                            sort_by,
                            sort_order
                        }
                    }
                );
                // Extraire les données a partir de la reponse
                console.log('HOST', response.data);
                setHosts(response.data.hosts);
                setgamesSeason(response.data.unique_season);
                setGamesYear(response.data.unique_gamesYear);
                setTotalResult(response.data.total_items);
                // Mettre à jour le total des résultats affichés
                setTotalDisplayedResults(page === 1 ? response.data.hosts.length : totalDisplayedResults + response.data.hosts.length);

            } catch (error) {
                console.error('Error fetching hosts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHosts();
    }, [location.search]);

    // FUNCTIONS 

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
        updateURLParams({ ...filters, [name]: value, page: 1 });
        setTotalDisplayedResults(0);
    };
    const handleLimitChange = (event) => {
        const newLimit = parseInt(event.target.value);
        setLimit(newLimit);
        updateURLParams({ ...filters, page: 1, limit: newLimit });
        setTotalDisplayedResults(0); // Réinitialiser le total affiché lors du changement de limite
    };

    const updateURLParams = (params) => {
        const searchParams = new URLSearchParams();
        Object.keys(params).forEach((key) => {
            if (params[key]) {
                searchParams.set(key, params[key]);
            }
        });
        navigate({ search: searchParams.toString() });
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const goToPage = (pageIndex) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', pageIndex);
        navigate({ search: queryParams.toString() });
        setCurrentPage(pageIndex);
    };

    const handleSort = (column) => {
        let order = 'asc';
        if (sortBy === column && sortOrder === 'asc') {
            order = 'desc';
        }
        setSortBy(column);
        setSortOrder(order);
        updateURLParams({ ...filters, sort_by: column, sort_order: order, page: 1 });
    };

    const renderSortIcon = (column) => {
        if (sortBy === column) {
            return sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />;
        }
        return <FontAwesomeIcon icon={faSort} />;
    };

    return (
        <div className="container mt">
            <h1>Tableau des Pays d'accueil</h1>
            <div>
                <div className='top mb-3'>
                    <p className='resultInfo'>{hosts && hosts.length} résultat(s)</p>
                    <div className='filterBlock'>
                        <button onClick={toggleFilters} className="btn btn-primary">
                            <FontAwesomeIcon icon={faFilter} /> Filtre
                        </button>
                        <select 
                            value={limit} 
                            onChange={handleLimitChange} 
                            className="form-select ml-2"
                            style={{ width: '100px', display: 'inline-block' }}
                        >
                            {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {showFilters && (
                    <div className="filter-section">
                        {/* Première colonne de sélecteurs */}
                        <div className="filter-column">
                            <select
                            className="form-select ml-2 mb-2"
                            name="game_season"
                            value={filters.game_season}
                            onChange={handleFilterChange}
                        >
                                <option value="">Sélectionner par saisons</option>
                                {gamesSeason && gamesSeason.map((birth) => (
                                    <option key={birth} value={birth}>
                                        {birth}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Deuxieme colonne de sélecteurs */}
                        <div className="filter-column">
                        <select
                            className="form-select ml-2 mb-2"
                            name="game_year"
                            value={filters.game_year}
                            onChange={handleFilterChange}
                        >
                                <option value="">Rechercher par année</option>
                                {gamesYear && gamesYear.map((game) => (
                                    <option key={game} value={game}>
                                        {game}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <table className="table table-dark table-striped-columns">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('game_location')}>Lieu{renderSortIcon('game_location')}</th>
                        <th>Nom du jeu</th>
                        <th>Saison</th>
                        <th onClick={() => handleSort('game_year')}>Année{renderSortIcon('game_year')}</th>
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
            <div className='bottom'>
                <div className="pagination">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                        <MdArrowBackIosNew /> Précédent
                    </button>
                    <span>Page {currentPage}</span>
                    <button onClick={() => goToPage(currentPage + 1)} disabled={hosts.length < limit}>
                        Suivant <MdArrowForwardIos />
                    </button>
                </div>
                <p className='tableLengthInfo'>Vous avez vu {totalDisplayedResults} résultat(s) sur {totalResult}</p>
            </div>
        </div>
    );
};

export default HostsTable;
