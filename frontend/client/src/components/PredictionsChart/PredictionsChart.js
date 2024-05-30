import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const PredictionsChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Charger les données JSON
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
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h2>Prédiction des médailles pour les JO2020</h2>
            {chartData ? <Line data={chartData} /> : <div>No data available</div>}
        </div>
    );
};

export default PredictionsChart;
