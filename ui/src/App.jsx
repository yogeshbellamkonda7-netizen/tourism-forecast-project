import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  )
}
