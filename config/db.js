const mongoose = require('mongoose');
const colors = require('colors');

mongoose.connection.once("open", () => {
  console.log("Database Connected!".blue.underline);
});

mongoose.connection.once("close", () => {
  console.log("Database DisConnected!".red.underline);
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; 
const mongoConnect = async () => {
    let retries = 0;
    while (retries < MAX_RETRIES) {
        try {
            await mongoose.connect(process.env.MONGO_URL);
            return;
        } catch (error) {
            retries++;
            console.log(`MongoDB connection failed. Retry ${retries}/${MAX_RETRIES}`.red);
            if (retries >= MAX_RETRIES) { 
                console.error("Max retries reached. Could not connect to MongoDB.".red.bold);
                throw new Error(error.message);
            }
            await new Promise(res => setTimeout(res, RETRY_DELAY));
        }
    }
}

const mongoDisconnect = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = {mongoConnect, mongoDisconnect};