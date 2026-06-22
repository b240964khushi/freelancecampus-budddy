export default function Navbar({ currentPage, setCurrentPage, onLogout }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">CampusShare</h1>
          <div className="flex gap-4 flex-wrap items-center">
            <button
              onClick={() => setCurrentPage('supply')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === 'supply'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              📦 List Items
            </button>
            <button
              onClick={() => setCurrentPage('available')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === 'available'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              🛍️ Available Items
            </button>
            <button
              onClick={() => setCurrentPage('demand')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === 'demand'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              🆘 Post Demand
            </button>
            <button
              onClick={() => setCurrentPage('view-demands')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === 'view-demands'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              📋 View Demands
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
