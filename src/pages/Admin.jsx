import React from 'react'
import { sampleItems } from '../components/SampleItems'
import ItemCard from '../components/ItemCard'

export default function Admin(){
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p className="muted">Moderate reports, mark items returned, and review potential duplicates.</p>

      <section style={{marginTop:12}} className="card">
        <h3>Recent Reports</h3>
        <div className="grid">
          {sampleItems.map(i => (
            <div key={i.id}>
              <ItemCard item={i} />
              <div style={{marginTop:8}}>
                <button className="btn">Mark Returned</button>
                <button style={{marginLeft:8}} className="btn">Flag Duplicate</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
