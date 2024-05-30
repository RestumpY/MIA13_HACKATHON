import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

// HOOKS
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const AthletesTable = () => {
    // STATE
    const [athletes, setAthletes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [filters, setFilters] = useState({ athlete_full_name: '', athlete_year_birth: '', first_game: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [athletesBirth, setAthletesBirth] = useState([]);
    const [firstAthGames, setFirstAthGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
    const [sortBy, setSortBy] = useState('athlete_full_name');
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
        const athlete_full_name = queryParams.get('athlete_full_name') || '';
        const athlete_year_birth = queryParams.get('athlete_year_birth') || '';
        const first_game = queryParams.get('first_game') || '';
        const sort_by = queryParams.get('sort_by') || 'athlete_full_name';
        const sort_order = queryParams.get('sort_order') || 'asc';

        setCurrentPage(page);
        setFilters({ athlete_full_name, athlete_year_birth, first_game });
        setLimit(limit);
        setSortBy(sort_by);
        setSortOrder(sort_order);

        // fetch data
        const fetchAthletes = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/athletes', {
                    params: { 
                        athlete_full_name,
                        athlete_year_birth,
                        first_game,
                        page,
                        limit,
                        sort_by,
                        sort_order
                    }
                });

                // Extraire les données a partir de la reponse
                setAthletes(response.data.athletes);
                setTotalResult(response.data.total_items);
                setFirstAthGames(response.data.unique_firstGame);
                // Mettre à jour le total des résultats affichés
                setTotalDisplayedResults(page === 1 ? response.data.athletes.length : totalDisplayedResults + response.data.athletes.length);
                setAthletesBirth(response.data.unique_athletesBirth)

            } catch (error) {
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAthletes();
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
        <div className="container mt" style={{ width: '100%' }}>
            <h1>Tableau des Athlètes</h1>
            <div>
                <div className='top mb-3'>
                    <p className='resultInfo'>{athletes && athletes.length} résultat(s)</p>
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
                            name="athlete_year_birth"
                            value={filters.athlete_year_birth}
                            onChange={handleFilterChange}
                        >
                                <option value="">Sélectionner une année</option>
                                {athletesBirth && athletesBirth.map((birth) => (
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
                            name="first_game"
                            value={filters.first_game}
                            onChange={handleFilterChange}
                        >
                                <option value="">Rechercher par premier jeux</option>
                                {firstAthGames && firstAthGames.map((game) => (
                                    <option key={game} value={game}>
                                        {game}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    name="athlete_full_name"
                    value={filters.athlete_full_name}
                    onChange={handleFilterChange}
                    placeholder="Rechercher par nom"
                />
            </div>
            <table className="table table-dark table-striped-columns">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('athlete_full_name')}>Nom {renderSortIcon('athlete_full_name')}</th>
                        <th onClick={() => handleSort('games_participations')}>Participations {renderSortIcon('games_participations')}</th>
                        <th>Premier jeux</th>
                        <th onClick={() => handleSort('athlete_year_birth')}>Année de Naissance {renderSortIcon('athlete_year_birth')}</th>
                        <th onClick={() => handleSort('gold_medals')}>Médailles d'Or {renderSortIcon('gold_medals')}</th>
                        <th onClick={() => handleSort('silver_medals')}>Médailles d'Argent {renderSortIcon('silver_medals')}</th>
                        <th onClick={() => handleSort('bronze_medals')}>Médailles de Bronze {renderSortIcon('bronze_medals')}</th>
                    </tr>
                </thead>
                
                <tbody>
                    {isLoading ? (
                        <tr><td colSpan="7">Loading...</td></tr>
                    ) : (
                        athletes.map((athlete, index) => (
                            <tr key={index}>
                                <td><a href={athlete.athlete_url} target="_blank" rel="noopener noreferrer">{athlete.athlete_full_name}</a></td>
                                <td>{athlete.games_participations}</td>
                                <td>{athlete.first_game}</td>
                                <td>{athlete.athlete_year_birth}</td>
                                <td>{athlete.gold_medals}</td>
                                <td>{athlete.silver_medals}</td>
                                <td>{athlete.bronze_medals}</td>
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
                    <button onClick={() => goToPage(currentPage + 1)} disabled={athletes.length < limit}>
                        Suivant <MdArrowForwardIos />
                    </button>
                </div>
                <p className='tableLengthInfo'>Vous avez vu {totalDisplayedResults} résultat(s) sur {totalResult}</p>
            </div>
        </div>
    );
};

export default AthletesTable;
