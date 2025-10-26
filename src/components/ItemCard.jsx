import React from 'react'
import { Link } from 'react-router-dom'

export default function ItemCard({item}){
  return (
    <div className="card">
      <img src={item.image} alt={item.title} className="item-image" />
      <h3>{item.title}</h3>
      <p className="muted">{item.location}</p>
      <p>{item.desc}</p>
      <div style={{marginTop:12}}>
        <Link className="btn" to={`/item/${item.id}`}>View</Link>
      </div>
    </div>
  )
}
