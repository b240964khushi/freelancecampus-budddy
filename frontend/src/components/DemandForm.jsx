import { useState } from 'react'
import axios from 'axios'

const API_URL = '/api'

export default function DemandForm({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Books',
    description: '',
    whatsappNumber: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await axios.post(`${API_URL}/demands`, formData)
      setMessage('✅ Demand posted successfully!')
      setFormData({
        itemName: '',
        category: 'Books',
        description: '',
        whatsappNumber: '',
      })
      setTimeout(() => {
        setCurrentPage('view-demands')
      }, 2000)
    } catch (error) {
      setMessage('❌ Error posting demand. Please try again.')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Post Your Demand</h2>
        <p className="text-gray-600 mb-6">Tell seniors what you urgently need</p>

        {message && (
          <div className="mb-4 p-4 rounded-lg bg-blue-50 text-blue-800">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Item Name *
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="e.g., Chemistry Lab Coat Size M"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Books</option>
              <option>Lab Coat</option>
              <option>Drafter</option>
              <option>Notes</option>
              <option>Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description of Need *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain why you need this item and any specific requirements..."
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your WhatsApp Number *
            </label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="e.g., +91XXXXXXXXXX"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Posting Demand...' : '🆘 Post Demand'}
          </button>
        </form>
      </div>
    </div>
  )
}
