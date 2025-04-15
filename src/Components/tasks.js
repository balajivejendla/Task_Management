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
      const [editingTask, setEditingTask] = useState(null);
      // Add near the top of your component with other state declarations
const [categories, setCategories] = useState([
  'Work',
  'Personal',
  'Shopping',
  'Health',
  'Study',
  'Urgent'
]);
const [taskCategory, setTaskCategory] = useState('Work');
const [categoryFilter, setCategoryFilter] = useState('all');
const [editFormData, setEditFormData] = useState({
  subject: '',
  time: '',
  date: '',
  notes: '',
  priority: 'medium'
});
const handleEditTask = (task, index, type) => {
  setEditingTask({ index, type }); // type can be 'regular' or 'reminder'
  setEditFormData({
    subject: task.subject,
    time: task.time,
    date: task.date,
    notes: task.notes,
    priority: task.priority
  });
};

const handleUpdateTask = () => {
  if (editingTask.type === 'regular') {
    const updatedTasks = [...Tasks];
    updatedTasks[editingTask.index] = editFormData;
    setTasks(updatedTasks);
  } else {
    const updatedTasksWithReminder = [...Taskwith];
    updatedTasksWithReminder[editingTask.index] = editFormData;
    setTaskwith(updatedTasksWithReminder);
  }
  setEditingTask(null);
  setAlertMessage('Task updated successfully!');
  setAlertType('success');
  setShowAlert(true);
};
      
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
const [showTypingAnimation, setShowTypingAnimation] = useState(true);
const [showLearningTips, setShowLearningTips] = useState(false);
const [specialOffer, setSpecialOffer] = useState({
  active: true,
  endsIn: 24 * 60 * 60, // 24 hours in seconds
});

