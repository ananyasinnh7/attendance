mport { eachDayOfInterval, isSameDay, getDay, format } from 'date-fns';
// VIT Slot mapping definition (Simplified default based on image)
// Using 0-Sunday, 1-Monday, ... 6-Saturday
// Format: Day -> [Slots]
// Note: This is an approximation. Real VIT timetable is complex.
// We will rely on user mapping mostly, but here we define which *Generic Slots* (A1, F1, etc.) happen on which days/times.
// Based on typical VIT FFCS:
const DEFAULT_TIMETABLE = {
    1: ['A1', 'F1', 'D1', 'TB1', 'TG1', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6'], // Monday
    2: ['B1', 'G1', 'E1', 'TC1', 'TAA1', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12'], // Tuesday
    3: ['C1', 'A1', 'F1', 'TD1', 'TBB1', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18'], // Wednesday
    4: ['D1', 'B1', 'G1', 'TE1', 'TCC1', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24'], // Thursday
    5: ['E1', 'C1', 'TA1', 'TF1', 'TDD1', 'L25', 'L26', 'L27', 'L28', 'L29', 'L30'], // Friday
    // Labs and other slots are usually mixed. 
    // IMPORTANT: The user said "if we write which slot have which subject".
    // So we need to know: If today is Monday, does it have 'A1'? Yes.
    // If user says 'Math' is 'A1', then Monday has 'Math'.
};
// We need a more robust mapping of Day -> Array of Slots that occur.
// Monday: A1, F1, D1, TB1, TG1...
// Tuesday: B1, G1, E1, TC1...
// Wednesday: C1, F1, E1... (Wait, pattern varies)
// Let's use a standard VITS pattern referencing the image or general knowledge.
// From Image 1:
// Mon: A1, F1, C1, E1, TD1... (Hard to read exacts, but standard theory slots are A1, F1, D1... etc)
// Let's define a "Theory" and "Lab" slot structure.
// For now, I'll use a widely accepted VIT slot pattern.
const SLOT_SCHEDULE = {
    1: ['A1', 'F1', 'C1', 'E1', 'TD1', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6'],
    2: ['B1', 'G1', 'D1', 'TA1', 'TF1', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12'],
    3: ['C1', 'F1', 'E1', 'TB1', 'TG1', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18'],
    4: ['D1', 'A1', 'F1', 'TC1', 'TAA1', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24'],
    5: ['E1', 'B1', 'G1', 'TD1', 'TBB1', 'L25', 'L26', 'L27', 'L28', 'L29', 'L30']
};
// Note: Lab slots L1-L6 usually align with theory slots in time, but we treat them as separate distinct slots.
export const calculateAttendance = (startDate, endDate, subjects, holidays) => {
    // subjects: [{ code: 'MAT101', name: 'Calculus', slots: ['A1', 'TA1'] }]
    // holidays: [Date objects of missed days]
    const stats = subjects.map(sub => ({
        ...sub,
        totalClasses: 0,
        attended: 0,
        history: [] // For detail view later
    }));
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    days.forEach(day => {
        const dayOfWeek = getDay(day); // 0 Sun, 1 Mon...
        if (dayOfWeek === 0 || dayOfWeek === 6) return; // Skip weekends for now (or make configurable)
        // Check if it's a holiday (User missed ALL classes this day)
        const isHoliday = holidays.some(h => isSameDay(new Date(h), day));
        // Get slots for this day 
        const daySlots = SLOT_SCHEDULE[dayOfWeek] || [];
        stats.forEach(sub => {
            // Find how many slots this subject has today
            // distinct slots in subject that match today's daySlots
            const subjectSlotsToday = sub.slots.filter(slot => daySlots.includes(slot));
            if (subjectSlotsToday.length > 0) {
                const classesCount = subjectSlotsToday.length;
                // If it's a holiday (user absent), we add to total but NOT to attended.
                // Wait, "taking holiday" = Absent.
                // If "Holiday" = School Closed, then we add to neither.
                // User request: "calculate his attendance by just writing the days he is taking holiday" -> Personal leave -> Absent.
                // So Count in Total, do not count in Attended.
                // However, if the user inputted "Official Holidays" those should be excluded.
                // Given complexity, I'll assume 'holidays' list passed here are "Days user is absent".
                // I might add a toggle later for "Official Holiday".
                sub.totalClasses += classesCount;
                if (!isHoliday) {
                    sub.attended += classesCount;
                }
            }
        });
    });
    return stats.map(s => ({
        ...s,
        percentage: s.totalClasses === 0 ? 100 : ((s.attended / s.totalClasses) * 100).toFixed(2)
    }));
};
