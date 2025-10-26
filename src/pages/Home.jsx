import React from 'react'
import { Link } from 'react-router-dom'
import { sampleItems } from '../components/SampleItems'
import ItemCard from '../components/ItemCard'

export default function Home(){
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Lost Something? <br/>We'll Help You Find It</h1>
          <p>A secure platform for campus lost & found. Report items, search listings, and connect safely.</p>
          <div className="hero-actions">
            <Link to="/report-lost" className="btn">Report Lost Item</Link>
            <Link to="/report-found" className="btn secondary">Report Found Item</Link>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="stat-value">150+</div>
              <div className="stat-label">Items Found</div>
            </div>
            <div className="stat">
              <div className="stat-value">80%</div>
              <div className="stat-label">Return Rate</div>
            </div>
            <div className="stat">
              <div className="stat-value">24hr</div>
              <div className="stat-label">Avg. Response</div>
            </div>
          </div>
        </div>
      </section>

      <section className="recent-items">
        <div className="section-header">
          <h2>Recent Reports</h2>
          <Link to="/search" className="btn secondary">View All Items</Link>
        </div>
        <div className="grid">
          {sampleItems.map(i => <ItemCard key={i.id} item={i} />)}
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Report</h3>
            <p>Submit details about lost or found items, including photos and location.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Connect</h3>
            <p>Get notified when matches are found and chat securely with item holders.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Retrieve</h3>
            <p>Verify ownership and arrange safe item return on campus.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
