const express = require('express');
const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');
const postRoutes = require('./routes/postRoutes');
const rankingRoutes = require('./routes/rankingRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const clubRoutes = require('./routes/clubRoutes');
const cors = require('cors');

const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:8080',
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/clubs', clubRoutes);

const sequelize = require('./models/index');

sequelize.sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Error syncing database:', err);
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
