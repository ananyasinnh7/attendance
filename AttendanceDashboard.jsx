mport React, { useMemo } from 'react';
import { calculateAttendance } from '../utils/calculator';
import { AlertCircle, CheckCircle, PieChart } from 'lucide-react';
const AttendanceDashboard = ({ subjects, holidays, startDate, endDate }) => {
    const stats = useMemo(() => {
        return calculateAttendance(startDate, endDate, subjects, holidays);
    }, [subjects, holidays, startDate, endDate]);
    const totalPercentage = useMemo(() => {
        if (stats.length === 0) return 100;
        const totalClasses = stats.reduce((acc, curr) => acc + curr.totalClasses, 0);
        const totalAttended = stats.reduce((acc, curr) => acc + curr.attended, 0);
        return totalClasses === 0 ? 100 : ((totalAttended / totalClasses) * 100).toFixed(2);
    }, [stats]);
    return (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="/logo_ap.png" alt="VIT" style={{ height: '28px', width: 'auto' }} />
                Attendance Overview
            </h2>
            <div style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                borderRadius: '12px',
                color: 'white',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 10px rgba(153, 0, 0, 0.3)'
            }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Overall Attendance</div>
                <div style={{ fontSize: '3rem', fontWeight: '800' }}>{totalPercentage}%</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    {totalPercentage >= 75 ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            <CheckCircle size={14} /> Safe Zone
                        </span>
                    ) : (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#ffcc00' }}>
                            <AlertCircle size={14} /> Low Attendance!
                        </span>
                    )}
                </div>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {stats.map(sub => (
                    <div key={sub.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontWeight: '600', color: '#333' }}>{sub.name}</span>
                            <span style={{ fontWeight: '700', color: sub.percentage < 75 ? '#d32f2f' : 'var(--primary)' }}>
                                {sub.percentage}%
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666' }}>
                            <span>Slots: {sub.slots.join(', ')}</span>
                            <span>{sub.attended} / {sub.totalClasses} Classes</span>
                        </div>
                        {/* Progress Bar */}
                        <div style={{ height: '6px', background: '#eee', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%',
                                width: `${sub.percentage}%`,
                                background: sub.percentage < 75 ? '#d32f2f' : '#4caf50',
                                borderRadius: '3px',
                                transition: 'width 0.5s ease-in-out'
                            }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AttendanceDashboard;
