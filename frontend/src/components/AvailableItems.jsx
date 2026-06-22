import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = '/api'

export default function AvailableItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/stationery`)
      setItems(response.data)
      setError('')
    } catch (err) {
      setError('Failed to load items. Please try again later.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const openWhatsApp = (item) => {
    const message = `Hi! I am interested in your listed item: ${item.title}`
    const whatsappURL = `https://wa.me/${item.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-xl text-gray-600">Loading items...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Available Items</h2>
        <p className="text-gray-600">Browse and connect with sellers via WhatsApp</p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-50 text-red-800">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600 text-lg">No items available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 flex-1">{item.title}</h3>
                  <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {item.condition}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  <strong>Category:</strong> {item.category}
                </p>

                <p className="text-gray-700 mb-4 line-clamp-3">{item.description}</p>

                <div className="mb-4 pb-4 border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2">
                    Posted {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => openWhatsApp(item)}
                  className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
                >
                  💬 Contact on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
