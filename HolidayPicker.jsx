import React, { useState } from 'react';
import { Calendar, Trash2, Plus } from 'lucide-react';
import { format, parseISO, isSameDay } from 'date-fns';
const HolidayPicker = ({ holidays, setHolidays }) => {
    const [newDate, setNewDate] = useState('');
    const addHoliday = () => {
        if (!newDate) return;
        // Check if already exists
        const dateObj = parseISO(newDate);
        if (holidays.some(h => isSameDay(new Date(h), dateObj))) {
            alert('Date already added!');
            return;
        }
        setHolidays([...holidays, dateObj]);
        setNewDate('');
    };
    const removeHoliday = (dateToRemove) => {
        setHolidays(holidays.filter(h => !isSameDay(new Date(h), new Date(dateToRemove))));
    };
    return (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={20} />
                Missed Classes / Holidays
            </h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    onClick={addHoliday}
                    style={{
                        background: 'var(--secondary)',
                        color: 'var(--primary-dark)',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    <Plus size={18} /> Add
                </button>
            </div>
            <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
                {holidays.length === 0 && <p style={{ color: '#888', fontStyle: 'italic', gridColumn: '1/-1' }}>No dates added.</p>}
                {holidays.sort((a, b) => new Date(a) - new Date(b)).map((date, idx) => (
                    <div key={idx} style={{
                        background: '#f8f8f8',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #eee',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.9rem'
                    }}>
                        <span>{format(new Date(date), 'MMM d, yyyy')}</span>
                        <button
                            onClick={() => removeHoliday(date)}
                            style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', padding: 0 }}
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default HolidayPicker;
