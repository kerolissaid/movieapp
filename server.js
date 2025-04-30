const app = require('./app.js');
const {mongoConnect, mongoDisconnect} = require('./config/db.js')
const PORT = process.env.PORT || 8000;
mongoConnect();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.blue);
});