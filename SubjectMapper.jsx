import React, { useState } from 'react';
import { Plus, Trash2, BookOpen } from 'lucide-react';
const SLOT_OPTIONS = [
    // Theory Slots
    'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2', 'G1', 'G2',
    'TA1', 'TA2', 'TB1', 'TB2', 'TC1', 'TC2', 'TD1', 'TD2', 'TE1', 'TE2', 'TF1', 'TF2', 'TG1', 'TG2',
    'TAA1', 'TAA2', 'TBB1', 'TBB2', 'TCC1', 'TCC2', 'TDD1', 'TDD2', 'TEE1', 'TEE2', 'TFF1', 'TFF2', 'TGG1', 'TGG2',
    // Lab Slots (Subset for brevity, user can add custom if needed)
    'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10',
    'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20',
    'L21', 'L22', 'L23', 'L24', 'L25', 'L26', 'L27', 'L28', 'L29', 'L30',
    'L31', 'L32', 'L33', 'L34', 'L35', 'L36', 'L37', 'L38', 'L39', 'L40',
    'L41', 'L42', 'L43', 'L44', 'L45', 'L46', 'L47', 'L48', 'L49', 'L50',
    'L51', 'L52', 'L53', 'L54', 'L55', 'L56', 'L57', 'L58', 'L59', 'L60'
];
const SubjectMapper = ({ subjects, setSubjects }) => {
    const [newSubject, setNewSubject] = useState({ name: '', code: '', slots: [] });
    const [isAdding, setIsAdding] = useState(false);
    const handleAddSubject = () => {
        if (newSubject.name && newSubject.code) {
            setSubjects([...subjects, { ...newSubject, id: Date.now() }]);
            setNewSubject({ name: '', code: '', slots: [] });
            setIsAdding(false);
        }
    };
    const toggleSlot = (slot) => {
        if (newSubject.slots.includes(slot)) {
            setNewSubject({ ...newSubject, slots: newSubject.slots.filter(s => s !== slot) });
        } else {
            setNewSubject({ ...newSubject, slots: [...newSubject.slots, slot] });
        }
    };
    const removeSubject = (id) => {
        setSubjects(subjects.filter(s => s.id !== id));
    };
    return (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={20} />
                    Registered Subjects
                </h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    style={{
                        background: 'var(--secondary)',
                        color: 'var(--primary-dark)',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <Plus size={16} /> Add Subject
                </button>
            </div>
            {isAdding && (
                <div style={{ background: '#f8f8f8', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #ddd' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Subject Name (e.g. Calculus)"
                            value={newSubject.name}
                            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <input
                            type="text"
                            placeholder="Course Code (e.g. MAT1001)"
                            value={newSubject.code}
                            onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '8px' }}>Select Timetable Slots:</p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
                        gap: '6px',
                        maxHeight: '150px',
                        overflowY: 'auto',
                        padding: '4px'
                    }}>
                        {SLOT_OPTIONS.map(slot => (
                            <button
                                key={slot}
                                onClick={() => toggleSlot(slot)}
                                style={{
                                    padding: '4px',
                                    fontSize: '0.75rem',
                                    background: newSubject.slots.includes(slot) ? 'var(--primary)' : 'white',
                                    color: newSubject.slots.includes(slot) ? 'white' : '#333',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '10px' }}>
                        <button
                            onClick={handleAddSubject}
                            style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Save Subject
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            style={{ background: '#ccc', color: '#333', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {subjects.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                    No subjects added. Add your subjects and map them to slots to get started.
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '10px' }}>
                    {subjects.map(sub => (
                        <div key={sub.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: '#fff',
                            padding: '12px',
                            borderRadius: '8px',
                            borderLeft: '4px solid var(--primary)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#333' }}>{sub.name}</h3>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                    <span style={{ fontWeight: '600', marginRight: '8px' }}>{sub.code}</span>
                                    <span style={{ background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>
                                        {sub.slots.join(', ')}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => removeSubject(sub.id)}
                                style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer' }}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default SubjectMapper;
