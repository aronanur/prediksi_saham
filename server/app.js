const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
process.env.NODE_ENV === 'development' ? require('dotenv').config() : ''

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(routes)
  .use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
})