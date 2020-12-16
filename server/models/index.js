const mongoose = require('mongoose');
const { MONGO_ID, MONGO_PWD, MONGO_DBNAME } = process.env;
const MONGO_URI = `mongodb+srv://${MONGO_ID}:${MONGO_PWD}@nsddevil.lhsos.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`;
const connectDB = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log('mongoDB connected'))
    .catch((err) => console.log('mongoDB error', err));

  mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected, re connect..');
    connectDB();
  });
};

module.exports = connectDB;
