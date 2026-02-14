import { useState, useEffect } from 'react'
import Header from './components/Header'
import SubjectMapper from './components/SubjectMapper'
import AttendanceDashboard from './components/AttendanceDashboard'
import HolidayPicker from './components/HolidayPicker'
import { calculateAttendance } from './utils/calculator'
function App() {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('vit_subjects');
    return saved ? JSON.parse(saved) : [];
  });
  const [holidays, setHolidays] = useState(() => {
    const saved = localStorage.getItem('vit_holidays'); // specific dates missed
    return saved ? JSON.parse(saved) : [];
  });
  // Default semester dates (adjust as needed)
  const [startDate, setStartDate] = useState(new Date('2024-01-08'));
  const [endDate, setEndDate] = useState(new Date('2024-05-30'));
  useEffect(() => {
    localStorage.setItem('vit_subjects', JSON.stringify(subjects));
  }, [subjects]);
  useEffect(() => {
    localStorage.setItem('vit_holidays', JSON.stringify(holidays));
  }, [holidays]);
  return (
    <div className="app-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Header />
      <main style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
        <section>
          <SubjectMapper subjects={subjects} setSubjects={setSubjects} />
        </section>
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <HolidayPicker holidays={holidays} setHolidays={setHolidays} />
          <AttendanceDashboard
            subjects={subjects}
            holidays={holidays}
            startDate={startDate}
            endDate={endDate}
          />
        </section>
      </main>
    </div>
  )
}
export default App
