import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { MdArrowBackIosNew } from "react-icons/md";
import { faArrowLeft, faArrowRight, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { MdArrowForwardIos } from "react-icons/md";
import './medals.scss';

// HOOKS
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const MedalsTable = () => {
    // STATES
    const [medals, setMedals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [years, setYears] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [medalType, setMedalType] = useState([]);
    const [gender, setGender] = useState([]);
    const [slugGame, setSlugGame] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        country_name: '',
        year: '',
        discipline_title: '',
        medal_type: '',
        event_gender: '', 
        slug_game: '',
    });
    const [sortBy, setSortBy] = useState('discipline_title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);
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
        const country_name = queryParams.get('country_name') || '';
        const discipline_title = queryParams.get('discipline_title') || '';
        const year = queryParams.get('year') || '';
        const medal_type = queryParams.get('medal_type') || '';
        const event_gender = queryParams.get('event_gender') || '';
        const slug_game = queryParams.get('slug_game') || '';
        const limit = parseInt(queryParams.get('limit')) || 50;
        const sort_by = queryParams.get('sort_by') || 'discipline_title';
        const sort_order = queryParams.get('sort_order') || 'asc';
        
        setCurrentPage(page);
        setFilters({ country_name, discipline_title, year, medal_type, event_gender, slug_game });
        setLimit(limit);
        setSortBy(sort_by);
        setSortOrder(sort_order);
    
        // Fetch data
        const fetchMedals = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://mia13-hackathon.onrender.com/medals', { 
                    params: {
                        page, 
                        country_name, 
                        discipline_title, 
                        year, 
                        medal_type,
                        event_gender, 
                        slug_game, 
                        limit
                    }
                });

                // Extraire les données a partir de la reponse
                setMedals(response.data.medals);
                console.log('SHOW THE RESPONSE : ', response.data.unique_years);
                setYears(response.data.unique_years);
                setCountries(response.data.unique_countries); 
                setDisciplines(response.data.unique_disciplines);
                setMedalType(response.data.unique_medal_type);
                setGender(response.data.unique_event_gender);
                setSlugGame(response.data.unique_slug_game);

                // Mettre à jour le total des résultats affichés
                setTotalResult(response.data.total_items);
                setTotalDisplayedResults(page === 1 ? response.data.medals.length : totalDisplayedResults + response.data.medals.length);

            } catch (error) {
                console.error('Error fetching medals:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMedals();
    }, [location.search]);
    

    //  FUNCTIONS
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        updateURLParams({ ...newFilters, page: 1, limit });
        setTotalDisplayedResults(0); // Réinitialiser le total affiché lors du changement de filtres
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

    const goToPage = (pageIndex) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', pageIndex);
        navigate({ search: queryParams.toString() });
        setCurrentPage(pageIndex);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
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
            <h1>Tableau des Médailles</h1>
            <div>
            <div className='top mb-3'>
                <p className='resultInfo'>{medals && medals.length} résultat(s)</p>
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
                            name="country_name"
                            value={filters.country_name}
                            onChange={handleFilterChange}
                            className="form-select mb-2"
                        >
                            <option value="">Sélectionner un pays</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                        <select
                            name="year"
                            value={filters.year}
                            onChange={handleFilterChange}
                            className="form-select mb-2 "
                        >
                            <option value="">Sélectionner une année</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <select
                            name="event_gender"
                            value={filters.event_gender}
                            onChange={handleFilterChange}
                            className="form-select mb-2 "
                        >
                            <option value="">Sélectionner un genre</option>
                            {gender.map((gender) => (
                                <option key={gender} value={gender}>
                                    {gender}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Deuxième colonne de sélecteurs */}
                    <div className="filter-column">
                        <select
                            name="discipline_title"
                            value={filters.discipline_title}
                            onChange={handleFilterChange}
                            className="form-control mb-2"
                        >
                            <option value="">Sélectionner une discipline</option>
                            {disciplines.map((discipline) => (
                                <option key={discipline} value={discipline}>
                                    {discipline}
                                </option>
                            ))}
                        </select>
                        <select
                            name="medal_type"
                            value={filters.medal_type}
                            onChange={handleFilterChange}
                            className="form-control mb-2"
                        >
                            <option value="">Sélectionner un type de médaille</option>
                            {medalType.map((medal) => (
                                <option key={medal} value={medal}>
                                    {medal}
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
                            <td colSpan="10">Chargement en cours...</td>
                        </tr>
                    ) : (
                        medals && medals.map((medal, index) => (
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
            <div className='bottom'>
                <div className="pagination">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                        <MdArrowBackIosNew />
                        Précédent </button>
                    <span>Page {currentPage}</span>
                    <button onClick={() => goToPage(currentPage + 1)} disabled={medals.length < limit}>
                        Suivant
                        <MdArrowForwardIos />
                    </button>
                </div>
                <p className='tableLengthInfo'>Vous avez vu {totalDisplayedResults} résultat(s) sur {totalResult}</p>
            </div>
        </div>
    );
};

export default MedalsTable;
