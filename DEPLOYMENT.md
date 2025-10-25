# Deployment Readiness - AWS

## ✅ Current Status: READY TO BUILD

### Fixed Issues
- ✅ Backend dependencies installed (express, mongoose, axios, dotenv, cors, nodemon)
- ✅ `server.js` implemented with Express, MongoDB connection, CORS, and error handling
- ✅ Frontend properly imports Tailwind CSS
- ✅ SurfChart configured with `react-chartjs-2` wrapper
- ✅ `.env` file properly ignored by git
- ✅ MongoDB Atlas connection verified

---

## Development Workflow

### Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

Access app at: `http://localhost:5173`

### Test Backend API
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/surf-data/46087
```

---

## AWS Deployment Recommendations

### Option 1: AWS Elastic Beanstalk (Easiest)
**Backend:**
- Create `.ebignore` to exclude `node_modules/`
- Set environment variables in EB console (`MONGO_URI`, `PORT`)
- Deploy with `eb init` and `eb deploy`

**Frontend:**
- Build: `npm run build` → creates `dist/` folder
- Deploy to S3 + CloudFront or include in backend as static files

### Option 2: EC2 Instance
**Setup:**
```bash
# Install Node.js, nginx, pm2
sudo apt update && sudo apt install -y nodejs npm nginx
sudo npm install -g pm2

# Clone repo, install dependencies
cd backend && npm install
cd ../frontend && npm install && npm run build

# Run backend with pm2
pm2 start backend/server.js --name surf-api
pm2 startup && pm2 save

# Configure nginx to serve frontend and proxy API
```

**Nginx config example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Serve frontend
    root /home/ubuntu/my_wave_watcher/frontend/dist;
    index index.html;

    # Proxy API requests to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Option 3: AWS Amplify (Frontend) + Lambda (Backend)
- Frontend: Push to GitHub, connect to Amplify
- Backend: Containerize with Docker, deploy to Lambda or ECS

---

## Pre-Deployment Checklist

### Environment Variables
- [ ] Add `MONGO_URI` to AWS environment (EB/EC2/Lambda)
- [ ] Set `NODE_ENV=production`
- [ ] Configure `PORT` (default: 5000)

### Security
- [ ] Never commit `.env` to git ✅ (already configured)
- [ ] Use AWS Secrets Manager for production credentials
- [ ] Enable HTTPS with SSL certificate (Let's Encrypt or AWS Certificate Manager)
- [ ] Restrict MongoDB Atlas IP whitelist to AWS instance IPs

### Frontend Production Build
- [ ] Update `SurfChart.js` API URL from `http://localhost:5000` to your domain
- [ ] Or use environment variables: `import.meta.env.VITE_API_URL`
- [ ] Run `npm run build` before deployment
- [ ] Test production build: `npm run preview`

### Backend Production Config
- [ ] Add request logging (e.g., `morgan`)
- [ ] Implement rate limiting to prevent NOAA API abuse
- [ ] Add error monitoring (e.g., Sentry)
- [ ] Set up MongoDB indexes (already configured in `SurfData.js`)

---

## MongoDB Atlas Configuration

Your connection string is configured for:
- **Cluster**: `mywavewatcher.vq8elpl.mongodb.net`
- **Database**: `surfdata`
- **User**: `evice`

**Production Recommendations:**
1. Create a separate database user for production with read/write permissions only
2. Enable MongoDB Atlas IP whitelist for your AWS instance
3. Set up MongoDB Atlas backups
4. Monitor connection pooling and query performance

---

## Testing NOAA Data Integration

Test with Huntington Beach buoy:
```bash
curl http://localhost:5000/api/surf-data/46087
```

Other California buoys:
- `46086` - San Clemente (nearshore)
- `46025` - Santa Monica Basin
- `46011` - Santa Maria

---

## Next Steps

1. **Complete frontend components:**
   - Implement `LocationSelector.js` with buoy station dropdown
   - Implement `StatsPanel.js` for wave statistics
   - Complete `SurfChart.js` with actual chart rendering

2. **Add features:**
   - Error boundaries for API failures
   - Loading states
   - Auto-refresh data every 10 minutes
   - Historical data visualization

3. **Deploy to AWS:**
   - Choose deployment strategy (Elastic Beanstalk recommended)
   - Configure production environment variables
   - Set up CI/CD pipeline (GitHub Actions)

4. **Monitor and scale:**
   - Set up CloudWatch logs
   - Configure auto-scaling if using ECS/EB
   - Monitor MongoDB Atlas performance metrics
