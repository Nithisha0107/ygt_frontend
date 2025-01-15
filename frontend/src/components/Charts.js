import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Charts() {
    const [summary, setSummary] = useState({
        total_issued: 0,
        total_used: 0,
        total_expired: 0,
        counter_stats: {},
    });
    const [error, setError] = useState('');

    const fetchSummary = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/summary-report/', {
                params: { start_date: '2024-01-01', end_date: '2024-12-31' }, // Example date range
            });
            setSummary(response.data);
        } catch (err) {
            setError('Failed to load chart data. Please try again.');
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    // Data for Bar Chart
    const barChartData = {
        labels: ['Issued', 'Used', 'Expired'],
        datasets: [
            {
                label: 'Tokens',
                data: [summary.total_issued, summary.total_used, summary.total_expired],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
        ],
    };

    // Data for Pie Chart (Counters Distribution)
    const pieChartData = {
        labels: Object.keys(summary.counter_stats),
        datasets: [
            {
                data: Object.values(summary.counter_stats),
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
        ],
    };

    // Data for Line Chart (Trend over time)
    // const lineChartData = {
    //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Example months
    //     datasets: [
    //         {
    //             label: 'Tokens Issued',
    //             data: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140], // Example data
    //             fill: false,
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             tension: 0.1,
    //         },
    //     ],
    // };

    // Data for Doughnut Chart (Comparison of Counters)
    const doughnutChartData = {
        labels: Object.keys(summary.counter_stats),
        datasets: [
            {
                data: Object.values(summary.counter_stats),
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'],
            },
        ],
    };

    return (
        <div className="chart-container" style={{ width: '90%', margin: 'auto', marginTop: '50px' }}>
            <h2 style={{ textAlign: 'center' }}>Devotee Report Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <div className="chart" style={{ marginBottom: '50px',width:'50%'}}>
                <h3>Overall Token Summary</h3>
                <Bar data={barChartData} options={{ responsive: true }} />
            </div>

            <div className="chart" style={{ marginBottom: '50px',width:'50%' ,height:'350px'}}>
                <h3>Counters Distribution</h3>
                <Pie data={pieChartData} options={{ responsive: true }} />
            </div >
            
           
            {/* <div className="chart" style={{ marginBottom: '50px',width:'50%', marginRight:'50px'}}>
                <h3>Trend of Tokens Issued Over Time</h3>
                <Line data={lineChartData} options={{ responsive: true,width:'50%' }} />
            </div> */}

            <div className="chart" style={{ marginBottom: '50px',width:'50%' ,height:'400px'}}>
                <h3>Counters Comparison</h3>
                <Doughnut data={doughnutChartData} options={{ responsive: true }} />
            </div>
            
        </div>
    );
}

export default Charts;
