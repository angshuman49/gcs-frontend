import React, { useEffect, useState } from 'react';
import { apiGet } from "./services/api.js";

function Schedule() {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await apiGet("/dashboard/content/?type=schedule");
                console.log("API Response:", response);
                
                const scheduleData = response.data || response.schedule || response;
                setSchedule(scheduleData);
            } catch (error) {
                console.error("Error fetching schedule:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchSchedule();
    }, []);

    const groupedByDay = schedule.reduce((groups, item) => {
        const day = item.day;
        if (!groups[day]) {
            groups[day] = [];
        }
        groups[day].push(item);
        return groups;
    }, {});

    const sortedDays = Object.keys(groupedByDay).sort((a, b) => a - b);

    if (loading) {
        return <p>Loading schedule...</p>;
    }

    if (schedule.length === 0) {
        return <p>No schedule available.</p>;
    }

    return (
        <div>
            <h1>Event Schedule</h1>
            
            {sortedDays.map(day => (
                <div key={day}>
                    <h2>Day {day}</h2>
                    <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#333', color: 'white' }}>
                            <tr>
                                <th>Time</th>
                                <th>Event</th>
                                <th>Location/Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedByDay[day].map((item, index) => (
                                <tr key={item.schedule_id || index}>
                                    <td>{item.timerange}</td>
                                    <td><b>{item.event}</b></td>
                                    <td>{item.note || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default Schedule;
