import React, {useState} from 'react'
import { sampleItems } from '../components/SampleItems'
import ItemCard from '../components/ItemCard'

export default function Search(){
  const [q,setQ] = useState('')
  const results = sampleItems.filter(i => (i.title + i.desc + i.location).toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <h1>Search</h1>
      <p className="muted">Search by keyword. Image-based search needs backend support.</p>
      <div style={{marginTop:12}} className="card">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search items by keyword" />
      </div>

      <section style={{marginTop:18}}>
        <h2>Results</h2>
        <div className="grid">
          {results.map(i => <ItemCard key={i.id} item={i} />)}
        </div>
      </section>
    </div>
  )
}
