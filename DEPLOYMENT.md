# Deployment Guide

## Prerequisites

- GitHub account
- OpenWeather API key (get from https://openweathermap.org/api)
- Render account (free tier available at https://render.com)

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy Backend on Render

1. Go to https://render.com and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `crop-weather-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables:
   - Key: `OPENWEATHER_API_KEY`
   - Value: Your API key
6. Select **Free** plan
7. Click **"Create Web Service"**
8. Wait for deployment (5-10 minutes)
9. **Copy the backend URL** (e.g., `https://crop-weather-backend.onrender.com`)

### 3. Update Frontend API URL

Update `frontend/src/api.jsx`:

```javascript
const API_BASE_URL = "https://YOUR-BACKEND-URL.onrender.com";
```

### 4. Deploy Frontend on Render

1. Click **"New +"** → **"Static Site"**
2. Connect same GitHub repository
3. Configure:
   - **Name**: `crop-weather-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Click **"Create Static Site"**
5. Wait for deployment
6. **Copy the frontend URL** (e.g., `https://crop-weather-frontend.onrender.com`)

### 5. Update CORS Settings

Update backend CORS to allow your frontend domain in `backend/main.py`:

```python
allow_origins=["https://your-frontend-url.onrender.com"],
```

### 6. Redeploy Backend

Go to your backend service on Render and click **"Manual Deploy"** → **"Deploy latest commit"**

---

## Alternative: Deploy on Railway

### Backend

1. Go to https://railway.app
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select repository
4. Add service → Select `backend` folder
5. Add environment variable: `OPENWEATHER_API_KEY`
6. Railway auto-detects Python and deploys

### Frontend

1. Add new service → Select `frontend` folder
2. Railway auto-detects Node.js and deploys
3. Update API URL in `api.jsx` with backend URL

---

## Alternative: Deploy on Vercel (Frontend) + Render (Backend)

### Backend on Render

Follow steps 2 above

### Frontend on Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend folder: `cd frontend`
3. Update API URL in `src/api.jsx`
4. Deploy: `vercel --prod`
5. Follow prompts

---

## Important Notes

### Model Files

- The `.h5` model files are large (~10-50MB each)
- Ensure they're committed to Git (not in .gitignore)
- For production, consider storing in cloud storage (AWS S3, Google Cloud Storage)

### Free Tier Limitations

- **Render Free**: Services sleep after 15 min inactivity (cold start ~30s)
- **Railway Free**: 500 hours/month, $5 credit
- **Vercel Free**: Unlimited deployments

### Environment Variables

Never commit `.env` file! Use `.env.example` for reference.

### Monitoring

- Check Render/Railway logs for errors
- Test all endpoints after deployment
- Monitor API usage (OpenWeather has rate limits)

---

## Troubleshooting

### Backend won't start

- Check logs in Render dashboard
- Verify all dependencies in `requirements.txt`
- Ensure models folder is uploaded

### Frontend can't reach backend

- Check CORS settings
- Verify API URL is correct
- Check backend is running (not sleeping)

### Model loading errors

- Ensure model files are in correct location
- Check TensorFlow version compatibility
- Verify file paths are relative

---

## Post-Deployment Testing

Test these endpoints:

- Backend health: `https://your-backend.onrender.com/`
- Crop recommendation: POST to `/recommend-crop`
- Weather prediction: POST to `/predict-weather`
- Current weather: GET to `/weather/{city}`
