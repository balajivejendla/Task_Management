import React, { useState ,useEffect} from 'react'

function Tasks(){

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
const totalCompletedTasks = Taskcomplete.length;
const [showTips, setShowTips] = useState(localStorage.getItem('hideTaskTips') !== 'true');
const [completedTips, setCompletedTips] = useState(JSON.parse(localStorage.getItem('completedTips') || '[]'));
const [isOpen, setIsOpen] = useState(false);
const [priorityFilter, setPriorityFilter] = useState('all');


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
    <br />
    <br />
    
    
    <div className="d-flex justify-content-center allign items-center ">
      <p
        style={{
          color: "#4A6656",
          fontSize: "22px",
          marginRight: "35px",
          fontWeight: 600,
        }}
      >
        Task Subject :
      </p>
      <input
        className="form-control-lg w-50"
        type="text"
        placeholder="Enter the Task Name Here"
        value={Text1}
        onChange={handleonchange1}
        style={{
          color: "#5C4033",
          backgroundColor: "#FAF3DD",
          border: "2px solid #D4A373",
          outline: "none",
        }}
      ></input>
    </div>
    <br />
    <div className="d-flex justify-content-center allign items-center">
      <div
        className="small_screens"
        style={{ color: "#4A6656", fontWeight: 600 }}
      >
        Task Deadline :
      </div>
      <input
        readOnly
        className="form-control-lg w-50"
        type="text"
        placeholder="Click on Clock Button to Enter Time"
        value={Text2}
        onChange={handleonchange2}
        style={{
          marginLeft: "30px",
          backgroundColor: "#FAF3DD",
          border: "2px solid #D4A373",
          outline: "none",
        }}
      ></input>
      <input
        type="time"
        value={Text2}
        onChange={(e) => {
          setText2(e.target.value);
        }}
        style={{
          fontSize: "22px",
          marginLeft: "20px",
          backgroundColor: "#FAF3DD",
          border: "2px solid #D4A373",
          outline: "none",
        }}
      />
    </div>
    <br />
    <div
      className="d-flex justify-content-center allign items-center"
      style={{ marginTop: "20px" }}
    >
      <div
        className="small_screens"
        style={{ marginRight: "70px", color: "#4A6656", fontWeight: 600 }}
      >
        Task Date :
      </div>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="form-control-lg"
        style={{
          marginRight: "120px",
          backgroundColor: "#FAF3DD",
          border: "2px solid #D4A373",
          outline: "none",
          fontSize: "18px",
          width: "50%",
        }}
      />
    </div>
    <br />
    <div className="d-flex justify-content-center allign items-center">
      <label
        htmlFor="exampleFormControlTextarea1"
        className="form-label"
        style={{
          fontSize: "22px",
          marginRight: "95px",
          color: "#4A6656",
          fontWeight: 600,
        }}
      >
        Notes :
      </label>
      <textarea
        className="form-control-lg w-50"
        id="exampleFormControlTextarea1"
        placeholder="Enter the Notes Here"
        rows="5"
        value={Text3}
        onChange={handleonchange3}
        style={{
          color: "#5C4033",
          backgroundColor: "#FAF3DD",
          border: "2px solid #D4A373",
          outline: "none",
          marginLeft: "5px",
        }}
      ></textarea>
    </div>
    <br />
    <div className="d-flex justify-content-center align-items-center">
      <label
        className="form-label"
        style={{
          fontSize: "22px",
          marginRight: "95px",
          color: "#4A6656",
          fontWeight: 600,
        }}
      >
        Priority:
      </label>
      <select
        className="form-control-lg"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{
          width: "50%",
          backgroundColor: "#FAF3DD",
          border: "2px solid #D4A373",
          outline: "none",
          color: "#5C4033",
          marginLeft: "5px",
        }}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
    <br />

    <div className="d-grid gap-2 col-6 mx-auto">
  <button
    disabled={Text1.length === 0}
    className="btn btn-success"
    type="button"
    onClick={taskadder}
    style={{ color: "#ffffff", backgroundColor: "#77BFA3" }}
  >
    <span style={{ marginRight: "8px", fontSize: "20px" }}>+</span>
    Add Task
  </button>
  <button
    disabled={Text1.length === 0}
    className="btn btn-success"
    type="button"
    onClick={() => {
      taskadderwith();
      handleSetReminder();
    }}
    style={{ color: "#77BFA3", backgroundColor: "#ffffff" }}
  >
    <span style={{ marginRight: "8px", fontSize: "20px" }}>+</span>
    Add Task with Reminder{" "}
    <img src="icon1.jpg" alt="icon" class="btn-icon"></img>
  </button>
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

      {isOpen && (
        <div className="tips-content mt-3">
          {tips.map((tip, index) => (
            <div 
              key={index} 
              className="tip-item d-flex align-items-center gap-2 mb-2"
            >
              <span style={{ color: "#4A6656" }}>
                • {tip}
              </span>
            </div>
          ))}
        </div>
      )}
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
    
    
    <div className="container" style={{
  border: "5px solid rgb(206, 169, 132)",
  padding: "20px 20px",
  borderRadius: "25px",
  backgroundColor: "#A8D5BA",
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
      <div className="row">
      <div className="col-md-6 col-sm-6 col-12 text-center">
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
              border: "2px solid #D4A373"
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

        <div className="col-md-6 col-sm-6 col-12 text-center">
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
              border: "2px solid #D4A373"
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
        <div className="completed-tasks">
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
                border: "2px solid #D4A373"
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
      <div id=" progress-section" className=" progress-section mb-4" style={{ backgroundColor: "#FAF3DD", padding: "20px", borderRadius: "8px", border: "2px solid #D4A373" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
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
          <div className="progress-bars">
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
      <div className="weekly-summary mb-4" style={{ backgroundColor: "#FAF3DD", padding: "20px", borderRadius: "8px", border: "2px solid #D4A373" }}>
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

  </>
);
}
export default Tasks;

