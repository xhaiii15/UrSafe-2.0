const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();
console.log('MONGO_URI:', !!process.env.MONGO_URI ? 'Loaded ✅' : 'Missing ❌');
console.log('JWT_SECRET:', !!process.env.JWT_SECRET ? 'Loaded ✅' : 'Missing ❌');

const app = express();

app.use(cors({
    origin: "https://ursafe2.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Connected to MongoDB`);
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => console.error('Database connection error:', err));
