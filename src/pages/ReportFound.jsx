import React from 'react'

export default function ReportFound(){
  return (
    <div>
      <h1>Report Found Item</h1>
      <p className="muted">Provide details for the item you found.</p>
      <div style={{marginTop:12}} className="card">
        <form>
          <label>Title</label>
          <input type="text" placeholder="e.g. Set of keys" />

          <label>Description</label>
          <textarea placeholder="Where was it found?" />

          <label>Location</label>
          <input type="text" />

          <label>Image</label>
          <input type="text" placeholder="Image URL (UI only)" />

          <div style={{marginTop:12}}>
            <button type="button" className="btn">Submit Found Report</button>
          </div>
        </form>
      </div>
    </div>
  )
}
