const { connect } = require('mongoose');

const connectDB = () =>
  connect('mongodb://localhost:27017/leoMarket', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

module.exports = connectDB;
