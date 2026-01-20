# GTS Ask - Task Manager

A cloud-based task management application built with the MERN stack, featuring a modern UI with black and yellow/orange visual identity.

![GTS Ask](https://customer-assets.emergentagent.com/job_gts-ask/artifacts/vkqzttw5_BRP_inc_logo.svg.png)

---

## 🔐 Test Credentials

### Admin Account
| Field | Value |
|-------|-------|
| **Email** | `admin@gtsask.com` |
| **Password** | `admin123` |
| **Access** | Full access - create tasks, manage users, view team, access trash |

### User Account
| Field | Value |
|-------|-------|
| **Email** | `user@gtsask.com` |
| **Password** | `user123` |
| **Access** | Limited access - view/update assigned tasks |

---

## **Admin Features:**
1. **User Management:**
    - Create admin accounts.
    - Add and manage team members.

2. **Task Assignment:**
    - Assign tasks to individual or multiple users.
    - Update task details and status.

3. **Task Properties:**
    - Label tasks as todo, in progress, or completed.
    - Assign priority levels (high, medium, normal, low).
    - Add and manage sub-tasks.

4. **Asset Management:**
    - Upload task assets, such as images.

5. **User Account Control:**
    - Disable or activate user accounts.
    - Permanently delete or trash tasks.


## **User Features:**
1. **Task Interaction:**
    - Change task status (in progress or completed).
    - View detailed task information.

2. **Communication:**
    - Add comments or chat to task activities.


## **General Features:**
1. **Authentication and Authorization:**
    - User login with secure authentication.
    - Role-based access control.

2. **Profile Management:**
    - Update user profiles.

3. **Password Management:**
    - Change passwords securely.

4. **Dashboard:**
    - Provide a summary of user activities.
    - Filter tasks into todo, in progress, or completed.



## **Technologies Used:**
- **Frontend:**
    - React (Vite)
    - Redux Toolkit for State Management
    - Headless UI
    - Tailwind CSS


- **Backend:**
    - Node.js with Express.js
    
- **Database:**
    - MongoDB for efficient and scalable data storage.


---

## SETUP INSTRUCTIONS (Local Development)


### Server Setup

#### Environment variables
First, create the environment variables file `.env` in the server folder. The `.env` file contains the following environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/gts_ask
JWT_SECRET=your_secret_key
PORT=8001
NODE_ENV=development
```

#### Steps to run server

1. Open the project in any editor of choice.
2. Navigate into the server directory `cd server`.
3. Run `yarn install` to install the packages.
4. Run `node index.js` to start the server.

If configured correctly, you should see a message indicating that the server is running successfully and `Database Connected`.

&nbsp;

### Client Side Setup

#### Environment variables
First, create the environment variables file `.env` in the client folder. The `.env` file contains the following environment variables:

```env
VITE_APP_BASE_URL=http://localhost:8001
VITE_APP_FIREBASE_API_KEY=your_firebase_api_key
```

#### Steps to run client

1. Navigate into the client directory `cd client`.
2. Run `yarn install` to install the packages.
3. Run `yarn dev` to run the app on `http://localhost:3000`.
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🚀 Azure Deployment Guide

The current setup is configured for local development. Here's what you'd need to change for Azure deployment:

### 1. **Database (MongoDB)**
Currently using local MongoDB. You need to switch to a cloud database:

```bash
# Current (won't work in Azure):
MONGODB_URI=mongodb://localhost:27017/gts_ask

# Change to Azure Cosmos DB (MongoDB API) or MongoDB Atlas:
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/gts_ask
```

**Options:**
- **Azure Cosmos DB** (MongoDB API) - Native Azure solution
- **MongoDB Atlas** - Cloud MongoDB service

---

### 2. **Environment Variables**
Create these in Azure App Service Configuration:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Your cloud MongoDB connection string |
| `JWT_SECRET` | A strong secret key (generate a new one) |
| `NODE_ENV` | `production` |
| `PORT` | `8080` (Azure default) |

---

### 3. **CORS Configuration**
Update `/server/index.js` to restrict origins:

```javascript
// Current (allows all - not secure for production):
app.use(cors({ origin: true, ... }));

// Change to your Azure domain:
app.use(cors({
  origin: ["https://your-app-name.azurewebsites.net"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));
```

---

### 4. **Frontend API URL**
Update `/client/src/redux/slices/apiSlice.js`:

```javascript
// Current (relative URL for dev proxy):
const API_URL = "/api";

// For Azure, if frontend and backend are separate:
const API_URL = process.env.NODE_ENV === 'production' 
  ? "https://your-backend.azurewebsites.net/api"
  : "/api";
```

**Or better**, set it via environment variable in `/client/.env.production`:
```
VITE_APP_API_URL=https://your-backend.azurewebsites.net/api
```

---

### 5. **Build the Frontend**
```bash
cd client
yarn build
```
This creates a `/client/dist` folder with static files.

---

### 6. **Serve Static Files from Backend** (Recommended)
Add to `/server/index.js`:

```javascript
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  
  // Handle React routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}
```

---

### 7. **Firebase (Optional)**
If you want file uploads to work, add your Firebase API key:
```
VITE_APP_FIREBASE_API_KEY=your-firebase-api-key
```

---

## 📁 Deployment Options on Azure

### Option A: **Single Azure App Service** (Easiest)
Deploy both frontend and backend together:

1. Build frontend: `cd client && yarn build`
2. Deploy `/server` + `/client/dist` to App Service
3. Configure environment variables in Azure Portal

### Option B: **Separate Services**
- **Frontend**: Azure Static Web Apps
- **Backend**: Azure App Service
- **Database**: Azure Cosmos DB

---

## 📋 Production Checklist

- [ ] Set up cloud MongoDB (Cosmos DB or Atlas)
- [ ] Update `MONGODB_URI` environment variable
- [ ] Generate a strong `JWT_SECRET`
- [ ] Set `NODE_ENV=production`
- [ ] Update CORS origins to your domain
- [ ] Build frontend (`yarn build`)
- [ ] Configure static file serving in backend
- [ ] Set up Firebase for file uploads (optional)
- [ ] Test authentication flow
- [ ] Test task creation and management

---

## 🎨 Visual Identity

- **Primary Color:** Black (#000000)
- **Accent Color:** Bold Yellow (#FBBF24 / amber-500)
- **Mode:** Light mode with black accents
- **Logo:** BRP Inc. logo

---

The Cloud-Based Task Manager is an innovative solution that brings efficiency and organization to task management within teams. By harnessing the power of the MERN stack and modern frontend technologies, the platform provides a seamless experience for both administrators and users, fostering collaboration and productivity.
