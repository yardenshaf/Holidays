import { useEffect, useState } from 'react';
import useService from '../../hooks/use-service';
import LikeService from '../../services/auth-aware/LikeService';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4567', '#19FFAE', '#FF1919'];

export default function Stats() {
    const likeService = useService(LikeService);
    const [data, setData] = useState<{ destination: string; likes: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const distro = await likeService.getLikesDistribution();
                console.log('Likes distribution:', distro);
                setData(distro);
            } catch (error) {
                console.error('Failed to load likes distribution:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    }

    if (data.length === 0) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>No data available</div>;
    }

    const downloadCSV = () => {
        const headers = ['destination', 'likes'];
        const csvContent = [headers.join(','), ...data.map((row) => `"${row.destination}",${row.likes}`)].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'likes-distribution.csv';
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div
            style={{
                width: '100%',
                height: '500px',
                padding: '20px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Destination Likes Distribution</h2>
                <button
                    onClick={downloadCSV}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#0088FE',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    Download CSV
                </button>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={data} dataKey="likes" nameKey="destination" cx="50%" cy="50%" outerRadius={100} label={{ fontSize: 12 }}>
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} likes`} />
                    <Legend layout="vertical" align="left" verticalAlign="middle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
