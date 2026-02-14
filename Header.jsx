import React from 'react';
import logo from '../assets/logo_ap.png';
const Header = () => {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 2rem',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            borderBottom: '4px solid var(--primary)',
            borderRadius: '0 0 12px 12px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={logo} alt="VIT Logo" style={{ height: '60px', width: 'auto' }} />
                <div>
                    <h1 style={{
                        color: 'var(--primary)',
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        margin: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Attendance Calculator
                    </h1>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', fontWeight: '500' }}>
                        Vellore Institute of Technology
                    </p>
                </div>
            </div>
            <div style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        </header>
    );
};
export default Header;
