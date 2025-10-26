import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ReportLost from './pages/ReportLost'
import ReportFound from './pages/ReportFound'
import Search from './pages/Search'
import ItemDetail from './pages/ItemDetail'
import Messages from './pages/Messages'
import Admin from './pages/Admin'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  return (
    <nav className="nav">
      <div className="brand">Digital Lost & Found</div>
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/report-lost" onClick={() => setIsMenuOpen(false)}>Report Lost</Link>
        <Link to="/report-found" onClick={() => setIsMenuOpen(false)}>Report Found</Link>
        <Link to="/search" onClick={() => setIsMenuOpen(false)}>Search</Link>
        <Link to="/messages" onClick={() => setIsMenuOpen(false)}>Messages</Link>
        <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div className="app">
      <Nav />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report-lost" element={<ReportLost />} />
          <Route path="/report-found" element={<ReportFound />} />
          <Route path="/search" element={<Search />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} Digital Lost & Found</footer>
    </div>
  )
}
