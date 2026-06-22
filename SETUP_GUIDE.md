# CampusShare - Complete Setup & Deployment Guide

## 🎯 What's New in This Update

### ✨ Features Added
1. **User Authentication System**
   - Email/Password Registration & Login
   - Google OAuth Integration
   - JWT Token-based authentication
   - Secure password hashing with bcryptjs

2. **Smooth Animations**
   - Landing page entrance animations
   - Floating emoji animations
   - Staggered card animations
   - Smooth transitions on all pages
   - Google Login button animations

3. **College-Related Branding**
   - College name in user profile
   - Year/Class selection
   - Campus-themed colors and emojis
   - College-related welcome messages

## 📊 Data Storage & Architecture

### Where is User Data Stored?

**All registered student data is stored in MongoDB:**

```
MongoDB Atlas (Cloud)
    ↓
Database: campusshare
    ↓
Collections:
    ├── users          (Student registration data)
    ├── stationerys    (Items for sale)
    └── demands        (Item requests)
```

### User Data Structure
```javascript
User Document {
  _id: ObjectId,
  name: String,              // Student name
  email: String,             // Email (unique)
  password: String,          // Hashed with bcryptjs
  college: String,           // College/University name
  year: String,              // 1st, 2nd, 3rd, 4th, Other
  googleId: String,          // (Optional) For Google OAuth
  profileImage: String,      // (Optional) From Google
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Important:** MongoDB Atlas is completely FREE (500MB storage, perfect for campus use)

## 🚀 Step-by-Step Vercel Deployment

### Step 1: Get Google OAuth Credentials (5 minutes)

1. Go to: https://console.cloud.google.com
2. Create a new project: "CampusShare"
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:5173` (for local testing)
     - `https://yourdomain.vercel.app` (after deployment)
