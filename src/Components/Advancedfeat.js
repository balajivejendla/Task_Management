import React from 'react'

export default function Advancedfeat() {
  return (
    <div>
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
      
    </div>
  )
}
