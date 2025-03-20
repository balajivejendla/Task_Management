import React from 'react'

function Features(){
    return(
        <>
        <br/>
        <br/>
        <br/>
        <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{backgroundColor:"#99bf9c"}}>
      <strong>User-Friendly Task Dashboard</strong>
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>A clean and intuitive UI for adding, editing, and viewing tasks.
Task list with filters (by priority, due date, or status).
Drag-and-drop functionality for reordering tasks easily.</strong> 
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"style={{backgroundColor:"#99bf9c"}}>
      <strong>Task Completion & Deletion</strong>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong> Mark tasks as completed with a simple checkbox or button.
A "Complete" button to remove tasks from the list.
Option to undo deletion or move tasks to an "Archive" before permanent removal.</strong> 
      </div>
    </div>
    
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo"style={{backgroundColor:"#99bf9c"}}>
      <strong>Task Reminder</strong>
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>You can get alert when Task deadline comes which is good and we can view the task which has Reminders and will removed when clicked submit which is actually a good feature</strong> 
      </div>
    </div>
    
  </div>
  
  <br/><br/>
  <div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Any Suggestions:</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" style={{borderBlock:"5px solid black"}}rows="3"></textarea>
  <br/>
  <button type="button" className="btn btn-success">submit</button>
</div>
  
</div>
        </>

    );

}
export default Features;