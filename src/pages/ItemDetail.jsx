import React from 'react'
import { useParams } from 'react-router-dom'
import { sampleItems } from '../components/SampleItems'

export default function ItemDetail(){
  const { id } = useParams()
  const item = sampleItems.find(s => s.id === id) || {}

  return (
    <div>
      <h1>{item.title || 'Item not found'}</h1>
      {item.image && <img src={item.image} alt="item" className="item-image" />}
      <p className="muted">Location: {item.location}</p>
      <p>{item.desc}</p>

      <div style={{marginTop:12}}>
        <button className="btn">Message Owner</button>
      </div>
    </div>
  )
}
