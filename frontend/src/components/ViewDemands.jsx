import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = '/api'

export default function ViewDemands() {
  const [demands, setDemands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDemands()
  }, [])

  const fetchDemands = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/demands`)
      setDemands(response.data)
      setError('')
    } catch (err) {
      setError('Failed to load demands. Please try again later.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const fulfillDemand = (demand) => {
    const message = `Hi! I can help you with your demand: ${demand.itemName}`
    const whatsappURL = `https://wa.me/${demand.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-xl text-gray-600">Loading demands...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">View Demands</h2>
        <p className="text-gray-600">See what your juniors need and help them out!</p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-50 text-red-800">
          {error}
        </div>
      )}

      {demands.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600 text-lg">No active demands at the moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {demands.map((demand) => (
            <div
              key={demand._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800">{demand.itemName}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Category:</strong> {demand.category}
                  </p>
                </div>
                <span className="ml-4 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                  {demand.category}
                </span>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{demand.description}</p>

              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-xs text-gray-500">
                  Posted {new Date(demand.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => fulfillDemand(demand)}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition flex items-center gap-2"
                >
                  💬 Fulfil Demand (WhatsApp)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
