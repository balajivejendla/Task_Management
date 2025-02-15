import React from 'react'

function Features(){
    return(
        <>
        <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      User-Friendly Task Dashboard
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
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Task Completion & Deletion
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong> Mark tasks as completed with a simple checkbox or button.
A "Delete" button to remove tasks from the list.
Option to undo deletion or move tasks to an "Archive" before permanent removal.</strong> 
      </div>
    </div>
  </div>
  <br/><br/>
  <div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Any Suggestions:</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" style={{borderBlock:"5px solid black"}}rows="3"></textarea>
  <br/>
  <button type="button" classNameName="btn btn-primary">submit</button>
</div>
  
</div>
        </>

    );

}
export default Features;