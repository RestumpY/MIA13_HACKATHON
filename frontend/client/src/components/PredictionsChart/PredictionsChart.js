import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './PredictionsChart.css'; // Assurez-vous d'importer le fichier CSS

const PredictionsChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loadingChart, setLoadingChart] = useState(true);
    const [errorChart, setErrorChart] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [loadingTable, setLoadingTable] = useState(true);
    const [errorTable, setErrorTable] = useState(null);
    const [franceChartData, setFranceChartData] = useState(null);
    const [loadingFranceChart, setLoadingFranceChart] = useState(true);
    const [errorFranceChart, setErrorFranceChart] = useState(null);

    useEffect(() => {
        // Charger les données JSON pour le graphique
        fetch('/predictions.json')  // Assurez-vous que le fichier JSON est placé dans le répertoire public
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Préparer les données pour Chart.js
                const countries = data.map(item => item.Country);
                const actualValues = data.map(item => item.Actual);
                const predictedValues = data.map(item => item.Predicted);

                setChartData({
                    labels: countries,
                    datasets: [
                        {
                            label: 'Actual',
                            data: actualValues,
                            borderColor: 'blue',
                            fill: false,
                        },
                        {
                            label: 'Predicted',
                            data: predictedValues,
                            borderColor: 'red',
                            fill: false,
                        },
                    ],
                });
                setLoadingChart(false);
            })
            .catch(error => {
                setErrorChart(error);
                setLoadingChart(false);
            });

        // Charger les données JSON pour le tableau
        fetch('/top_10_predictions.json')  // Assurez-vous que le fichier JSON est placé dans le répertoire public
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTableData(data);
                setLoadingTable(false);
            })
            .catch(error => {
                setErrorTable(error);
                setLoadingTable(false);
            });

        // Charger les données JSON pour le graphique de la France
        fetch('/historical_medals.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Prétraiter les données pour remplacer les valeurs nulles
                const years = data.map(item => item.year);
                const medalCounts = data.map(item => item.medal_count !== null ? item.medal_count : 0);

                setFranceChartData({
                    labels: years,
                    datasets: [
                        {
                            label: 'France Medal Count',
                            data: medalCounts,
                            borderColor: 'green',
                            fill: false,
                        },
                    ],
                });
                setLoadingFranceChart(false);
            })
            .catch(error => {
                setErrorFranceChart(error);
                setLoadingFranceChart(false);
            });
    }, []);

    if (loadingChart || loadingTable || loadingFranceChart) {
        return <div>Loading...</div>;
    }

    if (errorChart) {
        return <div>Error loading chart data: {errorChart.message}</div>;
    }

    if (errorTable) {
        return <div>Error loading table data: {errorTable.message}</div>;
    }

    if (errorFranceChart) {
        return <div>Error loading France chart data: {errorFranceChart.message}</div>;
    }

    return (
        <div className="predictions-container">
            <h2>Prédiction des médailles pour les JO 2020</h2>
            {chartData ? (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        scales: {
                            x: {
                                ticks: {
                                    maxRotation: 90,
                                    minRotation: 45,
                                },
                            },
                        },
                    }}
                />
            ) : (
                <div>No data available</div>
            )}
            <h2>Top 10 des pays au JO 2024</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Gold</th>
                        <th>Silver</th>
                        <th>Bronze</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.Country}</td>
                            <td>{row.TotalGold}</td>
                            <td>{row.TotalSilver}</td>
                            <td>{row.TotalBronze}</td>
                            <td>{row.TotalMedals}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Prédiction des médailles pour la France aux JO 2024</h2>
            {franceChartData ? (
                <Line
                    data={franceChartData}
                    options={{
                        responsive: true,
                        scales: {
                            x: {
                                ticks: {
                                    maxRotation: 90,
                                    minRotation: 45,
                                },
                            },
                        },
                    }}
                />
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default PredictionsChart;
