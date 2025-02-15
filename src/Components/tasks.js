import React, { useState } from 'react'
function Tasks(){
      const[Text1,setText1]=useState('');
      const[Text2,setText2]=useState('');
      const[Text3,setText3]=useState('');
      const[Tasks,setTasks]=useState([]);
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
    
return(
    <>
<div className="d-flex justify-content-center allign items-center ">
<a style={{fontSize:"22px",marginRight:"30px"}}>Task Subject :</a>
<input className="form-control-lg w-50" type="text" placeholder="Enter the Task Name Here" value={Text1} onChange={handleonchange1}></input>
</div>
<br/>
<div className="d-flex justify-content-center allign items-center">
<a style={{fontSize:"22px",marginRight:"55px"}}>Task Time :</a>
<input className="form-control-lg w-50" type="text" placeholder="Enter the Task Time Here" value={Text2} onChange={handleonchange2}></input>
</div>
<br/>
<div className="d-flex justify-content-center allign items-center">
  <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{fontSize:"22px",marginRight:"90px"}}>Notes :</label>
  <textarea className="form-control-lg w-50" id="exampleFormControlTextarea1" placeholder="Enter the Notes Here" rows="5" value={Text3}onChange={handleonchange3}></textarea>
</div>
<br/>

<div className="d-grid gap-2 col-6 mx-auto">
  <button className="btn btn-primary" type="button" onClick={taskadder}>Add Task</button>
  </div>
  <br/>
  <div className="d-flex justify-content-center align-items-center flex-column">
    <h3>Tasks Added So Far: </h3>
  

    {Tasks.length===0 ? <a style={{fontSize:"24px",fontWeight:'700',marginLeft:"10px"}}> No Tasks Added</a> : 
    (
        Tasks.map((task,index)=>(
            <div key={index} className="task-item" style={{fontSize:"24px",fontWeight:'500',marginLeft:"10px"}}><p><strong style={{marginRight:"10px",marginLeft:"10px"}} >Subject:</strong >{task.subject},<strong style={{marginRight:"10px",marginLeft:"10px"}}>Time:</strong>{task.time},<strong style={{marginRight:"10px",marginLeft:"10px"}}>Notes:</strong>{task.notes}            
              <button onClick={()=> RemoveTask(index)} className="btn btn-success" style={{marginRight:"10px",marginLeft:"10px"}} >
            Complete ✅
          </button></p>
  
            
            </div>

        ))

    )
    
  
    }
      

    <br/>
 
  </div>
  </>
  
);
}
export default Tasks;

