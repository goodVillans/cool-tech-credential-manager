require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./Routes/UserRoutes');
const ouRoutes = require('./Routes/OuRoutes');
const divisionRoutes = require('./Routes/DivisionRoutes');
const credentialRoutes = require('./Routes/CredentialRoutes');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use('/cool-tech/user', userRoutes)
app.use('/cool-tech/ou', ouRoutes)
app.use('/cool-tech/divisions', divisionRoutes)
app.use('/cool-tech/credentials', credentialRoutes)

mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true, 
   useUnifiedTopology: true})
   .then(() => console.log('MongoDB connected'))
   .catch((err) => console.log("Error connecting to MongoDB", err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
