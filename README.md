# Ride-Sharing Backend Server (Real-Time Dashboard)

## Project Overview

This backend server simulates a real-time ride-sharing system, providing live driver location updates to a client dashboard via WebSockets. It supports authentication, token-based access, REST endpoints for location updates, and a WebSocket-based event system for live tracking of drivers.

**Key Features:**
- REST API for login and location updates
- WebSocket endpoints for real-time driver location submission and client dashboard updates
- Token-based driver authentication with expiry
- Simulated multi-server communication mock for scalability planning
- Basic driver data simulation (no database required)

---

## Getting Started

### Prerequisites
- Node.js 
- npm 

### Install Dependencies

```bash
npm install

Run the Server
node src/server

The server will start on http://localhost:3000

API Endpoints
1. Driver Login
    - http://localhost:3000/login
    - method : post
    - Request Body:
    {
        "username": "driver1",
        "password": "pass"
    }
2. Driver Update Location
    - Header
        -Authorization: Bearer <accessToken>
    - Request Body:
    {
        "lat": 40.7128,
        "long": 74.0060
    }
WebSocket Endpoints
    - Client Dashboard Stream
    - http://localhost:3000/driver/dashboard
    {
        "type": "listenToDriver",
        "driverId": "driver1",
    }
    - http://localhost:3000/driver/stream
        {
            "type": "AUTH",
            "token": "your_access_token"
        }