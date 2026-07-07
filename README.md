# Expense Tracker

A full-stack web application designed to help users manage, track, and analyze their expenses. Built with a modern tech stack, this application offers features like Google authentication, AI-powered insights, data visualization, and receipt uploads.

## 🚀 Features

- **User Authentication:** Secure login using JWT and Google OAuth.
- **Expense Management:** Add, edit, delete, and categorize your expenses.
- **Data Visualization:** Interactive charts and graphs using Recharts.
- **AI Insights:** Powered by Google GenAI to provide intelligent insights or expense parsing.
- **File Uploads:** Upload receipts or profile pictures using Cloudinary and Multer.
- **Export Data:** Export your expense reports to Excel (.xlsx) format.
- **Email Notifications:** Important alerts and summaries via Nodemailer.
- **Responsive UI:** Modern, clean, and responsive design built with Tailwind CSS.

## 💻 Tech Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **Charts:** Recharts
- **Authentication:** @react-oauth/google
- **HTTP Client:** Axios
- **Icons:** React Icons & Emoji Picker React

### Backend
- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & Google Auth Library
- **File Storage:** Cloudinary & Multer
- **AI Integration:** Google GenAI SDK
- **Email:** Nodemailer
- **Utilities:** bcryptjs (password hashing), xlsx (Excel parsing/export)

## 📂 Project Structure

The project is structured as a monorepo containing both the frontend and backend codebases:

- `/frontend` - Contains the React Vite application.
- `/backend` - Contains the Node.js Express server.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)
- Cloudinary Account (for file uploads)
- Google Cloud Console Project (for Google Auth & GenAI API Key)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd "expense tracker"
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

You need to create a `.env` file in both the `frontend` and `backend` directories.

**Backend (`backend/.env`):**
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_google_genai_api_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

**Frontend (`frontend/.env`):**
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```


### Running the Application

Open two separate terminal windows/tabs.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
The server should start on `http://localhost:5000`.

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
The client will be available at `http://localhost:5173`.

## 📜 Scripts

- `npm run dev` (Frontend): Starts the Vite development server.
- `npm run build` (Frontend): Builds the app for production.
- `npm start` (Backend): Starts the Node.js server.
- `npm run dev` (Backend): Starts the Node.js server using nodemon for automatic restarts on file changes.


