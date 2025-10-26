import React from 'react'

export default function ReportLost(){
  return (
    <div>
      <h1>Report Lost Item</h1>
      <p className="muted">Fill details below — this form is UI-only and needs backend wiring.</p>
      <div style={{marginTop:12}} className="card">
        <form>
          <label>Title</label>
          <input type="text" placeholder="e.g. Black backpack" />

          <label>Description</label>
          <textarea placeholder="Describe where/when the item was lost"></textarea>

          <div className="row">
            <div style={{flex:1}}>
              <label>Location</label>
              <input type="text" />
            </div>
            <div style={{width:180}}>
              <label>When</label>
              <input type="text" />
            </div>
          </div>

          <label>Image</label>
          <input type="text" placeholder="Image URL (UI only)" />

          <div style={{marginTop:12}}>
            <button type="button" className="btn">Submit Report</button>
          </div>
        </form>
      </div>
    </div>
  )
}