5. Copy your **Client ID** (you'll need this)

### Step 2: Set Up MongoDB Atlas (5 minutes)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a free cluster (M0)
4. Create database: `campusshare`
5. Create database user:
   - Username: `campusshare_admin`
   - Password: Generate secure password
6. Whitelist IP: Allow from anywhere (0.0.0.0/0)
7. Get connection string:
   ```
   mongodb+srv://campusshare_admin:PASSWORD@cluster.mongodb.net/campusshare?retryWrites=true&w=majority
   ```

### Step 3: Deploy to Vercel (2 minutes)

1. Go to: https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Import from GitHub: `b240964khushi/freelancecampus-budddy`
4. Set Environment Variables:
   ```
   MONGODB_URI = mongodb+srv://campusshare_admin:YOUR_PASSWORD@cluster.mongodb.net/campusshare?retryWrites=true&w=majority
   GOOGLE_CLIENT_ID = your-google-client-id.apps.googleusercontent.com
   JWT_SECRET = your-super-secret-jwt-key-12345 (any random string)
   VITE_GOOGLE_CLIENT_ID = your-google-client-id.apps.googleusercontent.com
   VITE_API_URL = https://yourdomain.vercel.app/api
   ```
5. Click **"Deploy"** ✅
6. Wait 2-3 minutes for deployment
7. Your app will be live at: `https://yourdomain.vercel.app`

## ✅ If You Already Deployed to Vercel

**YES! Environment variables will be set properly now:**

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add these 5 variables:
   - `MONGODB_URI` (your MongoDB connection string)
   - `GOOGLE_CLIENT_ID` (from Google Cloud Console)
   - `JWT_SECRET` (random secret key)
   - `VITE_GOOGLE_CLIENT_ID` (same as GOOGLE_CLIENT_ID)
   - `VITE_API_URL` (your Vercel domain + /api)
4. Click **"Save"**
5. Redeploy by going to **"Deployments"** and clicking **"Redeploy"**

## 🔐 Authentication Flow

### User Registration
```
User enters name, email, password, college, year
    ↓
Frontend validates form
    ↓
POST /api/auth/register
    ↓
Backend checks if email exists
    ↓
Password hashed with bcryptjs
    ↓
User saved to MongoDB
    ↓
JWT token generated
    ↓
Token & user data stored in localStorage
    ↓
User logged in ✅
```

### Google OAuth Flow
```
User clicks "Sign up with Google"
    ↓
Google authentication popup
    ↓
User grants permission
    ↓
Google token sent to backend
    ↓
Backend verifies token with Google
    ↓
Backend checks if email exists in MongoDB
    ↓
If new: Create user profile
If existing: Just login
    ↓
JWT token generated
    ↓
User logged in ✅
```

## 📱 API Endpoints

### Authentication
```
POST /api/auth/register
  Body: { name, email, password, college, year }
  Returns: { user, token }

POST /api/auth/login
  Body: { email, password }
  Returns: { user, token }

POST /api/auth/google
  Body: { token, college, year }
  Returns: { user, token }

POST /api/auth/google-login
  Body: { token }
  Returns: { user, token }
```

### Items & Demands
```
POST /api/stationery
GET /api/stationery

POST /api/demands
GET /api/demands
```

## 🎨 Animation Features

### Landing Page
- ✨ Animated background circles
- 🎯 Staggered card animations
- 📦 Floating emoji animations
- 🎪 Smooth entrance transitions

### Login/Register Pages
- 🎬 Scale and fade-in animations
- 🔴 Error message animations
- 🎯 Button hover animations
- ⌨️ Form field focus states

### Dashboard
- 🎨 Gradient menu cards
- 📊 Interactive card animations on hover
- 🎪 Staggered info card animations
- 🔄 Smooth page transitions

## 🐛 Troubleshooting

### "MongoDB connection failed"
**Solution:**
- Check MONGODB_URI in Vercel environment variables
- Ensure IP is whitelisted in MongoDB Atlas (0.0.0.0/0)
- Test connection string locally

### "Google login not working"
**Solution:**
- Verify GOOGLE_CLIENT_ID is correct
- Add your Vercel domain to authorized redirect URIs
- Check browser console for errors

### "Animations not showing"
**Solution:**
- Make sure `framer-motion` is installed: `npm install framer-motion`
- Clear browser cache
- Check if animations are disabled in browser

### "Data not saving after login"
**Solution:**
- Check MONGODB_URI connection
- Verify JWT_SECRET is set
- Check browser localStorage is not disabled

## 📊 Free Tier Limits (Don't Worry!)

| Service | Free Tier | Enough For? |
|---------|-----------|-------------|
| MongoDB Atlas | 512 MB storage | 10,000+ users |
| Vercel | 100 GB bandwidth/month | 1 million requests |
| Google OAuth | Unlimited | ∞ users |

**Conclusion:** Everything is completely FREE for campus use!

## 🎓 College Features

✅ User registers with college name
✅ User selects their year (1st, 2nd, 3rd, 4th)
✅ Dashboard shows "Welcome [Name]! 👋"
✅ Dashboard displays "[College] • Year [Year]"
✅ All items linked to student profiles
✅ WhatsApp integration for direct contact

## 📝 Local Testing (Optional)

```bash
# Install dependencies
npm install
cd frontend && npm install && cd ..

# Create .env file
cp .env.example .env

# Edit .env with:
# MONGODB_URI=<your-mongodb-uri>
# GOOGLE_CLIENT_ID=<your-google-client-id>
# JWT_SECRET=<any-random-string>
# VITE_GOOGLE_CLIENT_ID=<your-google-client-id>

# Start frontend (Terminal 1)
cd frontend && npm run dev

# The app will be at http://localhost:5173
```

## 🎉 You're All Set!

Your CampusShare app is:
- ✅ Ready to deploy
- ✅ Fully authenticated
- ✅ Animated and smooth
- ✅ College-branded
- ✅ Free to host on Vercel
- ✅ Free to store data on MongoDB

**Next Step:** Set environment variables on Vercel and redeploy! 🚀
