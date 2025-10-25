# Real-Time Surf Data Visualization

A web app to visualize real-time surf conditions (wave height, period, wind speed) using NOAA NDBC buoy data, built with Node.js, MongoDB Atlas, and React (Vite). Created by a passionate surfer to showcase backend/data skills for Surfline.

## Features
- Fetches real-time NOAA buoy data (e.g., station 46087 for Huntington Beach).
- Analyzes data (e.g., average wave height).
- Visualizes trends with Chart.js.
- Deployed on Vercel/AWS.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB (Atlas), Axios
- **Frontend**: React (Vite), Chart.js, Tailwind CSS
- **Deployment**: Vercel/AWS

## Setup
1. Clone: `git clone https://github.com/Evicencio-05/surf-data-visualization`
2. Backend:
   - `cd backend`
   - `npm install`
   - Create `.env` with `MONGO_URI` and `PORT`
   - `npm run dev`
3. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
4. Visit `http://localhost:5173`.

## Live Demo
[Insert Vercel/AWS link]

## Motivation
As a daily Surfline user and surfer, I built this to enhance surf forecasting with real-time data analytics.

## License
MIT
