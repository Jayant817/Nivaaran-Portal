# ⚖️ Nivaaran Portal — AI-Powered Complaint Management System

![Nivaaran Portal Hero](https://nivaaran-portal-1.onrender.com/)

> A modern, intelligent, and seamless platform for public grievance management. Nivaaran Portal uses Artificial Intelligence to instantly analyze, prioritize, and route complaints to the appropriate government or municipal departments.

## 🚀 Features

- **🤖 AI-Powered Analysis**: Automatically detects complaint urgency (Low, Medium, High, Critical) and assigns it to the most relevant department using advanced LLM integration (OpenRouter/Mistral).
- **⚡ Fast & Seamless Registration**: A highly optimized, user-friendly interface that lets citizens register complaints in just a few clicks.
- **📊 Real-Time Tracking**: Users and administrators can keep a close eye on the complaint's progress with real-time status updates (Pending, In Progress, Resolved).
- **📈 Interactive Dashboard**: A live control center displaying key metrics and recent complaint activity at a glance.
- **🔍 Advanced Filtering & Search**: Easily find complaints by location or filter them by specific categories (e.g., Water Supply, Electricity, Public Safety).
- **🔐 Secure Authentication**: JWT-based secure login and signup functionality to keep user data safe.

## 🛠️ Technology Stack

**Frontend**
- React.js (Vite)
- React Router DOM
- CSS3 (Custom Glassmorphism & Modern UI)
- Axios

**Backend**
- Node.js & Express.js
- MongoDB Atlas (Mongoose)
- JSON Web Tokens (JWT) & bcrypt.js
- OpenRouter API (AI Integration)

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Nivaaran-Portal.git
   cd Nivaaran-Portal
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_MODEL=mistralai/mistral-7b-instruct
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application in action.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/Nivaaran-Portal/issues).

## 📝 License

This project is licensed under the MIT License.
