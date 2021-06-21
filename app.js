const express = require('express');
const app = express();
const apiRoute = require('./routes/api.route');
const connectDB = require('./db/connect');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/goods', apiRoute);

app.listen(8080, () => {
  console.log('Server started!!!');
  connectDB();
});
