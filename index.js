const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const validUrl = require('valid-url');

require('dotenv').config();

const urlRoutes = require('./routes/url');

const app = express();

app.use(express.json());
app.use('/v1/', urlRoutes);
app.get('/health', (req, res) => {
  res.json('GG');
});

const { SHORTENER_SERVER_PORT, SHORTENER_DB_USER, SHORTENER_DB_PASS, SHORTENER_DB_NAME, SHORTENER_DB_HOST} = process.env;

mongoose.connect(
  `mongodb+srv://${SHORTENER_DB_USER}:${SHORTENER_DB_PASS}@${SHORTENER_DB_HOST}/${SHORTENER_DB_NAME}?retryWrites=true&w=majority`,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
).then(() => {
  app.listen(SHORTENER_SERVER_PORT, () => console.log('Serve is listening on port ' + SHORTENER_SERVER_PORT));
}).catch((err) => {
  console.log(err);
})
