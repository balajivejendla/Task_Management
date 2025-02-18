import React, { useState ,useEffect} from 'react'
function Tasks(){

      const[Text1,setText1]=useState('');
      const[Text2,setText2]=useState('');
      const[Text3,setText3]=useState('');
      const[Tasks,setTasks]=useState([]);
      const[Taskwith,setTaskwith]=useState([]);
      const taskadder=()=>{
        if(Text1.trim()===""||Text2.trim()===""){
            alert("Please Enter Both Task and Time if Notes");
            return;
        }
        
            setTasks([...Tasks,{subject:Text1,time:Text2,notes:Text3}]);
            setText1("");
            setText2("");
            setText3("");
            console.log(Tasks)

      }
      const taskadderwith=()=>{
        if(Text1.trim()===""||Text2.trim()===""){
            alert("Please Enter Both Task and Time if Notes");
            return;
        }
        
            setTaskwith([...Taskwith,{subject:Text1,time:Text2,notes:Text3}]);
            setText1("");
            setText2("");
            setText3("");
            console.log(Taskwith)

      }
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
        setTasks(Tasks.filter((_, i) => i !== index));
        
       }
       const RemoveReminder=(index)=>{
        setReminders((prevReminder)=>prevReminder.filter((reminder)=>reminder.index!==index))
        alert("reminder has been removed")
        setTaskwith(Taskwith.filter((_, i) => i !==index));

       }



         const [reminders, setReminders] = useState([]); // Store multiple reminders
       
         // Add new reminder to the list
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
       
           // Clear input fields after adding a reminder
           setText1("");
           setText2("");
         };
       
         useEffect(() => {
           if (reminders.length === 0) return;
       
           const interval = setInterval(() => {
             const currentTime = new Date().toLocaleTimeString([], {
               hour: "2-digit",
               minute: "2-digit",
               hour12: true,
             });
       
             // Find reminders that match the current time
             const triggeredReminders = reminders.filter((reminder) => reminder.time === currentTime);
       
             if (triggeredReminders.length > 0) {
               triggeredReminders.forEach((reminder) => {
                 alert(`Reminder: ${reminder.text}`);
               });
       
               // Remove the triggered reminders from the list
               setReminders((prevReminders) =>
                 prevReminders.filter((reminder) => !triggeredReminders.includes(reminder))
               );
             }
           }, 1000);
       
           return () => clearInterval(interval);
         }, [reminders]);
       
    
return(
    <>
<div className="d-flex justify-content-center allign items-center ">
<p style={{fontSize:"22px",marginRight:"30px"}}>Task Subject :</p>
<input className="form-control-lg w-50" type="text" placeholder="Enter the Task Name Here" value={Text1} onChange={handleonchange1}></input>
</div>
<br/>
<div className="d-flex justify-content-center allign items-center">
<p  style={{fontSize:"22px",marginLeft:"110px"}}>Task Deadline:</p>
<input readOnly className="form-control-lg w-50" type="text" placeholder="Click on Clock Button to Enter Time" value={Text2} onChange={handleonchange2} style={{marginLeft:"30px"}}></input>
<input
          type="time"
          value={Text2}
          onChange={(e) => {
          setText2(
            e.target.value
          );
        }}
        style={{fontSize:"22px",marginLeft:"20px"}}

        />

</div>
<br/>
<div className="d-flex justify-content-center allign items-center">
  <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{fontSize:"22px",marginRight:"90px"}}>Notes :</label>
  <textarea className="form-control-lg w-50" id="exampleFormControlTextarea1" placeholder="Enter the Notes Here" rows="5" value={Text3}onChange={handleonchange3}></textarea>
</div>
<br/>

<div className="d-grid gap-2 col-6 mx-auto">
  <button disabled={Text1.length===0}className="btn btn-primary" type="button" onClick={taskadder}>Add Task</button>
  <button disabled={Text1.length===0}className="btn btn-primary" type="button" onClick={()=>{taskadderwith();handleSetReminder();}}>Add Task with Reminder</button>
  </div>
  <br/>
  <div className="container">
  <div className="row">
    {/* First Column: Tasks without Reminders */}
    <div className="col-md-6">
      <h3 style={{marginLeft:"10px"}}>Tasks Added So Far without Reminders: </h3>
      {Tasks.length === 0 ? (
        <p style={{ fontSize: "24px", fontWeight: "500", marginLeft: "10px" }}>
          No Tasks Added without Reminder
        </p>
      ) : (
        Tasks.map((task, index) => (
          <div
            key={index}
            className="task-item"
            style={{
              fontSize: "24px",
              fontWeight: "500"
            }}
          >
            <p>
              <strong style={{ marginRight: "10px", marginLeft: "10px" }}>
                Subject:
              </strong>
              {task.subject},
              <strong style={{ marginRight: "10px", marginLeft: "10px" }}>
                Time:
              </strong>
              {task.time},
              <strong style={{ marginRight: "10px", marginLeft: "10px" }}>
                Notes:
              </strong>
              {task.notes}
              <button
                onClick={() => RemoveTask(index)}
                className="btn btn-success"
                style={{ marginRight: "10px", marginLeft: "10px" }}
              >
                Complete ✅
              </button>
            </p>
          </div>
        ))
      )}
    </div>

    {/* Second Column: Tasks with Reminders */}
    <div className="col-md-6">
      <h3 style={{marginLeft:"20px"}}>Tasks Added So Far with Reminders: </h3>
      {Taskwith.length === 0 ? (
        <p style={{ fontSize: "24px", fontWeight: "500", marginLeft: "20px" }}>
          No Tasks Added with Reminder
        </p>
      ) : (
        Taskwith.map((task1, index) => (
          <div
            key={index}
            className="task-item"
            style={{
              fontSize: "24px",
              fontWeight: "500",
              marginLeft: "10px",
            }}
          >
            <p>
              <strong style={{ marginRight: "10px", marginLeft: "10px" }}>
                Subject:
              </strong>
              {task1.subject},
              <strong style={{ marginRight: "10px", marginLeft: "10px" }}>
                Time:
              </strong>
              {task1.time},
              <strong style={{ marginRight: "10px", marginLeft: "10px" }}>
                Notes:
              </strong>
              {task1.notes}
              <button
                onClick={() => RemoveReminder(index)}
                className="btn btn-success"
                style={{ marginRight: "10px", marginLeft: "10px" }}
              >
                Complete ✅
              </button>
            </p>
          </div>
        ))
      )}
    </div>
  </div>
</div>


  </>
  
);
}
export default Tasks;

