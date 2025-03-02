
# 🚀 SPARK Backend Project 

## 📌 Prerequisites  
Before setting up the project, make sure you have the following installed:  
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)  
- [MongoDB](https://www.mongodb.com/) (For database storage)  
- [Git](https://git-scm.com/) (For version control)  

---

## 📥 1. Clone the Repository  
```sh
git clone https://github.com/09web2003/spark-backend.git
cd spark-backend
```

## 📦 2. Install Dependencies

Run the following command inside the project folder:
```
npm install
```
This will install all required packages listed in `package.json`.

## ⚙️ 3. Configure Environment Variables

Create a `.env` file in the project root and add the following environment variables:

.env
```
DATABASE_URL=mongodb+srv://your-mongodb-uri
DATABASE_NAME=your-database-name
JWT_SECRET_KEY=your-secret-key
GMAIL_ACCOUNT=your-email@gmail.com
APP_PASSWORD=your-app-password` 
```

-   Replace `MONGO_URI` with your MongoDB connection string.
-   Replace `EMAIL` and `PASSWORD` with your Gmail **App Password** for Nodemailer.

## 📜 4. Project Structure

```
`/spark-backend
│── /config        # Database & Server Configurations
│── /models        # Mongoose Models
│── /routes        # API Routes
│── /controllers   # Business Logic for Routes
│── .env           # Environment Variables (Not to be committed)
│── index.js       # Main Entry Point
│── package.json   # Dependencies & Scripts` 
```

## ✅ 5. Deployment (Optional)

To deploy on **Render/Vercel/Heroku**, set up environment variables in their dashboard and push the code.