const [productivityChallenge, setProductivityChallenge] = useState({
  active: false,
  targetTasks: 5,
  timeLimit: 2 * 60 * 60, // 2 hours in seconds
  completedTasks: 0,
  timeRemaining: 2 * 60 * 60,
});
const learningTips = [
  'Create smaller, manageable tasks instead of large ones',
  'Use high priority for urgent and important tasks',
  'Set specific deadlines for better time management',
  'Review your completed tasks to track progress',
  'Take breaks between tasks to maintain productivity',
  'Update task status regularly to stay organized'
];
const todayCompletedTasks = Taskcomplete.filter(task => {
  const today = new Date().toISOString().split('T')[0];
  return task.date === today;
}).length;
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
  const timer = setInterval(() => {
    // Update special offer countdown
    if (specialOffer.active && specialOffer.endsIn > 0) {
      setSpecialOffer(prev => ({
        ...prev,
        endsIn: prev.endsIn - 1
      }));
    }

    // Update productivity challenge countdown
    if (productivityChallenge.active && productivityChallenge.timeRemaining > 0) {
      setProductivityChallenge(prev => ({
        ...prev,
        timeRemaining: prev.timeRemaining - 1
      }));
    }
  }, 1000);

  return () => clearInterval(timer);
}, [specialOffer.active, productivityChallenge.active]);
useEffect(() => {
  const handleScroll = () => {
    if (window.pageYOffset > 1200) {
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
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const startProductivityChallenge = () => {
  setProductivityChallenge({
    active: true,
    targetTasks: 5,
    timeLimit: 2 * 60 * 60,
    completedTasks: 0,
    timeRemaining: 2 * 60 * 60,
  });
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
const updateProductivityChallenge = () => {
  if (productivityChallenge.active) {
    setProductivityChallenge(prev => {
      const newCompletedTasks = prev.completedTasks + 1;
      if (newCompletedTasks >= prev.targetTasks) {
        // Challenge completed!
        setShowAlert(true);
        setAlertMessage("🎉 Congratulations! You've completed the productivity challenge!");
        setAlertType('success');
        return { ...prev, active: false };
      }
      return { ...prev, completedTasks: newCompletedTasks };
    });
  }
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
            const newTask = { subject: Text1, time: Text2,date:selectedDate, notes: Text3,priority: priority,category:taskCategory  };
    
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
        setAlertMessage(`Task added successfully! ${todayCompletedTasks > 0 
          ? `You've completed ${todayCompletedTasks} ${todayCompletedTasks === 1 ? 'task' : 'tasks'} today! Keep up the great work! 🎉 ⭐` 
          : 'Keep going! 💪'}`);
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
        updateProductivityChallenge();
        
       }
       const RemoveReminder=(index)=>{
        setReminders((prevReminder)=>prevReminder.filter((reminder)=>reminder.index!==index))
        alert("reminder has been removed")
        const task_completed=Taskwith[index];
        setTaskwith(Taskwith.filter((_, i) => i !==index));
        setTaskcomplete([...Taskcomplete,task_completed]);
        updateProductivityChallenge();
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
  {showBackToTop && (
  <div style={{
    position: 'fixed',
    bottom: '90px',
    right: '28px',
    zIndex: 1000
  }}>
    <button
      onClick={scrollToTop}
      style={{
        backgroundColor: '#77BFA3',
        color: '#FAF3DD',
        border: 'none',
        borderRadius: '50%',
        width: '45px',
        height: '45px',
        fontSize: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.backgroundColor = '#4A6656';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.backgroundColor = '#77BFA3';
      }}
    >
      <FaArrowUp />
    </button>
  </div>
)}

  <div style={{
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000
}}>
  <button
    onClick={() => setShowLearningTips(!showLearningTips)}
    style={{
      backgroundColor: '#77BFA3',
      color: '#FAF3DD',
      border: 'none',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      fontSize: '24px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onMouseOver={(e) => {
      e.target.style.transform = 'scale(1.1)';
      e.target.style.backgroundColor = '#4A6656';
    }}
    onMouseOut={(e) => {
      e.target.style.transform = 'scale(1)';
      e.target.style.backgroundColor = '#77BFA3';
    }}
  >
    💡
  </button>

  {/* Learning Tips Popup */}
  {showLearningTips && (
    <div style={{
      position: 'fixed',
      bottom: '90px',
      right: '20px',
      width: '300px',
      backgroundColor: '#FAF3DD',
      borderRadius: '8px',
      border: '2px solid #D4A373',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      padding: '20px',
      zIndex: 1000
    }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 style={{ color: '#4A6656', margin: 0 }}>Learning Tips</h5>
        <button
          onClick={() => setShowLearningTips(false)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#4A6656',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {learningTips.map((tip, index) => (
          <div
            key={index}
            style={{
              padding: '8px 0',
              borderBottom: index < learningTips.length - 1 ? '1px solid #D4A373' : 'none',
              color: '#5C4033'
            }}
          >
            {tip}
          </div>
        ))}
      </div>
    </div>
  )}
</div>

        {showAlert && (
        <TaskAlert 
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
      

   <Navbar completedTasksCount={Taskcomplete.length} />

   <div style={{
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  marginTop: "-80px",
  position: "relative",
  left: "50%",
  right: "50%",
  marginLeft: "-50vw",
  marginRight: "-50vw"
}}>
  <img 
    src="task.png" 
    alt="Task Management Banner"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: "0",
      position: "relative",
      zIndex: "0"
    }}
  />
  <div style={{
    position: "absolute",
    bottom:"50px",
    left: "50%",
    transform: "translate(-50%)",
    textAlign: "center",
    color: "#FAF3DD",
    zIndex: "1",
    width: "100%",
    padding: "0 20px"
    
  }}>
    <h1 style={{
      fontSize: "4rem",
      fontWeight: "bold",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
      marginBottom: "20px"
    }}>
      Welcome to TaskFlow Pro
    </h1>
    <p style={{
      fontSize: "1.5rem",
      maxWidth: "800px",
      margin: "0 auto",
      textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
    }}>
      Organize, Track, and Complete Your Tasks with Ease
    </p>
    <button 
  onClick={() => {
    const element = document.getElementById('tasks-section');
    const offset = 1250; 
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }}      style={{
        backgroundColor: "#77BFA3",
        color: "#FAF3DD",
        border: "none",
        padding: "12px 30px",
        borderRadius: "25px",
        fontSize: "1.1rem",
        marginTop: "30px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = "#4A6656";
        e.target.style.transform = "translateY(-2px)";
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = "#77BFA3";
        e.target.style.transform = "translateY(0)";
      }}
    >
      Get Started
    </button>
  </div>
</div>
    
    <br />
    <div style={{
  display: "flex",
  justifyContent: "center",
  margin: "40px 0"
}}>
  <h2 className="typing-text" style={{
    color: "#4A6656",
    fontSize: "3rem",
    fontWeight: "bold",
    position: "relative",
    width: "fit-content",
    margin: "0 auto",
    fontFamily: "'Dancing Script', cursive"
  }}>
    Add Task
  </h2>
</div>
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
    Category
  </label>
  <div className="d-flex gap-2">
    <select
      className="form-control"
      value={taskCategory}
      onChange={(e) => setTaskCategory(e.target.value)}
      style={{
        backgroundColor: "#FAF3DD",
        border: "2px solid #D4A373",
        outline: "none",
        color: "#5C4033",
      }}
    >
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
    <button
      className="btn"
      onClick={() => {
        const newCategory = prompt('Enter new category name:');
        if (newCategory && !categories.includes(newCategory)) {
          setCategories([...categories, newCategory]);
        }
      }}
      style={{
        backgroundColor: "#77BFA3",
        color: "#ffffff",
        border: "none",
      }}
    >
      +
    </button>
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

<br/>
<br/>


<div className="special-offers mb-4" style={{
  backgroundColor: "#FAF3DD",
  padding: "20px",
  borderRadius: "8px",
  border: "2px solid #D4A373",
  margin: "20px auto",
  width: "100%",
}}>
  <h3 style={{ 
    color: "#4A6656", 
    textAlign: "center", 
    marginBottom: "25px",
    fontSize: "2rem",
    fontWeight: "600",
    borderBottom: "2px solid #D4A373",
    paddingBottom: "10px"
  }}>
    Special Offers & Challenges
  </h3>
  {specialOffer.active && specialOffer.endsIn > 0 && (
    <div className="offer-card" style={{
      backgroundColor: "#77BFA3",
      padding: "15px",
      borderRadius: "8px",
      color: "#FAF3DD",
      marginBottom: "15px",
      position: "relative",
      overflow: "hidden"
    }}>
               <div className="ribbon" style={{
            position: "absolute",
            top: "50px",
            right: "10px",
            transform: "rotate(45deg)",
            backgroundColor: "#FFD700",
            padding: "5px 40px",
            color: "#4A6656",
            fontWeight: "bold",
            fontSize: "0.9rem"
          }}>
            Limited Time!
          </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5 style={{ margin: 0 }}>🌟 Special Offer!</h5>
          <p style={{ margin: "5px 0" }}>Upgrade to Pro – 50% off</p>
        </div>
        <div className="text-end">
          <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {formatTime(specialOffer.endsIn)}
          </div>
          <small>remaining</small>
        </div>
      </div>
      <button
        className="btn"
        style={{
          backgroundColor: "#FAF3DD",
          color: "#4A6656",
          marginTop: "10px",
          width: "100%"
        }}
        onClick={() => {/* Handle upgrade */}}
      >
        Upgrade Now
      </button>
    </div>
  )}

  {productivityChallenge.active ? (
    <div className="challenge-card" style={{
      backgroundColor: "#4A6656",
      padding: "15px",
      borderRadius: "8px",
      color: "#FAF3DD",
      
    }}>
      <h5>🏃‍♂️ Productivity Challenge</h5>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p style={{ margin: "5px 0" }}>
            Complete {productivityChallenge.targetTasks} tasks in 2 hours
          </p>
          <div className="progress" style={{ height: "20px", backgroundColor: "#FAF3DD" }}>
            <div
              className="progress-bar"
              style={{
                width: `${(productivityChallenge.completedTasks / productivityChallenge.targetTasks) * 100}%`,
                backgroundColor: "#77BFA3"
              }}
            />
          </div>
          <small>{productivityChallenge.completedTasks} / {productivityChallenge.targetTasks} tasks</small>
        </div>
        <div className="text-end">
          <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            {formatTime(productivityChallenge.timeRemaining)}
          </div>
          <small>remaining</small>
        </div>
      </div>
    </div>
  ) : (
    <button
      className="btn"
      style={{
        backgroundColor: "#77BFA3",
        color: "#FAF3DD",
        width: "100%"
      }}
      onClick={startProductivityChallenge}
    >
      Start Productivity Challenge
    </button>
  )}

</div>
<br/>

    
    <div id="tasks-section" className="container" style={{
  border: "5px solid rgb(206, 169, 132)",
  padding: "20px 20px",
  borderRadius: "25px",
  backgroundColor: "#A8D5BA",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  margin: "40px auto",
  maxWidth: "100%"

}}>
 <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-4">
  <div className="d-flex flex-column flex-sm-row gap-2 w-100 justify-content-center" style={{ maxWidth: "600px" }}>
    <button
      className={`btn ${activeTab === 'active' ? 'btn-success' : 'btn-outline-success'}`}
      onClick={() => setActiveTab('active')}
      style={{
        backgroundColor: activeTab === 'active' ? "#77BFA3" : "#ffffff",
        color: activeTab === 'active' ? "#ffffff" : "#77BFA3",
        border: "2px solid #77BFA3",
        width: "100%",
        maxWidth: "200px"
      }}
    >
      Active Tasks ({totalActiveTasks})
    </button>
    <button
      className={`btn ${activeTab === 'completed' ? 'btn-success' : 'btn-outline-success'}`}
      onClick={() => setActiveTab('completed')}
      style={{
        backgroundColor: activeTab === 'completed' ? "#77BFA3" : "#ffffff",
        color: activeTab === 'completed' ? "#ffffff" : "#77BFA3",
        border: "2px solid #77BFA3",
        width: "100%",
        maxWidth: "200px"
      }}
    >
      Completed Tasks ({totalCompletedTasks})
    </button>
  </div>
  
  <div className="w-100" style={{ maxWidth: "300px" }}>
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="form-control"
      style={{
        backgroundColor: "#FAF3DD",
        border: "2px solid #D4A373",
        width: "100%"
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
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  style={{
    backgroundColor: "#FAF3DD",
    border: "2px solid #D4A373",
    color: "#5C4033",
    width: "200px"
  }}
>
  <option value="all">All Categories</option>
  {categories.map(category => (
    <option key={category} value={category}>{category}</option>
  ))}
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
  <p style={{
    fontSize: "24px",
    fontWeight: "500",
    marginLeft: "10px",
    color: "#4A6656",
  }}>
    No Tasks Added without Reminder
  </p>
) : filterTasks(Tasks).map((task, index) => (
  <div key={index} className="task-item" style={{
    backgroundColor: "#FAF3DD",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "2px solid #D4A373",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease"
  }}>
    {editingTask?.type === 'regular' && editingTask?.index === index ? (
      <div className="edit-form p-3">
        <input
          type="text"
          value={editFormData.subject}
          onChange={(e) => setEditFormData({...editFormData, subject: e.target.value})}
          className="form-control mb-2"
          placeholder="Task Subject"
        />
        <div className="d-flex gap-2 mb-2">
          <input
            type="time"
            value={editFormData.time}
            onChange={(e) => setEditFormData({...editFormData, time: e.target.value})}
            className="form-control"
          />
          <input
            type="date"
            value={editFormData.date}
            onChange={(e) => setEditFormData({...editFormData, date: e.target.value})}
            className="form-control"
          />
        </div>
        <textarea
          value={editFormData.notes}
          onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
          className="form-control mb-2"
          placeholder="Notes"
        />
        <select
          value={editFormData.priority}
          onChange={(e) => setEditFormData({...editFormData, priority: e.target.value})}
          className="form-control mb-2"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-success btn-sm"
            onClick={handleUpdateTask}
          >
            Save
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setEditingTask(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <>
        <div className="d-flex justify-content-between align-items-center">
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
            <div>
              <strong style={{color:"#4A6656"}}>
                {task.subject}
              </strong>
              <span style={{marginLeft: "15px", color: "#666"}}>
                - {task.notes}
              </span>
            </div>
          </div>
          <button
            onClick={() => handleEditTask(task, index, 'regular')}
            className="btn btn-sm"
            style={{
              color: "#4A6656",
              backgroundColor: "transparent",
              border: "1px solid #4A6656"
            }}
          >
            ✏️ Edit
          </button>
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
      </>
    )}
  </div>
))}
        </div>

        <div className="col-md-6 col-sm-6 col-12 text-center" style={{padding:"20px",boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"}}>
          <h3 style={{ color: "#5C4033", marginLeft: "10px" }}>
            Tasks with Reminders
          </h3>
          <br />
          {Taskwith.length === 0 ? (
  <p style={{
    fontSize: "24px",
    fontWeight: "500",
    marginLeft: "20px",
    color: "#4A6656",
  }}>
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
    transition: "all 0.3s ease"
  }}>
    {editingTask?.type === 'reminder' && editingTask?.index === index ? (
      <div className="edit-form p-3">
        <input
          type="text"
          value={editFormData.subject}
          onChange={(e) => setEditFormData({...editFormData, subject: e.target.value})}
          className="form-control mb-2"
          placeholder="Task Subject"
        />
        <div className="d-flex gap-2 mb-2">
          <input
            type="time"
            value={editFormData.time}
            onChange={(e) => setEditFormData({...editFormData, time: e.target.value})}
            className="form-control"
          />
          <input
            type="date"
            value={editFormData.date}
            onChange={(e) => setEditFormData({...editFormData, date: e.target.value})}
            className="form-control"
          />
        </div>
        <textarea
          value={editFormData.notes}
          onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
          className="form-control mb-2"
          placeholder="Notes"
        />
        <select
          value={editFormData.priority}
          onChange={(e) => setEditFormData({...editFormData, priority: e.target.value})}
          className="form-control mb-2"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-success btn-sm"
            onClick={handleUpdateTask}
          >
            Save
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setEditingTask(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <>
        <div className="d-flex justify-content-between align-items-center">
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
            <div>
              <strong style={{color:"#4A6656"}}>
                {task1.subject}
              </strong>
              <span style={{marginLeft: "15px", color: "#666"}}>
                - {task1.notes}
              </span>
            </div>
          </div>
          <button
            onClick={() => handleEditTask(task1, index, 'reminder')}
            className="btn btn-sm"
            style={{
              color: "#4A6656",
              backgroundColor: "transparent",
              border: "1px solid #4A6656"
            }}
          >
            ✏️ Edit
          </button>
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
      </>
    )}
  </div>
)))}
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
    maxWidth: "100%" }}>
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
<div className="weekly-summary mb-4" style={{ 
  backgroundColor: "#FAF3DD", 
  padding: "20px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  margin: "40px auto", 
  borderRadius: "8px", 
  border: "2px solid #D4A373",
  maxWidth: "100%"
}}>
  <div className="row g-3">
    <div className="col-12 col-md-4">
      <div className="stat-box text-center p-2">
        <h5 style={{ 
          color: "#4A6656",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          marginBottom: "10px"
        }}>
          Tasks Completed Today
        </h5>
        <h3 style={{ 
          color: "#77BFA3",
          fontSize: "clamp(1.5rem, 3vw, 2rem)"
        }}>
          {Taskcomplete.filter(task => {
            const today = new Date().toISOString().split('T')[0];
            return task.date === today;
          }).length}
        </h3>
      </div>
    </div>
    
    <div className="col-12 col-md-4">
      <div className="stat-box text-center p-2">
        <h5 style={{ 
          color: "#4A6656",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          marginBottom: "10px"
        }}>
          Tasks Remaining
        </h5>
        <h3 style={{ 
          color: "#D4A373",
          fontSize: "clamp(1.5rem, 3vw, 2rem)"
        }}>
          {Tasks.length + Taskwith.length}
        </h3>
      </div>
    </div>
    
    <div className="col-12 col-md-4">
      <div className="stat-box text-center p-2">
        <h5 style={{ 
          color: "#4A6656",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          marginBottom: "10px"
        }}>
          Completion Rate
        </h5>
        <h3 style={{ 
          color: "#77BFA3",
          fontSize: "clamp(1.5rem, 3vw, 2rem)"
        }}>
          {Math.round(calculateProgress().overall)}%
        </h3>
      </div>
    </div>
  </div>
</div>
      <br/>
      <br/>

      <div className="testimonials-section mb-4" style={{ 
  backgroundColor: "#FAF3DD", 
  padding: "40px 20px",
  borderRadius: "8px",
  border: "2px solid #D4A373",
  margin: "40px auto",
  maxWidth: "100%"
}}>
  <h3 style={{ 
    color: "#4A6656", 
    textAlign: "center", 
    marginBottom: "30px",
    fontSize: "2rem",
    fontWeight: "600"
  }}>
    What Our Users Say
  </h3>
  
  <div className="row justify-content-center">
    <div className="col-md-4 mb-4">
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        height: "100%",
        transition: "transform 0.3s ease",
        cursor: "default"
      }}
      onMouseOver={(e) => e.target.style.transform = "translateY(-5px)"}
      onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
      >
        <div className="text-center mb-3">
          <img 
            src="https://randomuser.me/api/portraits/women/32.jpg"
            alt="Sarah Johnson"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "3px solid #77BFA3",
              marginBottom: "10px"
            }}
          />
        </div>
        <div style={{ color: "#FFD700", marginBottom: "10px", textAlign: "center" }}>★★★★★</div>
        <p style={{ color: "#5C4033", fontSize: "1.1rem", marginBottom: "15px" }}>
          "This task management system has revolutionized how I organize my work. The priority system is incredibly helpful!"
        </p>
        <div style={{ color: "#4A6656", fontWeight: "600", textAlign: "center" }}>Sarah Johnson</div>
        <div style={{ color: "#77BFA3", fontSize: "0.9rem", textAlign: "center" }}>Project Manager</div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        height: "100%",
        transition: "transform 0.3s ease",
        cursor: "default"
      }}
      onMouseOver={(e) => e.target.style.transform = "translateY(-5px)"}
      onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
      >
        <div className="text-center mb-3">
          <img 
            src="https://randomuser.me/api/portraits/men/45.jpg"
            alt="Michael Chen"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "3px solid #77BFA3",
              marginBottom: "10px"
            }}
          />
        </div>
        <div style={{ color: "#FFD700", marginBottom: "10px", textAlign: "center" }}>★★★★★</div>
        <p style={{ color: "#5C4033", fontSize: "1.1rem", marginBottom: "15px" }}>
          "The reminder feature ensures I never miss deadlines. Best task management tool I've used!"
        </p>
        <div style={{ color: "#4A6656", fontWeight: "600", textAlign: "center" }}>Michael Chen</div>
        <div style={{ color: "#77BFA3", fontSize: "0.9rem", textAlign: "center" }}>Software Developer</div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        height: "100%",
        transition: "transform 0.3s ease",
        cursor: "default"
      }}
      onMouseOver={(e) => e.target.style.transform = "translateY(-5px)"}
      onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
      >
        <div className="text-center mb-3">
          <img 
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="Emily Rodriguez"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "3px solid #77BFA3",
              marginBottom: "10px"
            }}
          />
        </div>
        <div style={{ color: "#FFD700", marginBottom: "10px", textAlign: "center" }}>★★★★★</div>
        <p style={{ color: "#5C4033", fontSize: "1.1rem", marginBottom: "15px" }}>
          "Clean interface and intuitive design. The progress tracking keeps me motivated!"
        </p>
        <div style={{ color: "#4A6656", fontWeight: "600", textAlign: "center" }}>Emily Rodriguez</div>
        <div style={{ color: "#77BFA3", fontSize: "0.9rem", textAlign: "center" }}>Freelance Designer</div>
      </div>
    </div>
  </div>
</div>


      
      <div className="section-full-width" style={{ 
  backgroundColor: "#5C4033",
  padding: "40px 0",
  marginTop: "40px",
  color: "#FAF3DD",

}}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8 text-center">
        <div className="animated-heading" style={{ marginBottom: "30px" }}>
          {"Contact Us".split('').map((letter, index) => (
            <span
              key={index}
              className="animated-letter"
              style={{
                display: "inline-block",
                animation: `fadeInUp 0.5s ease forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                transform: 'translateY(20px)',
                margin: '0 2px',
                fontSize: '2rem',
                fontWeight: '600',
                cursor: 'default'
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#77BFA3";
                e.target.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#FAF3DD";
                e.target.style.transform = "translateY(0)";
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="contact-icons d-flex justify-content-center gap-4 mb-4">
          <a href="https://github.com/balajivejendla" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-icon"
            style={{ 
              color: "#FAF3DD",
              fontSize: "24px",
              transition: "all 0.3s ease",
              padding: "10px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#77BFA3";
              e.target.style.transform = "translateY(-5px)";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#FAF3DD";
              e.target.style.transform = "translateY(0)";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <FaGithub />
          </a>

          <a href="mailto:balajivejendla@gmail.com"
            className="contact-icon"
            style={{ 
              color: "#FAF3DD",
              fontSize: "24px",
              transition: "all 0.3s ease",
              padding: "10px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#77BFA3";
              e.target.style.transform = "translateY(-5px)";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#FAF3DD";
              e.target.style.transform = "translateY(0)";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <FaEnvelope />
          </a>

          <a href="tel:+919550903943"
            className="contact-icon"
            style={{ 
              color: "#FAF3DD",
              fontSize: "24px",
              transition: "all 0.3s ease",
              padding: "10px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#77BFA3";
              e.target.style.transform = "translateY(-5px)";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#FAF3DD";
              e.target.style.transform = "translateY(0)";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <FaPhone />
          </a>
        </div>

        <div className="contact-details" 
          style={{ 
            color: "#FAF3DD",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px"
          }}>
          <p className="mb-2" style={{ transition: "all 0.3s ease" }}
             onMouseOver={(e) => e.target.style.color = "#77BFA3"}
             onMouseOut={(e) => e.target.style.color = "#FAF3DD"}>
            Email: balajivejendla@gmail.com
          </p>
          <p className="mb-2" style={{ transition: "all 0.3s ease" }}
             onMouseOver={(e) => e.target.style.color = "#77BFA3"}
             onMouseOut={(e) => e.target.style.color = "#FAF3DD"}>
            Phone: +91 9550903943
          </p>
          <p className="mb-0" style={{ transition: "all 0.3s ease" }}
             onMouseOver={(e) => e.target.style.color = "#77BFA3"}
             onMouseOut={(e) => e.target.style.color = "#FAF3DD"}>
            Location: Chennai, Tamil Nadu, India
          </p>
        </div>

        <div className="copyright mt-4" style={{ 
          color: "#A8D5BA",
          fontSize: "14px",
          transition: "all 0.3s ease"
        }}
        onMouseOver={(e) => e.target.style.opacity = "0.8"}
        onMouseOut={(e) => e.target.style.opacity = "1"}>
          © {new Date().getFullYear()} Task Management System. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</div>
  </>
);
}
export default Tasks;

