const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/inotebooks";
const connecttomongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected to mongo successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connecttomongo;