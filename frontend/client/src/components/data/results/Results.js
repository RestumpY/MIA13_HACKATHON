import axios from 'axios';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

// HOOKS
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const ResultsTable = () => {
    // STATE 
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({ discipline_title: '', participant_type: '', country_name: '', medal_type: '', slug_game: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [disciplines, setDisciplines] = useState([]);
    const [participantTypes, setParticipantTypes] = useState([]);
    const [countries, setCountries] = useState([]);
    const [medalTypes, setMedalTypes] = useState([]);
    const [slugGames, setSlugGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
    const [sortBy, setSortBy] = useState('discipline_title');
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
        const sort_by = queryParams.get('sort_by') || 'discipline_title';
        const sort_order = queryParams.get('sort_order') || 'asc';
        const discipline_title = queryParams.get('discipline_title') || '';
        const participant_type = queryParams.get('participant_type') || '';
        const country_name = queryParams.get('country_name') || '';
        const medal_type = queryParams.get('medal_type') || '';
        const slug_game = queryParams.get('slug_game') || '';

        setCurrentPage(page);
        setFilters({ discipline_title, participant_type, country_name, medal_type, slug_game });
        setLimit(limit);
        setSortBy(sort_by);
        setSortOrder(sort_order);

        // fetch data
        const fetchResults = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/results',
                    {
                        params: {
                            discipline_title,
                            participant_type,
                            country_name,
                            medal_type,
                            slug_game,
                            page,
                            limit,
                            sort_by,
                            sort_order
                        }
                    }
                );
                // Extraire les données a partir de la reponse
                console.log('RESULTS', response.data);
                setResults(response.data.results);
                setDisciplines(response.data.unique_disciplines);
                setParticipantTypes(response.data.unique_participant_types);
                setCountries(response.data.unique_countries);
                setMedalTypes(response.data.unique_medal_types);
                setSlugGames(response.data.unique_slug_games);
                setTotalResult(response.data.total_items);
                // Mettre à jour le total des résultats affichés
                setTotalDisplayedResults(page === 1 ? response.data.results.length : totalDisplayedResults + response.data.results.length);

            } catch (error) {
                console.error('Error fetching results:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
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
            <h1>Tableau des Résultats Olympiques</h1>
            <div>
                <div className='top mb-3'>
                    <p className='resultInfo'>{results && results.length} résultat(s)</p>
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
                        <div className="filter-column">
                            <select
                                className="form-select ml-2 mb-2"
                                name="discipline_title"
                                value={filters.discipline_title}
                                onChange={handleFilterChange}
                            >
                                <option value="">Sélectionner par discipline</option>
                                {disciplines && disciplines.map((discipline) => (
                                    <option key={discipline} value={discipline}>
                                        {discipline}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-column">
                            <select
                                className="form-select ml-2 mb-2"
                                name="participant_type"
                                value={filters.participant_type}
                                onChange={handleFilterChange}
                            >
                                <option value="">Sélectionner par type de participant</option>
                                {participantTypes && participantTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-column">
                            <select
                                className="form-select ml-2 mb-2"
                                name="country_name"
                                value={filters.country_name}
                                onChange={handleFilterChange}
                            >
                                <option value="">Sélectionner par pays</option>
                                {countries && countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-column">
                            <select
                                className="form-select ml-2 mb-2"
                                name="medal_type"
                                value={filters.medal_type}
                                onChange={handleFilterChange}
                            >
                                <option value="">Sélectionner par type de médaille</option>
                                {medalTypes && medalTypes.map((medal) => (
                                    <option key={medal} value={medal}>
                                        {medal}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="filter-column">
                            <select
                                className="form-select ml-2 mb-2"
                                name="slug_game"
                                value={filters.slug_game}
                                onChange={handleFilterChange}
                            >
                                <option value="">Sélectionner par jeu</option>
                                {slugGames && slugGames.map((game) => (
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
                        <th onClick={() => handleSort('discipline_title')}>Discipline{renderSortIcon('discipline_title')}</th>
                        <th>Événement</th>
                        <th onClick={() => handleSort('participant_type')}>Type de participant{renderSortIcon('participant_type')}</th>
                        <th onClick={() => handleSort('country_name')}>Pays{renderSortIcon('country_name')}</th>
                        <th onClick={() => handleSort('medal_type')}>Médaille{renderSortIcon('medal_type')}</th>
                        <th>Athlète</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="7">Chargement en cours...</td>
                        </tr>
                    ) : (
                        results.map((result, index) => (
                            <tr key={index}>
                                <td>{result.discipline_title}</td>
                                <td>{result.event_title}</td>
                                <td>{result.participant_type}</td>
                                <td>{result.country_name}</td>
                                <td>{result.medal_type}</td>
                                <td>{result.athlete_full_name}</td>
                                <td>{result.rank_position}</td>
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
                    <button onClick={() => goToPage(currentPage + 1)} disabled={results.length < limit}>
                        Suivant <MdArrowForwardIos />
                    </button>
                </div>
                <p className='tableLengthInfo'>Vous avez vu {totalDisplayedResults} résultat(s) sur {totalResult}</p>
            </div>
        </div>
    );
};

export default ResultsTable;
