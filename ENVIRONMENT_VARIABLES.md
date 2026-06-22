# 🔐 Environment Variables Setup Guide

## For Your Vercel Deployment

If you've already deployed to Vercel, follow these steps to add environment variables:

### Step 1: Get Your Credentials

#### 1. MongoDB URI
```
https://www.mongodb.com/cloud/atlas
 → Create cluster → Get connection string

Format: mongodb+srv://username:password@cluster.mongodb.net/campusshare?retryWrites=true&w=majority
```

#### 2. Google Client ID
```
https://console.cloud.google.com
 → Create project "CampusShare"
 → Enable Google+ API
 → Create OAuth 2.0 credentials
 → Copy Client ID

Example: 123456789-abcdefgh.apps.googleusercontent.com
```

#### 3. JWT Secret
```
Generate any random string (at least 20 characters)
Example: "my-super-secret-key-12345-abcde"
```

### Step 2: Add to Vercel

1. Go to: https://vercel.com/dashboard
2. Click on your project name
3. Go to **Settings** → **Environment Variables**
4. Add each variable:

| Key | Value | Example |
|-----|-------|----------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/campusshare?retryWrites=true&w=majority` |
| `GOOGLE_CLIENT_ID` | Your Google OAuth Client ID | `123456789-abcdefgh.apps.googleusercontent.com` |
| `JWT_SECRET` | Any secret string | `my-super-secret-key-12345` |
| `VITE_GOOGLE_CLIENT_ID` | Same as GOOGLE_CLIENT_ID | `123456789-abcdefgh.apps.googleusercontent.com` |
| `VITE_API_URL` | Your Vercel domain | `https://campusshare.vercel.app/api` |

5. Click **Save**
6. Go to **Deployments** → Click **Redeploy** on the latest deployment

### Step 3: Verify Deployment

After redeploy:
1. Wait 2-3 minutes
2. Visit your Vercel domain
3. Try registering a new account
4. Try Google login
5. Create a test item

## ✅ How to Get Each Credential

### MongoDB URI (Detailed)
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Login or create account
3. Click "Create" → "New Project"
4. Project name: "CampusShare"
5. Create project
6. Click "Create a Deployment"
7. Select "M0 Free"
8. Select your region (closest to your location)
9. Click "Create Deployment"
10. Create username: "campusshare_admin"
11. Generate password (copy it!)
12. Choose "My Local Environment"
13. Allow access from 0.0.0.0/0 (anywhere)
14. Click "Finish and Close"
15. Go to "Connect"
16. Select "Drivers"
17. Copy the connection string
18. Replace <password> with your actual password
```

### Google Client ID (Detailed)
```
1. Go to https://console.cloud.google.com
2. Create new project
3. Project name: "CampusShare"
4. Search for "Google+ API" in search bar
5. Click "Google+ API"
6. Click "Enable"
7. Go to "Credentials" in left sidebar
8. Click "Create Credentials" → "OAuth client ID"
9. Application type: "Web application"
10. Authorized redirect URIs:
    - http://localhost:5173 (local testing)
    - https://yourdomain.vercel.app (after deployment)
    - https://yourdomain.vercel.app/login
    - https://yourdomain.vercel.app/register
11. Click "Create"
12. Copy your "Client ID"
```

## 🚨 Important Notes

⚠️ **Never share these credentials publicly!**
- Don't commit .env file to GitHub
- Don't share your MongoDB password
- Don't expose your Google Client Secret

✅ **These are environment variables**, meaning:
- They're only visible to Vercel deployment
- They're encrypted and secure
- Your code never directly contains them

## 🔄 If You Need to Change Variables Later

1. Go to Vercel project settings
2. Click "Environment Variables"
3. Edit or delete the variable
4. Redeploy your project
5. Changes take effect in 2-3 minutes

## ✨ Your App Will Automatically:

- ✅ Connect to MongoDB with MONGODB_URI
- ✅ Authenticate with Google using GOOGLE_CLIENT_ID
- ✅ Generate secure JWT tokens with JWT_SECRET
- ✅ Use correct API URL with VITE_API_URL
- ✅ Show Google login button on frontend with VITE_GOOGLE_CLIENT_ID

## 📊 After Setting Variables

Your app flow:
```
User visits your domain
    ↓
Frontend loads with VITE_GOOGLE_CLIENT_ID
    ↓
Google login button appears
    ↓
User registers with email/password
    ↓
Backend creates user in MongoDB using MONGODB_URI
    ↓
Backend generates JWT token with JWT_SECRET
    ↓
User can now list items and post demands
    ↓
All data stored in MongoDB Atlas ✅
```

## 🎉 That's It!

Once environment variables are set, your CampusShare app is fully functional!
