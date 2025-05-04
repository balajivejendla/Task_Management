import React, { useState } from 'react';

const Calendar = ({ Tasks, Taskwith, expandedTasks, toggleTaskDetails }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const days = [];
    const tasksForDay = {};
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // Process tasks
    [...Tasks, ...Taskwith].forEach(task => {
      const taskDate = new Date(task.date);
      if (taskDate.getFullYear() === year && taskDate.getMonth() === month) {
        const day = taskDate.getDate();
        if (!tasksForDay[day]) {
          tasksForDay[day] = [];
        }
        tasksForDay[day].push(task);
      }
    });

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasTask = tasksForDay[day]?.length > 0;
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      days.push(
        <div 
          key={day} 
          className={`calendar-day ${hasTask ? 'has-task' : ''}`}
          style={{
            position: 'relative',
            padding: '10px',
            border: '1px solid #D4A373',
            backgroundColor: hasTask ? '#E8F5E9' : '#FAF3DD',
            minHeight: '80px',
            display: 'flex',
            flexDirection: 'column',
            cursor: hasTask ? 'pointer' : 'default',
            transition: 'all 0.3s ease'
          }}
          onClick={() => hasTask && toggleTaskDetails(`calendar-${dateString}`)}
        >
          <span style={{ fontWeight: 'bold', marginBottom: '5px' }}>{day}</span>
          {hasTask && (
            <div style={{ 
              position: 'absolute', 
              bottom: '5px', 
              right: '5px',
              color: '#4A6656',
              fontSize: '16px'
            }}>
              ✓
            </div>
          )}
          {hasTask && (
            <div style={{ fontSize: '0.8em', color: '#666' }}>
              {tasksForDay[day].length} task(s)
            </div>
          )}
          {expandedTasks[`calendar-${dateString}`] && hasTask && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#FAF3DD',
              border: '1px solid #D4A373',
              padding: '10px',
              zIndex: 1000,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {tasksForDay[day].map((task, index) => (
                <div key={index} style={{ marginBottom: '5px' }}>
                  <strong style={{ color: '#4A6656' }}>{task.subject}</strong>
                  <div style={{ fontSize: '0.8em', color: '#666' }}>
                    {task.time} - {task.priority} priority
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  return (
    <div style={{
      backgroundColor: "#FAF3DD",
      padding: "20px",
      borderRadius: "8px",
      border: "2px solid #D4A373",
      margin: "20px auto",
      maxWidth: "800px"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <button 
          onClick={() => changeMonth(-1)}
          style={{
            backgroundColor: "#77BFA3",
            color: "#FAF3DD",
            border: "none",
            padding: "5px 15px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          ←
        </button>
        <h3 style={{ color: "#4A6656", margin: 0 }}>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button 
          onClick={() => changeMonth(1)}
          style={{
            backgroundColor: "#77BFA3",
            color: "#FAF3DD",
            border: "none",
            padding: "5px 15px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          →
        </button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px",
        marginBottom: "10px"
      }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{
            textAlign: "center",
            padding: "5px",
            backgroundColor: "#77BFA3",
            color: "#FAF3DD",
            fontWeight: "bold",
            borderRadius: "4px"
          }}>
            {day}
          </div>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px"
      }}>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;

// Add this CSS to your stylesheet
const styles = `
.calendar-day {
  transition: transform 0.2s ease;
}

.calendar-day:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.calendar-day.has-task {
  cursor: pointer;
}

.calendar-day.empty {
  background-color: #f5f5f5 !important;
  border: none !important;
}
`;