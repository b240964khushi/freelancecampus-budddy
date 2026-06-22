# CampusShare - Campus Marketplace

A full-stack web application for buying and selling stationery items within campus communities.

## Features

### 📦 Supply Module (for Seniors)
- List stationery items you no longer need
- Include item details: title, category, condition, description
- Share WhatsApp contact for direct communication
- Connect with interested buyers instantly

### 🆘 Demand Module (for Juniors)
- Post items you urgently need
- Describe your requirements and urgency
- Let seniors know via WhatsApp if they can help
- Build community support

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express (Serverless Functions)
- **Database**: MongoDB
- **Hosting**: Vercel (Free tier)

## Project Structure

```
campusshare/
├── api/
│   ├── index.js              # Express app (Vercel serverless entry point)
│   ├── db.js                 # MongoDB connection with caching
│   ├── models/
│   │   ├── Stationery.js     # Stationery schema
│   │   └── Demand.js         # Demand schema
│   └── routes/
│       ├── stationery.js     # Stationery API endpoints
│       └── demands.js        # Demand API endpoints
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Tailwind CSS
│   ├── index.html            # HTML template
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   └── tailwind.config.js    # Tailwind CSS configuration
├── vercel.json               # Vercel deployment configuration
├── package.json              # Root dependencies
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (free tier available)
- Vercel account (free)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd campusshare
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB URI:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campusshare?retryWrites=true&w=majority
   VITE_API_URL=http://localhost:5173/api
   ```

4. **Run the development server**
   ```bash
   # Terminal 1: Run frontend
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
   - Click "Deploy"

3. **Update Frontend API URL**
   Once deployed, update your `VITE_API_URL` in frontend if needed to point to your Vercel domain.

## API Endpoints

### Stationery Items
- `POST /api/stationery` - Create a new stationery item
  ```json
  {
    "title": "Physics Textbook",
    "category": "Books",
    "condition": "Good",
    "description": "Slightly used, no damage",
    "whatsappNumber": "+91XXXXXXXXXX"
  }
  ```
- `GET /api/stationery` - Get all items (newest first)

### Demands
- `POST /api/demands` - Create a new demand
  ```json
  {
    "itemName": "Chemistry Lab Coat Size M",
    "category": "Lab Coat",
    "description": "Need for upcoming lab session",
    "whatsappNumber": "+91XXXXXXXXXX"
  }
  ```
- `GET /api/demands` - Get all demands (newest first)

## Database Schema

### Stationery Collection
```javascript
{
  _id: ObjectId,
  title: String,
  category: String, // Books, Lab Coat, Drafter, Notes, Others
  condition: String, // New, Good, Used
  description: String,
  whatsappNumber: String,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Demand Collection
```javascript
{
  _id: ObjectId,
  itemName: String,
  category: String, // Books, Lab Coat, Drafter, Notes, Others
  description: String,
  whatsappNumber: String,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Features & Components

### Frontend Components
- **Navbar**: Navigation between all pages
- **SupplyForm**: Form to list stationery items
- **AvailableItems**: Display all items with WhatsApp contact button
- **DemandForm**: Form to post item demands
- **ViewDemands**: Feed of all active demands with fulfillment buttons

## Contributing

Feel free to fork and contribute improvements!

## License

MIT License
