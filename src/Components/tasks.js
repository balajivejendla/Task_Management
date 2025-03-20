import React, { useState ,useEffect} from 'react'
import Navbar from './Navbar';
import TaskAlert from './Alert';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa';

function Tasks(){
      const [showBackToTop, setShowBackToTop] = useState(false);
      const[Text1,setText1]=useState('');
      const[Text2,setText2]=useState('');
      const[Text3,setText3]=useState('');
      const[Tasks,setTasks]=useState([]);
      const[Taskwith,setTaskwith]=useState([]);
      const[Taskcomplete,setTaskcomplete]=useState([]);
      const [timeFilter, setTimeFilter] = useState('all');
      const [priority, setPriority] = useState('medium');
      const [expandedTasks, setExpandedTasks] = useState({});
      const [activeTab, setActiveTab] = useState('active');
      const totalActiveTasks = Tasks.length + Taskwith.length;
      const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
const totalCompletedTasks = Taskcomplete.length;
const [showTips, setShowTips] = useState(localStorage.getItem('hideTaskTips') !== 'true');
const [completedTips, setCompletedTips] = useState(JSON.parse(localStorage.getItem('completedTips') || '[]'));
const [isOpen, setIsOpen] = useState(false);
const [priorityFilter, setPriorityFilter] = useState('all');
const [userExperience, setUserExperience] = useState('beginner'); // beginner, intermediate, advanced
const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
const [autoSchedule, setAutoSchedule] = useState(false);
const handleDateChange = (e) => {
  const date = e.target.value;
  setSelectedDate(date);
  
  // Automatically suggest priority based on date
  if (userExperience === 'beginner') {
    const suggestedPriority = suggestPriority(Text1, date);
    setPriority(suggestedPriority);
  }
};
useEffect(() => {
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const AdvancedFeatures = () => (
  <div className="advanced-features p-3" style={{ 
    backgroundColor: "#FAF3DD",
    border: "1px solid #D4A373",
    borderRadius: "8px",
    marginTop: "20px"
  }}>
    <div className="d-flex justify-content-between align-items-center">
      <h5 style={{ color: "#4A6656" }}>Advanced Features</h5>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          checked={autoSchedule}
          onChange={(e) => setAutoSchedule(e.target.checked)}
        />
        <label className="form-check-label" style={{ color: "#4A6656" }}>
          Auto Schedule
        </label>
      </div>
    </div>
  </div>
);
const tips = [
  'Click ✅ to mark tasks as complete',
  'Use high priority for urgent tasks',
  'Set reminders for important deadlines',
  'Filter tasks by date using the dropdown',
  'Click on a task to see more details',
  'Use search to find specific tasks quickly'
];
const [searchQuery, setSearchQuery] = useState('');
const [showProgress, setShowProgress] = useState(true);

const [selectedDate, setSelectedDate] = useState('');

const toggleTaskDetails = (taskId) => {
  setExpandedTasks(prev => ({
    ...prev,
    [taskId]: !prev[taskId]
  }));
};
const suggestPriority = (taskName, dueDate) => {
  const today = new Date();
  const taskDate = new Date(dueDate);
  const daysDiff = Math.floor((taskDate - today) / (1000 * 60 * 60 * 24));
  
  if (taskName.toLowerCase().includes('urgent') || daysDiff <= 1) {
    return 'high';
  } else if (daysDiff <= 3) {
    return 'medium';
  }
  return 'low';
};

const filterTasks = (tasks) => {
  // First filter by priority if selected
  let filteredTasks = tasks;
  if (searchQuery.trim() !== '') {
    filteredTasks = tasks.filter(task => 
      task.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.notes.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Then filter by priority
  if (priorityFilter !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
  }

  // Finally filter by time
  const currentDate = new Date();
  const today = new Date().setHours(0, 0, 0, 0);
  const tomorrow = new Date(today + 86400000).setHours(0, 0, 0, 0);
  const weekLater = new Date(today + 7 * 86400000).setHours(0, 0, 0, 0);

  switch(timeFilter) {
    case 'today':
      return filteredTasks.filter(task => {
        const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
        return taskDate === today;
      });
    case 'tomorrow':
      return filteredTasks.filter(task => {
        const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
        return taskDate === tomorrow;
      });
    case 'week':
      return filteredTasks.filter(task => {
        const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
        return taskDate <= weekLater && taskDate >= today;
      });
    default:
      return filteredTasks;
  }
};

const calculateProgress = () => {
  const totalTasks = Tasks.length + Taskwith.length + Taskcomplete.length;
  const completedTasks = Taskcomplete.length;
  
  const highPriorityTotal = [...Tasks, ...Taskwith, ...Taskcomplete].filter(t => t.priority === 'high').length;
  const highPriorityCompleted = Taskcomplete.filter(t => t.priority === 'high').length;
  
  const mediumPriorityTotal = [...Tasks, ...Taskwith, ...Taskcomplete].filter(t => t.priority === 'medium').length;
  const mediumPriorityCompleted = Taskcomplete.filter(t => t.priority === 'medium').length;
  
  const lowPriorityTotal = [...Tasks, ...Taskwith, ...Taskcomplete].filter(t => t.priority === 'low').length;
  const lowPriorityCompleted = Taskcomplete.filter(t => t.priority === 'low').length;

  return {
    overall: totalTasks ? (completedTasks / totalTasks) * 100 : 0,
    high: highPriorityTotal ? (highPriorityCompleted / highPriorityTotal) * 100 : 0,
    medium: mediumPriorityTotal ? (mediumPriorityCompleted / mediumPriorityTotal) * 100 : 0,
    low: lowPriorityTotal ? (lowPriorityCompleted / lowPriorityTotal) * 100 : 0
  };
};

      const taskadder = () => {
        if (Text1.trim() === "" || Text2.trim() === "") {
            alert("Please Enter Both Task and Time if Notes");
            setAlertType('error');
            setShowAlert(true);
            return;
        }
            const newTask = { subject: Text1, time: Text2,date:selectedDate, notes: Text3,priority: priority  };
    
            const updatedTasks = [...Tasks, newTask].sort((a, b) => {
              const dateA = new Date(a.date + 'T' + a.time);
              const dateB = new Date(b.date + 'T' + b.time);
              return dateA - dateB;
          });
    
        setTasks(updatedTasks);
        setText1("");
        setText2("");
        setText3("");
        setSelectedDate("");
        console.log(updatedTasks);
        setPriority("medium");
        setAlertMessage("Task added successfully!");
        setAlertType('success');
        setShowAlert(true);
    };
    const taskadderwith = () => {
      if (Text1.trim() === "" || Text2.trim() === "") {
          alert("Please Enter Both Task and Time if Notes");
          return;
      }
  
      const newTask1 = { subject: Text1, time: Text2,date: selectedDate, notes: Text3,priority: priority  };
  
      // Add the task and sort in ascending order based on time
      const updatedTask = [...Taskwith, newTask1].sort((a, b) => {
        const dateA = new Date(a.date + 'T' + a.time);
        const dateB = new Date(b.date + 'T' + b.time);
        return dateA - dateB;
    });
  
      setTaskwith(updatedTask);
      setText1("");
      setText2("");
      setText3("");
      setSelectedDate("");
      console.log(updatedTask);
      setPriority("medium");

  };
  
      const handleonchange1=(event)=>{
        setText1(event.target.value);
      }
      const handleonchange2=(event)=>{
        setText2(event.target.value);
      }
      const handleonchange3=(event)=>{
        setText3(event.target.value);
      }
     const RemoveTask=(index)=>{
      const completed_task=Tasks[index];
        setTasks(Tasks.filter((_, i) => i !== index));
        setTaskcomplete([...Taskcomplete,completed_task]);
        console.log(Taskcomplete)
        
       }
       const RemoveReminder=(index)=>{
        setReminders((prevReminder)=>prevReminder.filter((reminder)=>reminder.index!==index))
        alert("reminder has been removed")
        const task_completed=Taskwith[index];
        setTaskwith(Taskwith.filter((_, i) => i !==index));
        setTaskcomplete([...Taskcomplete,task_completed]);
       }



         const [reminders, setReminders] = useState([]); 
       

         const handleSetReminder = () => {
           if (!Text1 || !Text2) {
             alert("Please enter a reminder message and time.");
             return;
           }
       
           const newReminder = {
             text: Text1,
             time: Text2,
           };
       
           setReminders((prevReminders) => [...prevReminders, newReminder]);
           alert(`Reminder set for ${Text2}.`);
       

           setText1("");
           setText2("");
         };
         useEffect(() => {
          const savedHideTips = localStorage.getItem('hideTaskTips');
          const savedCompletedTips = localStorage.getItem('completedTips');
          
          if (savedHideTips) {
            setShowTips(savedHideTips !== 'true');
          }
          
          if (savedCompletedTips) {
            setCompletedTips(JSON.parse(savedCompletedTips));
          }
        }, []);
        useEffect(() => {
          // Track user experience level based on completed tasks
          const totalCompletedTasks = Taskcomplete.length;
          if (totalCompletedTasks > 30) {
            setUserExperience('advanced');
            setShowAdvancedFeatures(true);
          } else if (totalCompletedTasks > 10) {
            setUserExperience('intermediate');
          }
        }, [Taskcomplete.length]);
       
         useEffect(() => {
           if (reminders.length === 0) return;
       
           const interval = setInterval(() => {
             const currentTime = new Date().toLocaleTimeString([], {
               hour: "2-digit",
               minute: "2-digit",
               hour12: false,
             });
       

             const triggeredReminders = reminders.filter((reminder) => reminder.time === currentTime);
       
             if (triggeredReminders.length > 0) {
               triggeredReminders.forEach((reminder) => {
                 alert(`Reminder: ${reminder.text}`);
               });

               setReminders((prevReminders) =>
                 prevReminders.filter((reminder) => !triggeredReminders.includes(reminder))
               );
             }
           }, 1000);
       
           return () => clearInterval(interval);
         }, [reminders]);
       
    
return (
  <>
        {showAlert && (
        <TaskAlert 
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
      

   <Navbar completedTasksCount={Taskcomplete.length} />

<div style={{
      width: "100%",
      height: "530px", // Adjust this value as needed
      overflow: "hidden",
      marginBottom: "20px"
    }}>
      <img 
        src="task.png" 
        alt="Task Management Banner"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: "0", // Remove border radius for full-width look
       
        }}
      />
    </div>
    
    <br />
    <br />
    
<div className="container mt-4">
  <div className="row">
    {/* Left Column - Task Inputs */}
    <div className="col-md-6 pe-4" style={{ borderRight: "2px solid #D4A373" }}>
      <h3 style={{ color: "#4A6656", marginBottom: "30px" }}>Create New Task</h3>
      
      <div className="mb-4">
        <label style={{ color: "#4A6656", fontSize: "18px", fontWeight: 600 }}>
          Task Subject
        </label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter the Task Name Here"
          value={Text1}
          onChange={handleonchange1}
          style={{
            backgroundColor: "#FAF3DD",
            border: "2px solid #D4A373",
            outline: "none",
            color: "#5C4033",
          }}
        />
      </div>

      <div className="mb-4">
        <label style={{ color: "#4A6656", fontSize: "18px", fontWeight: 600 }}>
          Task Deadline
        </label>
        <div className="d-flex gap-2">
          <input
            type="time"
            value={Text2}
            onChange={(e) => setText2(e.target.value)}
            className="form-control"
            style={{
              backgroundColor: "#FAF3DD",
              border: "2px solid #D4A373",
              outline: "none",
            }}
          />
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="form-control"
            style={{
              backgroundColor: "#FAF3DD",
              border: "2px solid #D4A373",
              outline: "none",
            }}
          />
        </div>
      </div>

      <div className="mb-4">
        <label style={{ color: "#4A6656", fontSize: "18px", fontWeight: 600 }}>
          Notes
        </label>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Enter the Notes Here"
          value={Text3}
          onChange={handleonchange3}
          style={{
            backgroundColor: "#FAF3DD",
            border: "2px solid #D4A373",
            outline: "none",
            color: "#5C4033",
          }}
        />
      </div>

      <div className="mb-4">
        <label style={{ color: "#4A6656", fontSize: "18px", fontWeight: 600 }}>
          Priority
        </label>
        <select
          className="form-control"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            backgroundColor: "#FAF3DD",
            border: "2px solid #D4A373",
            outline: "none",
            color: "#5C4033",
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="d-grid gap-2">
        <button
          disabled={Text1.length === 0}
          className="btn"
          onClick={taskadder}
          style={{ 
            backgroundColor: "#77BFA3", 
            color: "#ffffff",
            padding: "10px"
          }}
        >
          Add Task
        </button>
        <button
          disabled={Text1.length === 0}
          className="btn"
          onClick={() => {
            taskadderwith();
            handleSetReminder();
          }}
          style={{ 
            backgroundColor: "#ffffff",
            color: "#77BFA3",
            border: "2px solid #77BFA3"
          }}
        >
          Add Task with Reminder
        </button>
      </div>
    </div>

    {/* Right Column - Task Overview */}
    <div className="col-md-6">
  <div style={{ 
    backgroundColor: "#FAF3DD",
    padding: "20px",
    borderRadius: "8px",
    border: "2px solid #D4A373",
    marginBottom: "20px"
  }}>
    <h3 style={{ color: "#4A6656", marginBottom: "20px" }}>Today's Tasks</h3>
    
    <div className="today-tasks mb-4">
      {Tasks.concat(Taskwith).filter(task => {
        const today = new Date().toISOString().split('T')[0];
        return task.date === today;
      }).length === 0 ? (
        <p style={{ color: "#4A6656", fontSize: "16px" }}>No tasks scheduled for today</p>
      ) : (
        Tasks.concat(Taskwith)
          .filter(task => {
            const today = new Date().toISOString().split('T')[0];
            return task.date === today;
          })
          .sort((a, b) => new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time))
          .map((task, index) => (
            <div key={index} className="task-summary-item" style={{
              padding: "10px",
              marginBottom: "10px",
              borderLeft: `4px solid ${
                task.priority === 'high' ? '#dc3545' : 
                task.priority === 'medium' ? '#ffc107' : '#28a745'
              }`,
              backgroundColor: "#ffffff",
              borderRadius: "4px"
            }}>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ color: "#4A6656", fontWeight: "500" }}>
                  {task.subject}
                </span>
                <span style={{ color: "#666", fontSize: "14px" }}>
                  {task.time}
                </span>
              </div>
            </div>
          ))
      )}
    </div>

    <div className="upcoming-deadlines mt-4">
      <h5 style={{ color: "#4A6656", marginBottom: "15px" }}>Upcoming Deadlines</h5>
      {Tasks.concat(Taskwith)
        .filter(task => {
          const today = new Date().toISOString().split('T')[0];
          return task.date > today;
        })
        .slice(0, 3)
        .map((task, index) => (
          <div key={index} className="deadline-item" style={{
            padding: "8px",
            marginBottom: "8px",
            backgroundColor: "#ffffff",
            borderRadius: "4px",
            fontSize: "14px"
          }}>
            <div className="d-flex justify-content-between">
              <span style={{ color: "#4A6656" }}>{task.subject}</span>
              <span style={{ color: "#666" }}>{task.date}</span>
            </div>
          </div>
        ))}
    </div>
  </div>
  <div style={{ 
        backgroundColor: "#FAF3DD",
        padding: "20px",
        borderRadius: "8px",
        border: "2px solid #D4A373"
      }}>
        <h3 style={{ color: "#4A6656", marginBottom: "20px" }}>Today's Overview</h3>
        
        <div className="mb-4">
          <h5 style={{ color: "#4A6656" }}>Tasks Summary</h5>
          <div className="d-flex justify-content-between mb-2">
            <span>Total Active Tasks:</span>
            <span style={{ color: "#77BFA3", fontWeight: "bold" }}>{totalActiveTasks}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Completed Today:</span>
            <span style={{ color: "#77BFA3", fontWeight: "bold" }}>
              {Taskcomplete.filter(task => {
                const today = new Date().toISOString().split('T')[0];
                return task.date === today;
              }).length}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Overall Progress:</span>
            <span style={{ color: "#77BFA3", fontWeight: "bold" }}>
              {Math.round(calculateProgress().overall)}%
            </span>
          </div>
        </div>

        
      </div>

  </div>
  </div>
</div>
    

    <br />

    <div className="tips-section mb-4" 
      style={{ 
        backgroundColor: "#FAF3DD", 
        padding: "15px", 
        borderRadius: "8px", 
        border: "2px solid #D4A373",
        maxWidth: "800px",
        margin: "0 auto 20px auto"
      }}>
      <div className="d-flex justify-content-between align-items-center">
        <h5 style={{ color: "#4A6656", margin: 0 }}>
          Quick Tips 💡
        </h5>
        <button 
          className="btn btn-sm"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            color: "#4A6656",
            border: "none",
            backgroundColor: "transparent"
          }}
        >
          {isOpen ? '▼' : '▶'}
        </button>
      </div>


    </div>
    <div className="tips-section mb-4" 
  style={{ 
    display: showTips ? 'block' : 'none',
    backgroundColor: "#FAF3DD", 
    padding: "15px", 
    borderRadius: "8px", 
    border: "2px solid #D4A373",
    maxWidth: "800px",
    margin: "0 auto 20px auto" // This centers the tips section
  }}>
  <div className="d-flex justify-content-between align-items-center">
    <h5 style={{ color: "#4A6656", margin: 0 }}>Quick Tips 💡</h5>
    <button 
      onClick={() => {
        setShowTips(false);
        localStorage.setItem('hideTaskTips', 'true');
      }}
      className="btn-close"
    />
  </div>
  <div className="tips-content mt-3">
    {[
      'Click ✅ to mark tasks as complete',
      'Use priorities to organize tasks',
      'Set reminders for important deadlines',
    ].map((tip, index) => (
      <div key={index} className="tip-item d-flex align-items-center gap-2 mb-2">
        <input 
          type="checkbox"
          checked={completedTips.includes(index)}
          onChange={() => {
            const newCompletedTips = completedTips.includes(index) 
              ? completedTips.filter(t => t !== index)
              : [...completedTips, index];
            setCompletedTips(newCompletedTips);
            localStorage.setItem('completedTips', JSON.stringify(newCompletedTips));
          }}
          style={{ accentColor: "#77BFA3" }}
        />
        <span style={{ color: "#4A6656" }}>{tip}</span>
      </div>
    ))}
  </div>
</div>
    
    
    <div id="tasks-section" className="container" style={{
  border: "5px solid rgb(206, 169, 132)",
  padding: "20px 20px",
  borderRadius: "25px",
  backgroundColor: "#A8D5BA",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  margin: "40px auto",
  maxWidth: "90%"

}}>
  <div className="d-flex justify-content-center mb-4">
    <button
      className={`btn mx-2 ${activeTab === 'active' ? 'btn-success' : 'btn-outline-success'}`}
      onClick={() => setActiveTab('active')}
      style={{
        backgroundColor: activeTab === 'active' ? "#77BFA3" : "#ffffff",
        color: activeTab === 'active' ? "#ffffff" : "#77BFA3",
        border: "2px solid #77BFA3",
        width: "200px"
      }}
    >
      Active Tasks ({totalActiveTasks})
    </button>
    <button
      className={`btn mx-2 ${activeTab === 'completed' ? 'btn-success' : 'btn-outline-success'}`}
      onClick={() => setActiveTab('completed')}
      style={{
        backgroundColor: activeTab === 'completed' ? "#77BFA3" : "#ffffff",
        color: activeTab === 'completed' ? "#ffffff" : "#77BFA3",
        border: "2px solid #77BFA3",
        width: "200px"
      }}
    >
      Completed Tasks ({totalCompletedTasks})
    </button>
    <div className="mb-3">
  <input
    type="text"
    placeholder="Search tasks..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="form-control"
    style={{
      backgroundColor: "#FAF3DD",
      border: "2px solid #D4A373",
      width: "300px",
      margin: "0 auto",
      marginTop:"10px"
    }}
  />
</div>
  </div>

  {activeTab === 'active' ? (
    <>

<div className="mb-3 d-flex justify-content-center gap-3">
  <select
    className="form-select"
    value={timeFilter}
    onChange={(e) => setTimeFilter(e.target.value)}
    style={{
      backgroundColor: "#FAF3DD",
      border: "2px solid #D4A373",
      color: "#5C4033",
      width: "200px"
    }}
  >
    <option value="all">All Tasks</option>
    <option value="today">Today</option>
    <option value="tomorrow">Tomorrow</option>
    <option value="week">This Week</option>
  </select>

  <select
    className="form-select"
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
    style={{
      backgroundColor: "#FAF3DD",
      border: "2px solid #D4A373",
      color: "#5C4033",
      width: "200px"
    }}
  >
    <option value="all">All Priorities</option>
    <option value="high" style={{color: "#dc3545"}}>High Priority</option>
    <option value="medium" style={{color: "#ffc107"}}>Medium Priority</option>
    <option value="low" style={{color: "#28a745"}}>Low Priority</option>
  </select>
</div>
      <div className="row" style={{
 backgroundColor: "#A8D5BA",
 padding: "20px",
 borderRadius: "12px",
 
}}>
      <div className="col-md-6 col-sm-6 col-12 text-center" style={{padding:"20px",boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"}}>
          <h3 style={{ color: "#5C4033", marginLeft: "10px" }}>
            Tasks
          </h3>
          <br />
          {Tasks.length === 0 ? (
            <p
              style={{
                fontSize: "24px",
                fontWeight: "500",
                marginLeft: "10px",
                color: "#4A6656",
                
              }}
            >
              No Tasks Added without Reminder
            </p>
          ) :filterTasks(Tasks).map((task, index) => (
            <div key={index} className="task-item" style={{
              backgroundColor: "#FAF3DD",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
              border: "2px solid #D4A373",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    transform: expandedTasks[`task-${index}`] ? "scale(1.02)" : "scale(1)",
    hover: {
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      
      transform: "translateY(-2px)"
    }
            }}>
              <div 
                onClick={() => toggleTaskDetails(`task-${index}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      RemoveTask(index);
                    }}
                    className="btn btn-success"
                    style={{ marginRight: "15px" }}
                  >
                    ✅
                  </button>
                  <strong style={{color:"#4A6656"}}>
                    {task.subject}
                  </strong>
                  <span style={{marginLeft: "15px", color: "#666"}}>
                    - {task.notes}
                  </span>
                </div>
              </div>
          
              {expandedTasks[`task-${index}`] && (
                <div className="task-details" style={{
                  marginTop: "10px",
                  paddingTop: "10px",
                  borderTop: "1px solid #D4A373"
                }}>
                  <p>
                    <strong style={{color:"#4A6656", marginRight: "10px"}}>Date:</strong>
                    {task.date}
                  </p>
                  <p>
                    <strong style={{color:"#4A6656", marginRight: "10px"}}>Time:</strong>
                    {task.time}
                  </p>
                  <p>
                    <strong style={{color:"#4A6656", marginRight: "10px"}}>Priority:</strong>
                    <span style={{
                      color: task.priority === 'high' ? '#dc3545' : 
                             task.priority === 'medium' ? '#ffc107' : '#28a745',
                      fontWeight: 'bold'
                    }}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )) }
        </div>

        <div className="col-md-6 col-sm-6 col-12 text-center" style={{padding:"20px",boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"}}>
          <h3 style={{ color: "#5C4033", marginLeft: "10px" }}>
            Tasks with Reminders
          </h3>
          <br />
          {Taskwith.length === 0 ? (
            <p
              style={{
                fontSize: "24px",
                fontWeight: "500",
                marginLeft: "20px",
                color: "#4A6656",
              }}
            >
              No Tasks Added with Reminder
            </p>
          ) : (filterTasks(Taskwith).map((task1, index) => (
            <div key={index} className="task-item" style={{
              backgroundColor: "#FAF3DD",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
              border: "2px solid #D4A373",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s ease",
    cursor: "pointer",
    transform: expandedTasks[`taskwith-${index}`] ? "scale(1.02)" : "scale(1)",
    hover: {
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      transform: "translateY(-2px)"
    }
            }}>
              <div 
                onClick={() => toggleTaskDetails(`taskwith-${index}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      RemoveReminder(index);
                    }}
                    className="btn btn-success"
                    style={{ marginRight: "15px" }}
                  >
                    ✅
                  </button>
                  <strong style={{color:"#4A6656"}}>
                    {task1.subject}
                  </strong>
                  <span style={{marginLeft: "15px", color: "#666"}}>
                    - {task1.notes}
                  </span>
                </div>
              </div>
          
              {expandedTasks[`taskwith-${index}`] && (
                <div className="task-details" style={{
                  marginTop: "10px",
                  paddingTop: "10px",
                  borderTop: "1px solid #D4A373"
                }}>
                  <p>
                    <strong style={{color:"#4A6656", marginRight: "10px"}}>Date:</strong>
                    {task1.date}
                  </p>
                  <p>
                    <strong style={{color:"#4A6656", marginRight: "10px"}}>Time:</strong>
                    {task1.time}
                  </p>
                  <p>
                    <strong style={{color:"#4A6656", marginRight: "10px"}}>Priority:</strong>
                    <span style={{
                      color: task1.priority === 'high' ? '#dc3545' : 
                             task1.priority === 'medium' ? '#ffc107' : '#28a745',
                      fontWeight: 'bold'
                    }}>
                      {task1.priority.charAt(0).toUpperCase() + task1.priority.slice(1)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )))
           }
        </div>
      </div>

           </>
    ):
      (
        <div className="completed-tasks" style={{
          backgroundColor: "#A8D5BA",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }}>
          <h3 style={{ color: "#5C4033", marginLeft: "10px" }}>
            Completed Tasks
          </h3>
          {Taskcomplete.length === 0 ? (
            <p style={{
              fontSize: "24px",
              fontWeight: "500",
              marginLeft: "10px",
              color: "#4A6656",
            }}>
              No Tasks Completed yet
            </p>
          ) : (
            Taskcomplete.map((task, index) => (
              <div key={index} className="task-item" style={{
                backgroundColor: "#FAF3DD",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "8px",
                border: "2px solid #D4A373",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
                transform: expandedTasks[`completed-${index}`] ? "scale(1.02)" : "scale(1)"
              
              }}>
                <div 
                  onClick={() => toggleTaskDetails(`completed-${index}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center">
                    <span className="btn btn-success" style={{ marginRight: "15px" }}>
                      ✓
                    </span>
                    <strong style={{color:"#4A6656"}}>
                      {task.subject}
                    </strong>
                    <span style={{marginLeft: "15px", color: "#666"}}>
                      - {task.notes}
                    </span>
                  </div>
                </div>
    
                {expandedTasks[`completed-${index}`] && (
                  <div className="task-details" style={{
                    marginTop: "10px",
                    paddingTop: "10px",
                    borderTop: "1px solid #D4A373"
                  }}>
                    <p>
                      <strong style={{color:"#4A6656", marginRight: "10px"}}>Date:</strong>
                      {task.date}
                    </p>
                    <p>
                      <strong style={{color:"#4A6656", marginRight: "10px"}}>Time:</strong>
                      {task.time}
                    </p>
                    <p>
                      <strong style={{color:"#4A6656", marginRight: "10px"}}>Priority:</strong>
                      <span style={{
                        color: task.priority === 'high' ? '#dc3545' : 
                               task.priority === 'medium' ? '#ffc107' : '#28a745',
                        fontWeight: 'bold'
                      }}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
      </div>
      <br/>
      <br/> 
      


      <div id="statistics-section" className=" progress-section mb-4" style={{ backgroundColor: "#FAF3DD", padding: "25px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", border: "2px solid #D4A373",margin: "40px auto",
    maxWidth: "90%" }}>
        <div className="statistics-section">
          <h4 style={{ color: "#4A6656", margin: 0 }}>Progress Tracking</h4>
          <button 
            className="btn btn-sm" 
            onClick={() => setShowProgress(!showProgress)}
            style={{
              color: "#4A6656",
              border: "none",
              backgroundColor: "transparent"
            }}
          >
            {showProgress ? '▼' : '▶'}
          </button>
        </div>
        
        {showProgress && (
          <div className="progress-bars"style={{ padding: "10px 0" }}>
            <div className="mb-2">
              <div className="d-flex justify-content-between mb-1">
                <span style={{ color: "#4A6656" }}>Overall Progress</span>
                <span style={{ color: "#4A6656" }}>{Math.round(calculateProgress().overall)}%</span>
              </div>
              <div className="progress" style={{ height: "20px" }}>
                <div 
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${calculateProgress().overall}%`,
                    backgroundColor: "#77BFA3"
                  }}
                />
              </div>
            </div>

            <div className="mb-2">
              <div className="d-flex justify-content-between mb-1">
                <span style={{ color: "#dc3545" }}>High Priority</span>
                <span style={{ color: "#dc3545" }}>{Math.round(calculateProgress().high)}%</span>
              </div>
              <div className="progress" style={{ height: "15px" }}>
                <div 
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: `${calculateProgress().high}%` }}
                />
              </div>
            </div>

            <div className="mb-2">
              <div className="d-flex justify-content-between mb-1">
                <span style={{ color: "#ffc107" }}>Medium Priority</span>
                <span style={{ color: "#ffc107" }}>{Math.round(calculateProgress().medium)}%</span>
              </div>
              <div className="progress" style={{ height: "15px" }}>
                <div 
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: `${calculateProgress().medium}%` }}
                />
              </div>
            </div>

            <div className="mb-2">
              <div className="d-flex justify-content-between mb-1">
                <span style={{ color: "#28a745" }}>Low Priority</span>
                <span style={{ color: "#28a745" }}>{Math.round(calculateProgress().low)}%</span>
              </div>
              <div className="progress" style={{ height: "15px" }}>
                <div 
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${calculateProgress().low}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Weekly Summary Section */}
      <div className="weekly-summary mb-4" style={{ backgroundColor: "#FAF3DD", padding: "20px",boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  margin: "40px auto", borderRadius: "8px", border: "2px solid #D4A373",maxWidth: "90%" }}>
        <div className="d-flex justify-content-between">
          <div className="stat-box text-center p-2" style={{ flex: 1 }}>
            <h5 style={{ color: "#4A6656" }}>Tasks Completed Today</h5>
            <h3 style={{ color: "#77BFA3" }}>
              {Taskcomplete.filter(task => {
                const today = new Date().toISOString().split('T')[0];
                return task.date === today;
              }).length}
            </h3>
          </div>
          <div className="stat-box text-center p-2" style={{ flex: 1 }}>
            <h5 style={{ color: "#4A6656" }}>Tasks Remaining</h5>
            <h3 style={{ color: "#D4A373" }}>{Tasks.length + Taskwith.length}</h3>
          </div>
          <div className="stat-box text-center p-2" style={{ flex: 1 }}>
            <h5 style={{ color: "#4A6656" }}>Completion Rate</h5>
            <h3 style={{ color: "#77BFA3" }}>
              {Math.round(calculateProgress().overall)}%
            </h3>
          </div>
        </div>
      </div>
      <div className="contact-section" style={{ 
  backgroundColor: "#5C4033",
  padding: "40px 0",
  marginTop: "40px",
  color: "#FAF3DD"
}}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8 text-center">
        <h3 style={{ 
          color: "#FAF3DD",
          marginBottom: "30px",
          fontWeight: "600"
        }}>
          Contact Us
        </h3>
        <div className="d-flex justify-content-center gap-4">
          <a href="https://github.com/balajivejendla" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: "#FAF3DD",
              fontSize: "24px",
              transition: "color 0.3s"
            }}
            onMouseOver={(e) => e.target.style.color = "#77BFA3"}
            onMouseOut={(e) => e.target.style.color = "#FAF3DD"}
          >
            <FaGithub />
          </a>

          <a href="https://mail.google.com/mail/u/0/" 
            style={{ 
              color: "#FAF3DD",
              fontSize: "24px",
              transition: "color 0.3s"
            }}
            onMouseOver={(e) => e.target.style.color = "#77BFA3"}
            onMouseOut={(e) => e.target.style.color = "#FAF3DD"}
          >
            <FaEnvelope />
          </a>
          <a href="tel:+1234567890" 
            style={{ 
              color: "#FAF3DD",
              fontSize: "24px",
              transition: "color 0.3s"
            }}
            onMouseOver={(e) => e.target.style.color = "#77BFA3"}
            onMouseOut={(e) => e.target.style.color = "#FAF3DD"}
          >
            <FaPhone />
          </a>
        </div>
        <div className="contact-details mt-4" style={{ color: "#FAF3DD" }}>
          <p>Email: balajivejendla@gmail.com</p>
          <p>Phone: +91 9550903943</p>
          <p>Location: Chennai, Tamil Nadu,India</p>
        </div>
        <div className="copyright mt-4" style={{ 
          color: "#A8D5BA",
          fontSize: "14px"
        }}>
          © {new Date().getFullYear()} Task Management System. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</div>
{showBackToTop && (
  <button
    onClick={scrollToTop}
    style={{
      position: 'fixed',
      bottom: '40px',
      right: '40px',
      width: '50px',
      height: '50px',
      backgroundColor: '#77BFA3',
      color: '#FAF3DD',
      border: 'none',
      borderRadius: '50%',
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
      zIndex: 1000,
    }}
    onMouseOver={(e) => {
      e.target.style.transform = 'scale(1.1)';
      e.target.style.backgroundColor = '#4A6656';
    }}
    onMouseOut={(e) => {
      e.target.style.transform = 'scale(1)';
      e.target.style.backgroundColor = '#77BFA3';
    }}
    aria-label="Back to top"
  >
    <FaArrowUp />
  </button>
)}
  </>
);
}
export default Tasks;

