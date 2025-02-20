import React, { useState ,useEffect} from 'react'

function Tasks(){

      const[Text1,setText1]=useState('');
      const[Text2,setText2]=useState('');
      const[Text3,setText3]=useState('');
      const[Tasks,setTasks]=useState([]);
      const[Taskwith,setTaskwith]=useState([]);
      const[Taskcomplete,setTaskcomplete]=useState([]);
      const taskadder = () => {
        if (Text1.trim() === "" || Text2.trim() === "") {
            alert("Please Enter Both Task and Time if Notes");
            return;
        }
            const newTask = { subject: Text1, time: Text2, notes: Text3 };
    
  
        const updatedTasks = [...Tasks, newTask].sort((a, b) => {
            return new Date(a.time) - new Date(b.time); 
        });
    
        setTasks(updatedTasks);
        setText1("");
        setText2("");
        setText3("");
        console.log(updatedTasks);
    };
    const taskadderwith = () => {
      if (Text1.trim() === "" || Text2.trim() === "") {
          alert("Please Enter Both Task and Time if Notes");
          return;
      }
  
      const newTask1 = { subject: Text1, time: Text2, notes: Text3 };
  
      // Add the task and sort in ascending order based on time
      const updatedTask = [...Taskwith, newTask1].sort((a, b) => {
          return new Date(a.time) - new Date(b.time); // Sorting in ascending order
      });
  
      setTaskwith(updatedTask);
      setText1("");
      setText2("");
      setText3("");
      console.log(updatedTask);
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
       
    
return(
    <>
    <br/>
    <br/>
<div className="d-flex justify-content-center allign items-center ">
<p style={{color:"#4A6656",fontSize:"22px",marginRight:"35px",fontWeight:600}}>Task Subject :</p>
<input className="form-control-lg w-50" type="text" placeholder="Enter the Task Name Here" value={Text1} onChange={handleonchange1} style={{color:"#5C4033",backgroundColor:"#FAF3DD",border:"2px solid #D4A373",outline: "none"}}></input>
</div>
<br/>
<div className="d-flex justify-content-center allign items-center">
<div className="small_screens" style={{color:"#4A6656",fontWeight:600}} >Task Deadline :</div>
<input readOnly className="form-control-lg w-50" type="text" placeholder="Click on Clock Button to Enter Time" value={Text2} onChange={handleonchange2} style={{marginLeft:"30px",backgroundColor:"#FAF3DD",border:"2px solid #D4A373",outline: "none"}}></input>
<input
          type="time"
          value={Text2}
          onChange={(e) => {
          setText2(
            e.target.value
          );
        }}
        style={{fontSize:"22px",marginLeft:"20px",backgroundColor:"#FAF3DD",border:"2px solid #D4A373",outline: "none"}}

        />

</div>
<br/>
<div className="d-flex justify-content-center allign items-center">
  <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{fontSize:"22px",marginRight:"95px",color:"#4A6656",fontWeight:600}}>Notes :</label>
  <textarea className="form-control-lg w-50" id="exampleFormControlTextarea1" placeholder="Enter the Notes Here" rows="5" value={Text3}onChange={handleonchange3} style={{color:"#5C4033",backgroundColor:"#FAF3DD",border:"2px solid #D4A373",outline: "none",marginLeft:"5px"}}></textarea>
</div>
<br/>

<div className="d-grid gap-2 col-6 mx-auto">
  <button disabled={Text1.length===0}className="btn btn-success" type="button" onClick={taskadder} style={{color:"#ffffff",backgroundColor:"#77BFA3" }}>Add Task </button>
  <button disabled={Text1.length===0}className="btn btn-success" type="button" onClick={()=>{taskadderwith();handleSetReminder();}} style={{color:"#77BFA3",backgroundColor:"#ffffff"}}>Add Task with Reminder <img src="icon1.jpg" alt="icon" class="btn-icon"></img></button>
  </div>
  <br/>
  <br/>
  <div className="container" style={{border: "5px solid rgb(206, 169, 132)",padding:"20px 20px",borderRadius: "25px",backgroundColor:"#A8D5BA"}}>
  <br/>
  <div className="row">

    <div className="col-md-6 col-sm-6 col-12 text-center">
      <h3 style={{color:"#5C4033",marginLeft:"10px"}}>Tasks Added So Far without Reminders: </h3>
      <br/>
      {Tasks.length === 0 ? (
        <p style={{ fontSize: "24px", fontWeight: "500", marginLeft: "10px",color:"#4A6656" }}>
          No Tasks Added without Reminder
        </p>
      ) : (
        Tasks.map((task, index) => (
          <div
            key={index}
            className="task-item"

          >
            <p>
              <strong style={{color:"#4A6656", marginRight: "10px", marginLeft: "10px" }}>
                Subject:
              </strong>
              {task.subject},
              <strong style={{color:"#4A6656", marginRight: "10px", marginLeft: "10px" }}>
                Time:
              </strong>
              {task.time},
              <strong style={{color:"#4A6656", marginRight: "10px", marginLeft: "10px" }}>
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


    <div className="col-md-6 col-sm-6 col-12 text-center">
      <h3 style={{marginLeft:"20px",color:"#5C4033"}}>Tasks Added So Far with Reminders: </h3>
      <br/>
      {Taskwith.length === 0 ? (
        <p style={{ fontSize: "24px", fontWeight: "500", marginLeft: "20px",color:"#4A6656" }}>
          No Tasks Added with Reminder
        </p>
      ) : (
        Taskwith.map((task1, index) => (
          <div
            key={index}
            className="task-item "

          >
            <p>
              <strong style={{color:"#4A6656", marginRight: "10px", marginLeft: "10px" }}>
                Subject:
              </strong>
              {task1.subject},
              <strong style={{color:"#4A6656", marginRight: "10px", marginLeft: "10px" }}>
                Time:
              </strong>
              {task1.time},
              <strong style={{color:"#4A6656", marginRight: "10px", marginLeft: "10px" }}>
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
<br/>
<div className="container text-center" style={{border: "5px solid rgb(206, 169, 132)",padding:"20px 20px",borderRadius: "25px",backgroundColor:"#A8D5BA"}}>

      <h3 style={{color:"#5C4033",marginLeft:"10px"}}>Tasks Completed So Far: </h3>
      <br/>
      {Taskcomplete.length === 0 ? (
        <p style={{ fontSize: "24px", fontWeight: "500", marginLeft: "10px",color:"#4A6656" }}>
          No Tasks Completed yet
        </p>
      ) : (
        Taskcomplete.map((task, index) => (
          <div
            key={index}
            className="task-item"

          >
            <p>
              <strong style={{color:"#4A6656", marginRight: "10px", marginLeft: "10px" }}>
                Subject:
              </strong>
              {task.subject},
              <strong style={{color:"#4A6656", marginRight: "10px", marginLeft: "10px" }}>
                Time:
              </strong>
              {task.time},
              <strong style={{color:"#4A6656", marginRight: "10px", marginLeft: "10px" }}>
                Notes:
              </strong>
              {task.notes}
              
            </p>
          </div>
        ))
      )}


</div>
<br/>



  </>
  
);
}
export default Tasks;

