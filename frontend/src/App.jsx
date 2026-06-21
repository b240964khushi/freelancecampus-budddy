import { useState } from 'react'
import Navbar from './components/Navbar'
import SupplyForm from './components/SupplyForm'
import AvailableItems from './components/AvailableItems'
import DemandForm from './components/DemandForm'
import ViewDemands from './components/ViewDemands'

export default function App() {
  const [currentPage, setCurrentPage] = useState('supply')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'supply' && <SupplyForm setCurrentPage={setCurrentPage} />}
        {currentPage === 'available' && <AvailableItems />}
        {currentPage === 'demand' && <DemandForm setCurrentPage={setCurrentPage} />}
        {currentPage === 'view-demands' && <ViewDemands />}
      </main>
    </div>
  )
}
